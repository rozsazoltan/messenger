# Messenger Desktop for Windows, macOS & Linux

[![Latest release](https://img.shields.io/github/v/release/rozsazoltan/messenger?label=messenger-next)](https://github.com/rozsazoltan/messenger/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/rozsazoltan/messenger/total?label=downloads)](https://github.com/rozsazoltan/messenger/releases/latest)
[![Release date](https://img.shields.io/github/release-date/rozsazoltan/messenger?label=release-date)](https://github.com/rozsazoltan/messenger/releases/latest)

An unofficial, lightweight desktop wrapper for Facebook Messenger — built with Tauri, not Electron. No feed, no reels, no marketplace. Just your conversations in a dedicated window.

- [Download](#download)
- [The Story](#the-story)
- [Features](#features)
- [Privacy & Security](#privacy--security)
- [Requirements](#requirements)
- [Comparison](#comparison)

## Download

| | ![Windows](https://img.shields.io/badge/Windows-0078D4?style=flat&logo=windows&logoColor=white) | ![macOS](https://img.shields.io/badge/macOS-000000?style=flat&logo=apple&logoColor=white) | ![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black) |
| :--- | :---: | :---: | :---: |
| **Installer** *(recommended)* | [![.msi](https://img.shields.io/badge/.msi-0078D4?style=flat-square&logo=windows&logoColor=white)](https://github.com/rozsazoltan/messenger/releases/latest/download/messenger-next.msi) | [![.dmg](https://img.shields.io/badge/.dmg-000000?style=flat-square&logo=apple&logoColor=white)](https://github.com/rozsazoltan/messenger/releases/latest/download/messenger-next.dmg) | [![.deb](https://img.shields.io/badge/.deb-E95420?style=flat-square&logo=ubuntu&logoColor=white)](https://github.com/rozsazoltan/messenger/releases/latest/download/messenger-next.deb) |
| **Portable** | — | [![.app.tar.gz](https://img.shields.io/badge/.app.tar.gz-000000?style=flat-square&logo=apple&logoColor=white)](https://github.com/rozsazoltan/messenger/releases/latest/download/messenger-next.app.tar.gz) | [![.AppImage](https://img.shields.io/badge/.AppImage-FCC624?style=flat-square&logo=linux&logoColor=black)](https://github.com/rozsazoltan/messenger/releases/latest/download/messenger-next.AppImage) |

## The Story

This project started in 2025 out of frustration. The official Messenger Desktop app was notoriously buggy and consumed far too much memory. When Meta discontinued it in December 2025, the need for a simple, focused alternative became obvious.

With the shutdown of `messenger.com` in April 2026, the stakes got higher. The app was updated to bridge the gap: it uses the `facebook.com/messages` backend but surgically removes the surrounding noise. No Reels, no Marketplace, no Feed — just your conversations in a dedicated, isolated window.

> **Why is it called `messenger-next`?**  
> After the end of `messenger.com` and the official desktop client, this project continues that standalone Messenger experience in a simpler form.

## Features

### Core

By using the system's native WebView through Tauri instead of bundling a full browser engine, the app stays incredibly small and efficient:

- Installer size of ~5 MB (vs. 100 MB+ for Electron alternatives)
- Low CPU and memory usage
- Built-in update notifications — when Facebook changes their UI, a verified update is usually just a click away

### Keyboard shortcuts

| Shortcut | Action |
| :--- | :--- |
| `F2` | Check for updates |
| `F3` | Open settings |
| `F5` / `Ctrl+R` | Reload page |

### Settings (`F3`)

- Always on Top
- System Tray support
- Start to Tray
- Start on System Startup *(cross-platform)*
- Hide on Close
- Multi Instance *(experimental)*

### Usability enhancements

**Enhanced image zoom**  
Double-click to enter zoom mode, scroll to zoom further, drag or use arrow keys to pan. Double-click again to exit.

**Copy Image from context menu**  
Images displayed in Messenger can be copied directly to the clipboard — including images that are not available as standard attachments.

**Direct link handling**  
External links bypass Facebook's tracking redirects and open directly in your default browser.

## Privacy & Security

This app was built with a privacy-first mindset. It does not collect, store, or intercept any data — no messages, no credentials, no usage data.

All communication happens directly between your computer and Facebook's official servers. The wrapper is transparent by design: it doesn't "see" your messages, it simply provides a lightweight native window for the official interface while removing distracting elements.

## Requirements

- A **full Facebook account** is required
- The app uses the `facebook.com/messages` backend
- As of April 2026, standalone Messenger-only accounts are no longer accessible via web, and the legacy `messenger.com` portal has been retired

## Comparison

| Feature | messenger-next | Official Messenger Desktop | Caprine |
| :--- | :--- | :--- | :--- |
| **Status** | ✅ Active | ❌ Discontinued | ✅ Active |
| **Engine** | System WebView (Tauri) | Electron | Electron |
| **Installer size** | ~5 MB | ~100+ MB | ~100 MB |
| **CPU / RAM usage** | Low | High | Medium |
| **Interface focus** | Clean chat only | Clean chat | Custom UI |

## Disclaimer

This is an unofficial, non-commercial application with no affiliation to, endorsement by, or partnership with Meta Platforms, Inc. Messenger and the Messenger logo are trademarks of Meta Platforms, Inc., referenced solely to identify the service this app provides access to.

The application acts as a transparent wrapper around the official Facebook Messenger web interface and does not modify, intercept, or store any communication. All data is transmitted directly between the user and Facebook's servers.

---

**Maintained by:** [rozsazoltan](https://stackoverflow.com/users/15167500/rozsazoltan)
