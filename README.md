<p align="center">
  <img src="./assets/messenger.png" width="128" alt="Messenger icon">
</p>

<h1 align="center">Messenger Desktop for Windows, macOS &amp; Linux</h1>

<p align="center"><em><code>Messenger Next</code> is built for focused, distraction-free messaging.</em></p>

<p align="center">
  <a href="https://github.com/rozsazoltan/messenger"><img src="https://img.shields.io/badge/Star%20on-GitHub-181717?logo=github" alt="Star Messenger Next on GitHub"></a>
  <a href="https://github.com/rozsazoltan/messenger/releases/latest"><img src="https://img.shields.io/github/v/release/rozsazoltan/messenger?label=Messenger%20Next" alt="Latest release"></a>
  <a href="https://github.com/rozsazoltan/messenger/releases/latest"><img src="https://img.shields.io/github/downloads/rozsazoltan/messenger/total?label=downloads" alt="Downloads"></a>
  <a href="https://github.com/rozsazoltan/messenger/releases/latest"><img src="https://img.shields.io/github/release-date/rozsazoltan/messenger?label=release-date" alt="Release date"></a>
</p>

> [!NOTE]
>
> Version 1.9 arrives in August with one of the biggest updates yet. Expect configurable notifications, badge support, optional Insider builds for early feature access, better download handling, improved window management, and even lower CPU and RAM usage.
>
> The mission stays unchanged: deliver a free, fast, distraction-free Facebook Messenger desktop experience without ads, payments, or telemetry. [Download the current version](https://github.com/rozsazoltan/messenger#download) now to receive automatic update notifications and install version 1.9 with one click when released. Excited for the update? [Star the repository on GitHub](https://github.com/rozsazoltan/messenger) and read the full preview in [Discussion #27](https://github.com/rozsazoltan/messenger/discussions/27).

An unofficial, lightweight desktop wrapper for Facebook Messenger — built with
Tauri, not Electron. No feed, no reels, no marketplace. Just your conversations
in a dedicated window.

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/rozsazoltan/messenger/releases/latest/download/messenger-next.msi"><img src="./assets/download.svg" width="48" alt="Download for Windows"></a><br>
      <a href="https://github.com/rozsazoltan/messenger/releases/latest/download/messenger-next.msi">Download&nbsp;for&nbsp;Windows</a><br>
      <sub>64-bit installer (.msi)</sub>
    </td>
    <td align="center">
      <a href="https://github.com/rozsazoltan/messenger/releases/latest/download/messenger-next.dmg"><img src="./assets/download.svg" width="48" alt="Download for macOS"></a><br>
      <a href="https://github.com/rozsazoltan/messenger/releases/latest/download/messenger-next.dmg">Download&nbsp;for&nbsp;macOS</a><br>
      <sub>macOS installer (.dmg)</sub>
    </td>
    <td align="center">
      <a href="https://github.com/rozsazoltan/messenger/releases/latest/download/messenger-next.deb"><img src="./assets/download.svg" width="48" alt="Download for Linux"></a><br>
      <a href="https://github.com/rozsazoltan/messenger/releases/latest/download/messenger-next.deb">Download&nbsp;for&nbsp;Linux</a><br>
      <sub>Debian and Ubuntu (.deb)</sub>
    </td>
  </tr>
</table>

<p align="center">
  <a href="https://github.com/rozsazoltan/messenger/releases">Browse every release, prerelease, and portable download</a>
  &nbsp;·&nbsp;
  <a href="https://messengernext.vercel.app"><code>messengernext.vercel.app</code> guide</a>
</p>

Choose the installer for your platform above. Stable releases are linked
directly, while preview builds and portable archives remain available from the
release page. The sections below explain the app's background, installation
options, and day-to-day features.

- [The Story](#the-story)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Install](#install)
  - [Windows](#windows)
  - [macOS](#macos)
  - [Linux](#linux)
- [Features](#features)
  - [Settings](#settings-f3)
  - [Thoughtful details](#thoughtful-details)
- [Privacy and Security](#privacy-and-security)
- [Requirements](#requirements)
- [Comparison and Goals](#comparison-and-goals)
- [Support](#support)

Read on to learn why Messenger was created and how it keeps the desktop
experience focused. Or jump straight to [Install](#install) for setup steps, or
to [Features](#features) if you are already using the app and want to explore
its desktop controls.

## The Story

This project started in 2025 out of frustration. The official Messenger Desktop
app was notoriously buggy and consumed far too much memory. When Meta
discontinued it in December 2025, the need for a simple, focused alternative
became obvious.

With the shutdown of `messenger.com` in April 2026, the stakes got higher. The
app was updated to bridge the gap: it uses the `facebook.com/messages` backend
but surgically removes the surrounding noise. No Reels, no Marketplace, no
Feed. Just your conversations in a dedicated, isolated window.

## Frequently Asked Questions

### Is `Messenger Next` really free?

Yes. There is no purchase price, subscription, advertising, or paid tier.
`Messenger Next` was made by one developer who missed a focused,
Messenger-only desktop experience.

The developer's promise is that the core desktop app will remain free to
download and use. Access to conversations will not be placed behind a
subscription, and advertising will not be added to the app.

### Do I need a new account?

No. Use the Facebook account you already use with Messenger on your phone or
on the web. `Messenger Next` does not create a separate identity, profile, or
contact list.

### Why is it called `Messenger Next`?

After the end of `messenger.com` and the official Messenger Desktop client, this project
continues that standalone Messenger experience in a simpler form.

### How does `Messenger Next` handle my privacy?

`Messenger Next` does not collect, analyze, sell, or otherwise process your
conversations or account data. It renders Messenger in a dedicated native
window; your messages and account remain with Meta under its own terms and
privacy policy.

### Is this an official Facebook or Meta application?

No. `Messenger Next` is independent and has no affiliation with Facebook or Meta.
It does not replace or bypass their services; it makes the Messenger interface
easier to use in a dedicated desktop window and supports its continued use.

Authentication takes place inside Meta's own interface. The app does not ask
you to submit a password to the developer and does not operate a separate
message server.

### Is `Messenger Next` safe to use?

`Messenger Next` adds no developer-controlled telemetry and does not collect,
analyze, sell, or store messages, credentials, or usage analytics. External
links also bypass selected Facebook tracking redirects. Messenger itself
remains a Meta service and is governed by Meta's terms and privacy policy.

Releases are distributed through the public repository, and the developer
maintains verifiable public profiles on
[GitHub](https://github.com/rozsazoltan),
[Stack Overflow](https://stackoverflow.com/users/15167500/rozsazoltan),
[X](https://x.com/rozsazoltan_dev), and
[LinkedIn](https://www.linkedin.com/in/rozsazoltan/).

Read the complete [privacy and trust guide](https://messengernext.vercel.app/privacy/).

### Do voice and video calls work?

Yes. Voice and video calls, group chats, reactions, photos, and normal
Messenger features work through the full Messenger interface, subject to
Messenger availability and operating-system permissions.

### Why is the source code currently closed?

There are already many Messenger wrappers with weaker performance. The project
is building a broader user base around a well-supported desktop experience
before publishing its internal engine. The source will be considered for release
once that engine and its supporting ecosystem are ready.

Read the full background in [#1](https://github.com/rozsazoltan/messenger/issues/1).

### How can I help with development?

Try new releases, share your experience, or report reproducible issues. See
[Support](#support) for the available feedback channels.

### Why is there only one macOS download?

The macOS DMG contains a universal app for both Apple silicon and Intel Macs.
One download avoids architecture choices and update mismatches, while keeping
the installation path the same for every supported Mac.

### Why does Windows use an MSI installer?

`Messenger Next` uses the standard Windows Installer format for reliable
installation, updates, and removal. It also works well with managed Windows
environments. The package uses the system WebView2 runtime instead of bundling
a browser engine, so it remains small without being a reduced-feature build.

## Install

### Windows

Download and open the MSI installer above, then follow the installer steps. The
app checks for updates from the `F2` panel.

WinGet and Microsoft Store distribution are planned but are not available yet.
Until those channels are ready, install the signed MSI from the release page.

### macOS

#### Homebrew

A custom Homebrew Cask is planned but is not available yet. Download the DMG
from the release page until the cask is published.

#### Direct download

Open the DMG, then drag `messenger-next.app` to `Applications`. The app is
not currently notarized by Apple, so macOS may ask for an additional
confirmation the first time it opens. Review the release and checksum, then use
Finder's `Open` command to continue when you trust the download.

### Linux

The installer script downloads the latest stable release, verifies its
`SHA256SUMS` entry, then selects the native package manager available on the
system. Preview releases remain available from the
[GitHub releases page](https://github.com/rozsazoltan/messenger/releases).

| Distribution               | Supported releases         | Format      |
| -------------------------- | -------------------------- | ----------- |
| Ubuntu                     | 24.04 and newer            | DEB         |
| Debian                     | 13 and newer               | DEB         |
| Fedora                     | Current supported releases | RPM         |
| openSUSE                   | Tumbleweed                 | RPM         |
| Arch Linux                 | Rolling                    | PKG.TAR.ZST |
| Other modern distributions | Current releases           | AppImage    |

Run this on Ubuntu, Debian, Fedora, openSUSE, or Arch Linux:

```shell
curl --proto '=https' --tlsv1.2 --fail --location https://raw.githubusercontent.com/rozsazoltan/messenger/master/scripts/install-linux.sh | sh
```

On another modern distribution, force the portable AppImage installation:

```shell
curl --proto '=https' --tlsv1.2 --fail --location https://raw.githubusercontent.com/rozsazoltan/messenger/master/scripts/install-linux.sh | sh -s -- appimage
```

The script is served from the public repository's `master` branch and can be
[reviewed before running](https://github.com/rozsazoltan/messenger/blob/master/scripts/install-linux.sh).

## Features

By using the system's native WebView through Tauri instead of bundling a full
browser engine, the app stays small and efficient:

- Installer size of ~4 MB, instead of 100 MB or more for Electron alternatives
- Low CPU and memory usage
- Built-in update notifications, so a verified update is usually one click away

<details>
  <summary>Keyboard shortcuts</summary>

| Shortcut                                     | Action          |
| -------------------------------------------- | --------------- |
| <kbd>F2</kbd>                                | Check updates   |
| <kbd>F3</kbd>                                | Open settings   |
| <kbd>F5</kbd> / <kbd>Ctrl</kbd>+<kbd>R</kbd> | Reload the page |

</details>

### Settings (`F3`)

- Always on Top
- System Tray support
- Start to Tray
- Start on System Startup (cross-platform)
- Hide on Close
- Multi Instance (experimental)
- Native alerts, badge-only notifications, and notification privacy controls

### Thoughtful Details

#### Native notifications and badges

Choose alerts, badge only, or off from the `F3` panel. Badge counts and the
tray indicator reflect unread conversations, while muted chats remain quiet by
default.

#### Enhanced image zoom

Double-click to enter zoom mode, scroll to zoom further, and drag or use arrow
keys to pan. Double-click again to exit.

#### Copy Image from context menu

Images displayed in Messenger can be copied directly to the clipboard,
including images that are not available as standard attachments.

#### Direct link handling

External links bypass Facebook tracking redirects and open directly in the
default browser.

## Privacy and Security

This app does not collect, store, or intercept messages, credentials, or usage
data.

All communication happens directly between the computer and Facebook's
official servers. The wrapper provides a lightweight native window for the
official interface while removing distracting elements; it does not see or
modify conversations.

The project documents the boundary between its wrapper and Meta's service in
the [privacy and trust guide](https://messengernext.vercel.app/privacy/). A
separate [developer guide](https://messengernext.vercel.app/developers/)
describes the Tauri 2, Rust, and system WebView architecture.

## Requirements

- A full Facebook account is required.
- The app uses the `facebook.com/messages` backend.
- As of April 2026, standalone Messenger-only accounts are no longer accessible
  on the web and the legacy `messenger.com` portal has been retired.

## Comparison and Goals

`Messenger Next` is intentionally narrow in scope. It provides Facebook Messenger
in a dedicated window with the surrounding Feed, Reels, Marketplace, promotions,
and other unrelated interface removed. The aim is to make everyday conversations
with friends, family, colleagues, and other contacts feel calm and direct,
without wrapper-added advertising or distracting extras.

| Feature         | `Messenger Next`                                                                                     | Official Messenger Desktop                                                                   | Caprine                                                                                  |
| --------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Status          | <img src="./assets/rating-full.svg" width="12" height="12" alt="Full rating"> Active                 | <img src="./assets/rating-empty.svg" width="12" height="12" alt="Empty rating"> Discontinued | <img src="./assets/rating-full.svg" width="12" height="12" alt="Full rating"> Active     |
| Engine          | <img src="./assets/rating-full.svg" width="12" height="12" alt="Full rating"> System WebView (Tauri) | <img src="./assets/rating-empty.svg" width="12" height="12" alt="Empty rating"> Electron     | <img src="./assets/rating-empty.svg" width="12" height="12" alt="Empty rating"> Electron |
| Installer size  | <img src="./assets/rating-full.svg" width="12" height="12" alt="Full rating"> ~4 MB                  | <img src="./assets/rating-empty.svg" width="12" height="12" alt="Empty rating"> 100 MB++     | <img src="./assets/rating-half.svg" width="12" height="12" alt="Half rating"> 100 MB+    |
| CPU / RAM usage | <img src="./assets/rating-full.svg" width="12" height="12" alt="Full rating"> Low                    | <img src="./assets/rating-empty.svg" width="12" height="12" alt="Empty rating"> High         | <img src="./assets/rating-half.svg" width="12" height="12" alt="Half rating"> Medium     |
| Interface focus | <img src="./assets/rating-full.svg" width="12" height="12" alt="Full rating"> Clean chat only        | <img src="./assets/rating-full.svg" width="12" height="12" alt="Full rating"> Clean chat     | <img src="./assets/rating-half.svg" width="12" height="12" alt="Half rating"> Custom UI  |

The goal is not to become a feature-heavy replacement for every Messenger
client. `Messenger Next` prioritizes a small, smooth, regularly maintained desktop
app that uses little storage, CPU, and memory while keeping messaging easy.

## Support

Share feedback in [Discussions](https://github.com/rozsazoltan/messenger/discussions)
or report reproducible problems in [Issues](https://github.com/rozsazoltan/messenger/issues).

If `Messenger Next` is useful to you, consider
[starring the repository](https://github.com/rozsazoltan/messenger). It helps
other people looking for a focused Messenger Desktop client find the project.

## Disclaimer

This is an unofficial, non-commercial application with no affiliation to,
endorsement by, or partnership with Meta Platforms, Inc. Messenger and the
Messenger logo are trademarks of Meta Platforms, Inc., referenced solely to
identify the service this app provides access to.

The application acts as a transparent wrapper around the official Facebook
Messenger web interface and does not modify, intercept, or store any
communication. All data is transmitted directly between the user and Facebook
servers.

## License

`Messenger Next` is developed and maintained independently by [Zoltan Rozsa](https://stackoverflow.com/users/15167500/rozsazoltan).
The public documentation and distribution scripts in this repository are
available under the [GNU Affero General Public License v3.0](./LICENSE); the
`Messenger Next` application source is not included in this repository.

The project thanks Facebook and Meta for creating and operating Messenger,
whose web interface makes this dedicated desktop application possible.
