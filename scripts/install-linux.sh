#!/usr/bin/env sh

set -eu

app_name="messenger-next"
repository="rozsazoltan/messenger"
stable_download_base_url="https://github.com/$repository/releases/latest/download"
release_selector="stable"
requested_format="auto"
requested_release_tag=""
selected_release_tag=""
selected_download_base_url="$stable_download_base_url"
selected_channel="stable"

error() {
  printf '%s\n' "error: $*" >&2
  exit 1
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || error "Required command not found: $1"
}

usage() {
  cat <<'EOF'
Usage: install-linux.sh [--stable | --prerelease | --release VERSION] [FORMAT]

Install Messenger Next from GitHub Releases.

  --stable             Install the newest stable release (default).
  --prerelease         Install the newest semantic version from stable and
                       prerelease releases.
  --release VERSION    Install one exact public release tag, for example
                       v1.9.0-3 or 1.9.0-3.

FORMAT may be auto (default), deb, rpm, zst, or appimage. Existing positional
format usage remains supported, for example: install-linux.sh rpm.
EOF
}

normalize_architecture() {
  case "$(uname -m)" in
    x86_64 | amd64)
      printf '%s\n' x86_64
      ;;
    aarch64 | arm64)
      printf '%s\n' aarch64
      ;;
    *)
      error "Unsupported Linux architecture: $(uname -m). Supported architectures: x86_64, aarch64."
      ;;
  esac
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

set_release_selector() {
  selector="$1"

  if [ "$release_selector" != "stable" ] || [ -n "$requested_release_tag" ]; then
    error "Choose only one of --stable, --prerelease, or --release."
  fi

  release_selector="$selector"
}

normalize_release_tag() {
  tag="$1"
  case "$tag" in
    v*) tag=${tag#v} ;;
  esac

  case "$tag" in
    '' | *[!0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.-]* | .* | *..* | *- | -* )
      error "Invalid release tag: $1. Use a version such as v1.9.0-3."
      ;;
  esac

  case "$tag" in
    [0123456789]*.*.*) ;;
    *) error "Invalid release tag: $1. Use a version such as v1.9.0-3." ;;
  esac

  printf '%s\n' "v$tag"
}

parse_arguments() {
  while [ "$#" -gt 0 ]; do
    case "$1" in
      --stable)
        set_release_selector stable
        ;;
      --prerelease)
        set_release_selector prerelease
        ;;
      --release)
        [ "$#" -ge 2 ] || error "--release requires a version or tag."
        if [ "$release_selector" != "stable" ] || [ -n "$requested_release_tag" ]; then
          error "Choose only one of --stable, --prerelease, or --release."
        fi
        requested_release_tag=$(normalize_release_tag "$2")
        release_selector=release
        shift
        ;;
      --help | -h)
        usage
        exit 0
        ;;
      --*)
        error "Unknown option: $1. Run with --help for usage."
        ;;
      auto | deb | rpm | zst | appimage)
        [ "$requested_format" = auto ] || error "Only one package format may be requested."
        requested_format="$1"
        ;;
      *)
        error "Unsupported format: $1. Use deb, rpm, zst, or appimage."
        ;;
    esac
    shift
  done
}

resolve_prerelease_release() {
  require_command python3
  page=1

  while :; do
    page_path="$work_dir/releases-$page.json"
    if ! curl --fail --show-error --location --proto '=https' --tlsv1.2 \
      --header 'Accept: application/vnd.github+json' \
      --header 'User-Agent: messenger-next-installer' \
      --output "$page_path" \
      "https://api.github.com/repos/$repository/releases?per_page=100&page=$page"; then
      error "Could not resolve the latest prerelease-enabled release. Retry later or install an exact version with --release."
    fi

    release_count=$(python3 - "$page_path" <<'PY'
import json
import sys

with open(sys.argv[1], encoding='utf-8') as source:
    releases = json.load(source)
if not isinstance(releases, list):
    raise SystemExit('GitHub did not return a release list.')
print(len(releases))
PY
) || error "Could not parse GitHub release metadata. Retry later or install an exact version with --release."

    [ "$release_count" -gt 0 ] || break
    page=$((page + 1))
  done

  selected_release_tag=$(python3 - "$work_dir"/releases-*.json <<'PY'
import json
import re
import sys
from functools import cmp_to_key

pattern = re.compile(r'^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$')

def parse(tag):
    match = pattern.fullmatch(tag)
    if not match:
        return None
    prerelease = match.group(4)
    return (tuple(int(match.group(index)) for index in range(1, 4)), prerelease.split('.') if prerelease else None)

def compare_identifiers(left, right):
    for left_part, right_part in zip(left, right):
        if left_part == right_part:
            continue
        left_numeric = left_part.isdigit()
        right_numeric = right_part.isdigit()
        if left_numeric and right_numeric:
            return -1 if int(left_part) < int(right_part) else 1
        if left_numeric != right_numeric:
            return -1 if left_numeric else 1
        return -1 if left_part < right_part else 1
    if len(left) == len(right):
        return 0
    return -1 if len(left) < len(right) else 1

def compare(left, right):
    left_version = parse(left['tag_name'])
    right_version = parse(right['tag_name'])
    if left_version[0] != right_version[0]:
        return -1 if left_version[0] < right_version[0] else 1
    left_pre, right_pre = left_version[1], right_version[1]
    if left_pre is None and right_pre is not None:
        return 1
    if left_pre is not None and right_pre is None:
        return -1
    if left_pre is not None:
        identifiers = compare_identifiers(left_pre, right_pre)
        if identifiers:
            return identifiers
    if left['prerelease'] != right['prerelease']:
        return -1 if left['prerelease'] else 1
    return 0

candidates = []
for path in sys.argv[1:]:
    with open(path, encoding='utf-8') as source:
        releases = json.load(source)
    for release in releases:
        tag = release.get('tag_name')
        if not release.get('draft', False) and isinstance(tag, str) and parse(tag):
            candidates.append({'tag_name': tag, 'prerelease': bool(release.get('prerelease', False))})

if not candidates:
    raise SystemExit('No public semantic-versioned stable or prerelease release is available.')

print(sorted(candidates, key=cmp_to_key(compare))[-1]['tag_name'])
PY
) || error "Could not select a prerelease-enabled release. Retry later or install an exact version with --release."

  [ -n "$selected_release_tag" ] || error "No public stable or prerelease release is available."
  selected_download_base_url="https://github.com/$repository/releases/download/$selected_release_tag"
  selected_channel="prerelease"
}

