#!/usr/bin/env sh

set -eu

app_name="messenger-next"
download_base_url="https://github.com/rozsazoltan/messenger/releases/latest/download"
requested_format="${1:-auto}"

error() {
  printf '%s\n' "error: $*" >&2
  exit 1
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || error "Required command not found: $1"
}

select_format() {
  case "$requested_format" in
    auto)
      if command -v apt >/dev/null 2>&1; then
        printf '%s\n' deb
      elif command -v dnf >/dev/null 2>&1 || command -v zypper >/dev/null 2>&1; then
        printf '%s\n' rpm
      elif command -v pacman >/dev/null 2>&1; then
        printf '%s\n' zst
      else
        printf '%s\n' appimage
      fi
      ;;
    deb | rpm | zst | appimage)
      printf '%s\n' "$requested_format"
      ;;
    *)
      error "Unsupported format: $requested_format. Use deb, rpm, zst, or appimage."
      ;;
  esac
}

cleanup() {
  rm -rf "$work_dir"
}

require_command curl
require_command mktemp
require_command sha256sum

format="$(select_format)"
work_dir="$(mktemp -d "${TMPDIR:-/tmp}/messenger-next.XXXXXX")"
trap cleanup EXIT HUP INT TERM

case "$format" in
  deb)
    asset_name="$app_name.deb"
    ;;
  rpm)
    asset_name="$app_name.rpm"
    ;;
  zst)
    asset_name="$app_name.pkg.tar.zst"
    ;;
  appimage)
    asset_name="$app_name.AppImage"
    ;;
esac

asset_path="$work_dir/$asset_name"
checksum_path="$work_dir/SHA256SUMS"

curl --fail --show-error --location --proto '=https' --tlsv1.2 \
  --output "$asset_path" "$download_base_url/$asset_name"
curl --fail --show-error --location --proto '=https' --tlsv1.2 \
  --output "$checksum_path" "$download_base_url/SHA256SUMS"

(
  cd "$work_dir"
  sha256sum --ignore-missing --check SHA256SUMS
)

case "$format" in
  deb)
    require_command sudo
    require_command apt
    sudo apt install --yes "$asset_path"
    ;;
  rpm)
    require_command sudo
    if command -v dnf >/dev/null 2>&1; then
      sudo dnf install --assumeyes "$asset_path"
    elif command -v zypper >/dev/null 2>&1; then
      sudo zypper --non-interactive install "$asset_path"
    else
      error "RPM installation requires dnf or zypper."
    fi
    ;;
  zst)
    require_command sudo
    require_command pacman
    sudo pacman --noconfirm --upgrade "$asset_path"
    ;;
  appimage)
    require_command install
    install_dir="${XDG_BIN_HOME:-$HOME/.local/bin}"
    mkdir --parents "$install_dir"
    install --mode=0755 "$asset_path" "$install_dir/$asset_name"
    printf '%s\n' "Installed $app_name to $install_dir/$asset_name"
    ;;
esac
