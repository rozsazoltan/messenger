(() => {
  const shouldStartStoryAtTop =
    !window.location.hash || window.location.hash === "#home";
  const shouldPrepareMotion =
    shouldStartStoryAtTop &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  window.__messengerNextStartAtTop = shouldStartStoryAtTop;

  if (shouldPrepareMotion) {
    document.documentElement.classList.add("motion-pending");
    window.__messengerNextMotionFallback = window.setTimeout(() => {
      document.documentElement.classList.remove("motion-pending");
    }, 3000);
  }

  if (!shouldStartStoryAtTop) {
    return;
  }

  window.history.scrollRestoration = "manual";
  const resetScroll = () => window.scrollTo({ left: 0, top: 0 });
  resetScroll();

  window.addEventListener(
    "pageshow",
    () => {
      resetScroll();
      window.requestAnimationFrame(() => {
        resetScroll();
        window.setTimeout(resetScroll, 0);
      });
    },
    { once: true },
  );
})();
