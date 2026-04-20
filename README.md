# Messenger Desktop for Windows, Mac & Linux

[![Latest release](https://img.shields.io/github/v/release/rozsazoltan/messenger?label=messenger-next)](https://github.com/rozsazoltan/messenger/releases/latest)
[![downloads](https://img.shields.io/github/downloads/rozsazoltan/messenger/total?label=downloads)](https://github.com/rozsazoltan/messenger/releases/latest)
[![release-date](https://img.shields.io/github/release-date/rozsazoltan/messenger?label=release-date)](https://github.com/rozsazoltan/messenger/releases/latest)

This is a lightweight desktop application for Facebook Messenger, serving as a standalone replacement for the official Meta desktop client that was discontinued in late 2025. 

The application architecture ensures privacy by acting as a transparent wrapper; it does not collect, store, or intercept any data. It simply provides a native window for the official Facebook infrastructure, meaning all communication and message handling remain strictly between your computer and Facebook's servers, exactly as they would in a standard web browser.

- [Download](#download)
- [Features](#features)
- [Privacy and Security](#privacy-and-security)
- [Requirements](#requirements)
- [Comparison](#comparison)

## Download

<table>
  <thead>
    <tr>
      <th align="center">Platform</th>
      <th align="center">Installer</th>
      <th align="center">Portable</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <img src="https://img.shields.io/badge/Windows-0078D4?style=flat&logo=windows&logoColor=white" alt="Windows" />
      </td>
      <td align="center">
        <a href="https://github.com/rozsazoltan/messenger/releases/latest/download/messenger-next.msi">
          <img src="https://img.shields.io/badge/.msi-Download-0078D4?style=flat-square&logo=windows&logoColor=white" alt="Download .msi" />
        </a>
      </td>
      <td align="center">—</td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://img.shields.io/badge/macOS-000000?style=flat&logo=apple&logoColor=white" alt="macOS" />
      </td>
      <td align="center">
        <a href="https://github.com/rozsazoltan/messenger/releases/latest/download/messenger-next.dmg">
          <img src="https://img.shields.io/badge/.dmg-Download-000000?style=flat-square&logo=apple&logoColor=white" alt="Download .dmg" />
        </a>
      </td>
      <td align="center">—</td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black" alt="Linux" />
      </td>
      <td align="center">
        <a href="https://github.com/rozsazoltan/messenger/releases/latest/download/messenger-next.deb">
          <img src="https://img.shields.io/badge/.deb-Download-FCC624?style=flat-square&logo=debian&logoColor=black" alt="Download .deb" />
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/rozsazoltan/messenger/releases/latest/download/messenger-next.AppImage">
          <img src="https://img.shields.io/badge/.AppImage-Download-FCC624?style=flat-square&logo=linux&logoColor=black" alt="Download .AppImage" />
        </a>
      </td>
    </tr>
  </tbody>
</table>

## Why this project exists
The project started as a personal replacement for the old Messenger Desktop app, which had become increasingly heavy and unreliable.

After the official client was discontinued and later `messenger.com` was shut down, the need for a simple, focused desktop Messenger became obvious.

The goal is straightforward: keep Messenger usable as a dedicated app, without requiring a browser tab and without Facebook distractions.

## What it does

The app uses the system WebView through Tauri instead of bundling a full browser engine.

That means:
- low CPU usage  
- low memory usage  
- very small disk footprint (~5 MB installer)

Messenger runs in its own isolated window, with the surrounding Facebook UI removed as much as possible:
- no feed  
- no reels  
- no marketplace  

External links open in your default browser, so your chat stays in place.

## Privacy and Security

The application is designed as a transparent wrapper.

It does not collect, store, or intercept any data. It simply provides a native window for the official Facebook infrastructure, meaning all communication and message handling remain strictly between your computer and Facebook's servers — exactly as they would in a standard web browser.

## Features

### Core

- Lightweight Tauri-based desktop wrapper  
- Uses the official `facebook.com/messages` backend  
- Small installer size (~5 MB)  
- Built-in update notifications  
- External links open in your default browser  

### Extra

- `F2` → check for updates  
- `F3` → open settings  
  - Always on Top  
  - System Tray support  
  - Start to Tray  
  - Start on System Startup (cross-platform)  
  - Hide on Close  
  - Multi Instance *(experimental)*  

### Usability

- **Enhanced image zoom**  
  Double-click to zoom, scroll to zoom further, drag or use arrow keys to pan.

- **Copy Image from context menu**  
  Images can be copied directly to the clipboard.

- **Direct link handling**  
  External links bypass Facebook tracking and open directly.

## Requirements

- A full Facebook account is required  
- Uses `facebook.com/messages` backend  
- Messenger-only accounts are no longer supported  

## Comparison

| Feature | messenger-next | Official Messenger Desktop | Caprine |
| :--- | :--- | :--- | :--- |
| **Status** | ✅ Active | ❌ Discontinued | ✅ Active |
| **Engine** | System WebView (Tauri) | Electron | Electron |
| **Installer size** | ~5 MB | ~100+ MB | ~100 MB |
| **CPU / RAM usage** | Low | High | Medium |
| **Interface focus** | Clean chat only | Clean chat | Custom UI |

## Why use this instead of a browser?

A browser tab works, but it comes with everything else around it — tabs, notifications, feeds.

This keeps Messenger separate, focused, and lightweight.

## Why is it called `messenger-next`?

The name reflects the idea behind the project.

After the end of `messenger.com` and the official Messenger Desktop app, this project continues that standalone Messenger experience in a simpler form.

## Disclaimer

This project is an unofficial, non-commercial application and is not affiliated with, endorsed by, or associated with Meta Platforms, Inc.

Messenger and the Messenger logo are trademarks of Meta Platforms, Inc. They are used solely for identification purposes to describe the service this application provides access to. No ownership or official association with Meta Platforms, Inc. is claimed or implied.

This application acts as a transparent wrapper around the official Facebook Messenger web interface and does not modify, intercept, or store any communication. All data is transmitted directly between the user and Facebook's servers.

---
**Maintained by:** [rozsazoltan](https://stackoverflow.com/users/15167500/rozsazoltan)
