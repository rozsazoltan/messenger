# Messenger Next Guide

Static documentation for `Messenger Next`.

## Local preview

From the Viewdock repository root, run:

```sh
aube run docs:messenger
```

Then open `http://127.0.0.1:4173`. Use a different port when needed:

```sh
aube run docs:messenger -- --port 4174
```

## Vercel

In the public `rozsazoltan/messenger` repository, create a Vercel project with
`docs` as its Root Directory. Use the `Other` framework preset and leave the
build command and output directory empty. Vercel serves `index.html` directly.

The intended production domain is [messengerdesktop.vercel.app](https://messengerdesktop.vercel.app).