resolve_exact_release() {
  require_command python3
  release_metadata="$work_dir/release.json"
  if ! curl --fail --show-error --location --proto '=https' --tlsv1.2 \
    --header 'Accept: application/vnd.github+json' \
    --header 'User-Agent: messenger-next-installer' \
    --output "$release_metadata" \
    "https://api.github.com/repos/$repository/releases/tags/$requested_release_tag"; then
    error "Release $requested_release_tag does not exist or is unavailable."
  fi

  selected_channel=$(python3 - "$release_metadata" <<'PY'
import json
import sys

with open(sys.argv[1], encoding='utf-8') as source:
    release = json.load(source)
if release.get('draft', False):
    raise SystemExit('Draft releases cannot be installed.')
print('prerelease' if release.get('prerelease', False) else 'stable')
PY
) || error "Could not validate release $requested_release_tag."

  selected_release_tag="$requested_release_tag"
  selected_download_base_url="https://github.com/$repository/releases/download/$selected_release_tag"
}

write_update_channel_override() {
  config_dir="${XDG_CONFIG_HOME:-$HOME/.config}/$app_name"
  mkdir --parents "$config_dir"
  (
    umask 077
    override_path="$config_dir/update-channel-override"
    temporary_path=$(mktemp "$config_dir/.update-channel-override.XXXXXX")
    printf '%s\n' "$selected_channel" > "$temporary_path"
    mv -f "$temporary_path" "$override_path"
  ) || error "Installed the package but could not save its $selected_channel update-channel selection."
}

cleanup() {
  rm -rf "$work_dir"
}

verify_selected_checksum() {
  checksum_entry="$work_dir/$asset_name.sha256"

  awk -v asset="$asset_name" '
    $2 == asset || $2 == ("*" asset) {
      print $1 "  " asset
      found = 1
      exit
    }
    END { exit found ? 0 : 1 }
  ' "$checksum_path" > "$checksum_entry" || error "Release checksums do not include $asset_name."

  sha256sum --check "$checksum_entry" || error "Checksum verification failed for $asset_name."
}

parse_arguments "$@"

require_command curl
require_command mktemp
require_command sha256sum
require_command uname

format="$(select_format)"
architecture="$(normalize_architecture)"
work_dir="$(mktemp -d "${TMPDIR:-/tmp}/messenger-next.XXXXXX")"
trap cleanup EXIT HUP INT TERM

case "$release_selector" in
  stable)
    ;;
  prerelease)
    resolve_prerelease_release
    ;;
  release)
    resolve_exact_release
    ;;
esac

case "$format" in
  deb)
    case "$architecture" in
      x86_64) asset_architecture=amd64 ;;
      aarch64) asset_architecture=arm64 ;;
    esac
    asset_name="$app_name-$asset_architecture.deb"
    ;;
  rpm)
    asset_name="$app_name-$architecture.rpm"
    ;;
  zst)
    asset_name="$app_name-$architecture.pkg.tar.zst"
    ;;
  appimage)
    asset_name="$app_name-$architecture.AppImage"
    ;;
esac

asset_path="$work_dir/$asset_name"
checksum_path="$work_dir/SHA256SUMS"

if ! curl --fail --show-error --location --proto '=https' --tlsv1.2 \
  --output "$asset_path" "$selected_download_base_url/$asset_name"; then
  case "$release_selector" in
    stable)
      error "No $format asset for $architecture is available in the latest stable release: $selected_download_base_url/$asset_name"
      ;;
    *)
      error "Release ${selected_release_tag:-unknown} does not contain a $format asset for $architecture: $selected_download_base_url/$asset_name"
      ;;
  esac
fi
curl --fail --show-error --location --proto '=https' --tlsv1.2 \
  --output "$checksum_path" "$selected_download_base_url/SHA256SUMS"

verify_selected_checksum


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
    case ":$PATH:" in
      *":$install_dir:"*) ;;
      *) printf '%s\n' "Add $install_dir to PATH to launch $app_name by name." ;;
    esac
    ;;
esac

write_update_channel_override
