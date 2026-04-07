# Messenger Desktop for Windows, Mac & Linux

[![Latest release](https://img.shields.io/github/v/release/rozsazoltan/messenger?label=messenger%2Dnext)](https://github.com/rozsazoltan/messenger/releases/latest)
[![downloads](https://img.shields.io/github/downloads/rozsazoltan/messenger/latest/total?label=downloads)](https://github.com/rozsazoltan/messenger/releases/latest)
[![release-date](https://img.shields.io/github/release-date/rozsazoltan/messenger?label=release-date)](https://github.com/rozsazoltan/messenger/releases/latest)

This is a lightweight desktop application for Facebook Messenger, serving as a standalone replacement for the official Meta desktop client that was discontinued in late 2025. 

The application architecture ensures privacy by acting as a transparent wrapper; it does not collect, store, or intercept any data. It simply provides a native window for the official Facebook infrastructure, meaning all communication and message handling remain strictly between your computer and Facebook's servers, exactly as they would in a standard web browser.

👉 [Download Latest Release](https://github.com/rozsazoltan/messenger/releases/latest)

### Why this project exists
This is an unofficial, non-commercial desktop wrapper for Facebook Messenger - a personal project with no affiliation to, endorsement by, or partnership with Meta Platforms, Inc. The Messenger name and logo are trademarks of Meta Platforms, Inc. They are referenced solely to identify the service this app provides access to. No ownership or association is claimed.

The sole purpose of this app is to provide a clean, distraction-free desktop experience for Messenger - without a browser, and without Facebook's news feed, reels, or other notifications getting in the way.

### Requirements
Since this application is built on the `facebook.com/messages` backend, a full Facebook account is required for use. This ensures long-term compatibility following the changes to Meta's infrastructure; as of April 2026, standalone Messenger-only accounts are no longer accessible via web browsers, and the legacy messenger.com portal has been retired.

### Privacy and Security
I built this app with a privacy-first mindset. It does not collect, store, or transmit any of your personal data, login credentials, or chat history. All communication happens directly between your computer and Facebook's official servers without any middle-man involvement. The wrapper itself is designed to be transparent; it doesn't "see" your messages, it simply provides a lightweight window to display the official interface while stripping away the distracting elements.

### The Story
The project started back in 2025 out of pure frustration. The official Messenger Desktop app at the time was notoriously buggy and consumed far too much memory. When Meta finally discontinued it in December 2025, I needed a reliable way to stay connected without keeping a heavy browser tab open all day.

With the shutdown of `messenger.com` in April 2026, the stakes got higher. I updated the app to bridge the gap: it uses the `facebook.com/messages` backend but surgically removes the "Facebook noise". No Reels, no Marketplace, and no Feed - just your conversations in a dedicated, isolated window.

### Why is it called `messenger-next`?
The project has always used the name `messenger-next` for its executables. The idea behind it is simple: after the end of `messenger.com` and the discontinuation of the official Messenger Desktop app, this project serves as a continuation of that experience. It aims to preserve the familiar, dedicated Messenger workflow in a standalone desktop app - without the extra Facebook noise around it.

### Why use this instead of a browser?
It is all about focus and footprint. By using the system's native WebView through Tauri, the app installer stays incredibly small (~5MB) compared to the 100MB+ installers of Electron-based alternatives. 

It behaves like a real desktop app: external links open in your default browser so your chat remains undisturbed, and file downloads work exactly as they should. Plus, it handles updates automatically - if Facebook changes their UI, a verified update is usually just a click away via the built-in notification system.

### Comparison

| Feature | Unofficial Messenger Desktop (Tauri) | Official Messenger Desktop (Legacy) | Caprine (Electron) |
| :--- | :--- | :--- | :--- |
| **Installer Size** | ~5 MB | ~100+ MB | ~100 MB |
| **Base Technology** | System WebView | Electron | Electron |
| **Interface Focus** | Isolated Chat | Isolated Chat | Custom Features |
| **Status** | ✅ Active | ❌ Discontinued | ✅ Active |

### Download
You can find the latest verified installers for Windows (.msi), macOS (.dmg), and Linux (.AppImage, .deb) on the releases page:

👉 [Download Latest Release](https://github.com/rozsazoltan/messenger/releases/latest)

### Key Enhancements

• **Direct Link Handling**  
The app actively intercepts link tracking. While Facebook typically routes external links through their own tracking servers to build interest profiles, this application blocks those scripts and opens the target URL directly in your default browser.

• **Noise Reduction**  
The interface is optimized to eliminate distractions. Upon startup, the app hides Feeds, Reels, and other non-messaging elements. Internal Facebook links are also forced into external windows to ensure your chat environment remains undisturbed.

• **Automated Updates**  
To maintain compatibility with Facebook's frequent UI and technical changes, the app features a built-in update system. When a new version is released to address these changes, you will receive a notification within the app. Updates are delivered from verified, signed GitHub releases and can be installed with a single click.

### Small but Useful Extras

• **Enhanced Image Zoom**  
Double-click an enlarged image to enter zoom mode. Once active, use the mouse wheel to zoom in or out, pan across zoomed areas by clicking and dragging or by using the arrow keys, and double-click to return to the original size. This makes it much easier to inspect photos without resizing the app window - something Facebook Messenger itself does not normally support.

• **Copy Image from the Right-Click Menu**  
The app adds a **Copy Image** option to the context menu, allowing images shown in Messenger to be copied directly to the clipboard. It works across different kinds of displayed images, not just standard image attachments.

---
**Maintained by:** [rozsazoltan](https://stackoverflow.com/users/15167500/rozsazoltan)
