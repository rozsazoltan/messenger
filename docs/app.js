const menuButton = document.querySelector(".menu-button");
const navLinks = [...document.querySelectorAll(".guide-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const headerNavigationLinks = [...document.querySelectorAll(".header-nav a")];
const themeOptions = [...document.querySelectorAll("[data-theme]")];
const themeMeta = document.querySelector('meta[name="theme-color"]');
const themeStorageKey = "messenger-next-docs-theme";
const themes = new Set(["system", "light", "dark"]);
const mobileNavigationQuery = window.matchMedia("(max-width: 960px)");
const guideNavigation = [
  {
    label: "Start here",
    links: [
      ["Overview", "overview"],
      ["Download and install", "download"],
      ["Updates and releases", "updates"],
    ],
  },
  {
    label: "Using the app",
    links: [
      ["Keyboard controls", "controls"],
      ["Settings", "settings"],
      ["Notifications", "notifications"],
      ["Downloads", "downloads"],
    ],
  },
  {
    label: "Trust and help",
    links: [
      ["Privacy and security", "privacy"],
      ["Questions", "faq"],
      ["For developers", "developers"],
      ["Support", "support"],
    ],
  },
];
const motionQuery = window.matchMedia(
  "(prefers-reduced-motion: no-preference)",
);
const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const navigationEntry = performance.getEntriesByType("navigation")[0];
const shouldStartStoryAtTop =
  (!window.location.hash || window.location.hash === "#home") &&
  (window.__messengerNextStartAtTop === true ||
    navigationEntry?.type === "reload");
let motionRuntime;

function revealMotionContent() {
  window.clearTimeout(window.__messengerNextMotionFallback);
  document.documentElement.classList.remove("motion-pending");
}

function normalizePagePath(pathname) {
  const withoutIndex = pathname.replace(/\/index\.html$/, "");
  return withoutIndex === "/" ? "/" : withoutIndex.replace(/\/$/, "");
}

function buildMobileNavigation() {
  const siteHeader = document.querySelector(".site-header");

  if (!menuButton || !siteHeader) {
    return undefined;
  }

  const isGuidePage = normalizePagePath(window.location.pathname) === "/";
  const navigation = document.createElement("div");
  const backdrop = document.createElement("button");
  const panel = document.createElement("nav");
  const grid = document.createElement("div");
  const pages = document.createElement("section");
  const documentation = document.createElement("section");
  const pageLinks = document.createElement("div");
  const guideGroups = document.createElement("div");

  navigation.id = "mobile-navigation";
  navigation.className = "mobile-navigation";
  navigation.setAttribute("aria-hidden", "true");
  navigation.inert = true;

  backdrop.className = "mobile-navigation-backdrop";
  backdrop.type = "button";
  backdrop.tabIndex = -1;
  backdrop.setAttribute("aria-label", "Close navigation");

  panel.className = "mobile-navigation-panel";
  panel.setAttribute("aria-label", "Mobile navigation");
  grid.className = "mobile-navigation-grid";
  pages.className = "mobile-navigation-section";
  documentation.className = "mobile-navigation-section";
  pageLinks.className = "mobile-navigation-links";
  guideGroups.className = "mobile-navigation-guide-groups";

  const pagesLabel = document.createElement("p");
  pagesLabel.className = "mobile-navigation-label";
  pagesLabel.textContent = "Pages";
  pages.append(pagesLabel, pageLinks);

  headerNavigationLinks.forEach((sourceLink) => {
    const link = document.createElement("a");
    const url = new URL(sourceLink.href, window.location.href);
    link.href = sourceLink.getAttribute("href");
    link.textContent = sourceLink.textContent.trim();

    if (
      url.origin === window.location.origin &&
      normalizePagePath(url.pathname) ===
        normalizePagePath(window.location.pathname)
    ) {
      link.setAttribute("aria-current", "page");
    }

    pageLinks.append(link);
  });

  const documentationLabel = document.createElement("p");
  documentationLabel.className = "mobile-navigation-label";
  documentationLabel.textContent = "Documentation";

  guideNavigation.forEach((group) => {
    const groupElement = document.createElement("div");
    const groupLabel = document.createElement("p");
    groupElement.className = "mobile-navigation-guide-group";
    groupLabel.className = "mobile-navigation-group-label";
    groupLabel.textContent = group.label;
    groupElement.append(groupLabel);

    group.links.forEach(([label, id]) => {
      const link = document.createElement("a");
      link.href = `${isGuidePage ? "" : "/"}#${id}`;
      link.dataset.docTarget = `#${id}`;
      link.textContent = label;
      groupElement.append(link);
    });

    guideGroups.append(groupElement);
  });

  documentation.append(documentationLabel, guideGroups);
  grid.append(pages, documentation);
  panel.append(grid);
  navigation.append(backdrop, panel);
  siteHeader.insertAdjacentElement("afterend", navigation);

  return { backdrop, navigation };
}

const mobileNavigation = buildMobileNavigation();

const releaseTabs = [...document.querySelectorAll("[data-release-tab]")];
const releasePanels = [...document.querySelectorAll("[data-release-panel]")];

function setReleaseTab(selectedTab, { focus = false } = {}) {
  const selectedPanel = selectedTab.dataset.releaseTab;

  releaseTabs.forEach((tab) => {
    const isSelected = tab === selectedTab;
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
  });

  releasePanels.forEach((panel) => {
    panel.hidden = panel.dataset.releasePanel !== selectedPanel;
  });

  if (focus) {
    selectedTab.focus();
  }
}

releaseTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => setReleaseTab(tab));
  tab.addEventListener("keydown", (event) => {
    const navigation = {
      ArrowLeft: -1,
      ArrowRight: 1,
      End: releaseTabs.length - 1 - index,
      Home: -index,
    };
    const offset = navigation[event.key];

    if (offset === undefined) {
      return;
    }

    event.preventDefault();
    const nextIndex =
      (index + offset + releaseTabs.length) % releaseTabs.length;
    setReleaseTab(releaseTabs[nextIndex], { focus: true });
  });
});

function setMobileNavigationOpen(isOpen, { restoreFocus = true } = {}) {
  if (!menuButton || !mobileNavigation) {
    return;
  }

  mobileNavigation.navigation.classList.toggle("open", isOpen);
  mobileNavigation.navigation.setAttribute("aria-hidden", String(!isOpen));
  mobileNavigation.navigation.inert = !isOpen;
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );
  menuButton.title = isOpen ? "Close navigation" : "Open navigation";
  document.body.classList.toggle("mobile-navigation-open", isOpen);

  if (isOpen) {
    window.requestAnimationFrame(() => {
      mobileNavigation.navigation.querySelector("a")?.focus();
    });
  } else if (restoreFocus) {
    menuButton.focus();
  }
}

if (shouldStartStoryAtTop) {
  history.scrollRestoration = "manual";
  window.scrollTo({ left: 0, top: 0 });
}

menuButton?.addEventListener("click", () => {
  setMobileNavigationOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

mobileNavigation?.backdrop.addEventListener("click", () => {
  setMobileNavigationOpen(false);
});

mobileNavigation?.navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setMobileNavigationOpen(false, { restoreFocus: false });
  });
});

mobileNavigationQuery.addEventListener("change", ({ matches }) => {
  if (!matches) {
    setMobileNavigationOpen(false, { restoreFocus: false });
  }
});

document.addEventListener("keydown", (event) => {
  if (
    !mobileNavigation ||
    menuButton?.getAttribute("aria-expanded") !== "true"
  ) {
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    setMobileNavigationOpen(false);
    return;
  }

  if (event.key !== "Tab") {
    return;
  }

  const focusable = [
    menuButton,
    ...mobileNavigation.navigation.querySelectorAll("a"),
  ];
  const first = focusable[0];
  const last = focusable.at(-1);

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort(
        (left, right) => right.intersectionRatio - left.intersectionRatio,
      )[0];

    if (!visible) {
      return;
    }

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${visible.target.id}`;
      link.classList.toggle("active", isActive);

      if (isActive) {
        mobileNavigation?.navigation
          .querySelectorAll("[data-doc-target]")
          .forEach((mobileLink) => {
            mobileLink.classList.toggle(
              "active",
              mobileLink.dataset.docTarget === link.getAttribute("href"),
            );
          });
      }
    });
  },
  { rootMargin: "-18% 0px -72% 0px", threshold: [0.1, 0.5] },
);

sections.forEach((section) => sectionObserver.observe(section));

function readStoredTheme() {
  try {
    const theme = window.localStorage.getItem(themeStorageKey);
    return themes.has(theme) ? theme : "system";
  } catch {
    return "system";
  }
}

function updateThemeColor(theme) {
  if (!themeMeta) {
    return;
  }

  const useDark =
    theme === "dark" || (theme === "system" && colorSchemeQuery.matches);
  themeMeta.setAttribute("content", useDark ? "#000000" : "#ffffff");
}

function applyTheme(theme, { persist = true } = {}) {
  const nextTheme = themes.has(theme) ? theme : "system";
  document.documentElement.classList.remove(...themes);
  document.documentElement.classList.add(nextTheme);

  themeOptions.forEach((option) => {
    option.setAttribute(
      "aria-pressed",
      String(option.dataset.theme === nextTheme),
    );
  });

  if (persist) {
    try {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    } catch {
      // The visual preference is optional when local storage is unavailable.
    }
  }

  updateThemeColor(nextTheme);
}

applyTheme(readStoredTheme(), { persist: false });

themeOptions.forEach((option) => {
  option.addEventListener("click", () => applyTheme(option.dataset.theme));
});

colorSchemeQuery.addEventListener("change", () => {
  if (document.documentElement.classList.contains("system")) {
    updateThemeColor("system");
  }
});

document.querySelectorAll('a[href^="http"]').forEach((link) => {
  link.classList.add("external-link");
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noreferrer");

  if (!link.hasAttribute("aria-label")) {
    link.setAttribute(
      "aria-label",
      `${link.textContent.trim()} (opens in a new tab)`,
    );
  }
});

function parseReleaseVersion(tagName) {
  const match = /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/.exec(
    tagName.trim(),
  );

  if (!match) {
    return undefined;
  }

  return {
    core: match.slice(1, 4).map(Number),
    prerelease: match[4],
  };
}

function compareCoreVersion(left, right) {
  for (let index = 0; index < left.length; index += 1) {
    const difference = left[index] - right[index];
    if (difference !== 0) {
      return difference;
    }
  }

  return 0;
}

function compareRelease(left, right) {
  const leftVersion = parseReleaseVersion(left.tag_name);
  const rightVersion = parseReleaseVersion(right.tag_name);

  if (!leftVersion || !rightVersion) {
    return new Date(left.published_at) - new Date(right.published_at);
  }

  const coreDifference = compareCoreVersion(
    leftVersion.core,
    rightVersion.core,
  );
  if (coreDifference !== 0) {
    return coreDifference;
  }

  if (leftVersion.prerelease && !rightVersion.prerelease) {
    return -1;
  }

  if (!leftVersion.prerelease && rightVersion.prerelease) {
    return 1;
  }

  return left.tag_name.localeCompare(right.tag_name, undefined, {
    numeric: true,
  });
}

function newestRelease(releases) {
  return [...releases].sort(compareRelease).at(-1);
}

function buildReleaseSummary(releases) {
  const published = releases.filter((release) => !release.draft);
  const stable = newestRelease(
    published.filter((release) => !release.prerelease),
  );
  const stableVersion = stable && parseReleaseVersion(stable.tag_name);
  const activePreviews = published.filter((release) => {
    if (!release.prerelease) {
      return false;
    }

    const version = parseReleaseVersion(release.tag_name);
    return Boolean(
      version &&
      (!stableVersion ||
        compareCoreVersion(version.core, stableVersion.core) > 0),
    );
  });
  const preview = newestRelease(activePreviews);
  const downloads = published.reduce(
    (total, release) =>
      total +
      release.assets.reduce((count, asset) => count + asset.download_count, 0),
    0,
  );

  return {
    downloads,
    preview: preview?.tag_name ?? "None",
    previewNote: preview
      ? "Available for early testing"
      : "No newer preview is active",
    previewUrl: preview?.html_url,
    stable: stable?.tag_name ?? "Unavailable",
    stableUrl: stable?.html_url,
  };
}

function setReleaseAction(link, url, label) {
  if (!link) {
    return;
  }

  const isAvailable = Boolean(url);
  link.hidden = !isAvailable;

  if (!isAvailable) {
    link.removeAttribute("href");
    link.removeAttribute("aria-label");
    return;
  }

  link.href = url;
  link.setAttribute("aria-label", `${label} (opens in a new tab)`);
}

function setReleaseSummary(summary) {
  const downloads = document.querySelector("[data-release-downloads]");
  const stable = document.querySelector("[data-release-stable]");
  const preview = document.querySelector("[data-release-prerelease]");
  const previewNote = document.querySelector("[data-release-prerelease-note]");
  const stableLink = document.querySelector("[data-release-stable-link]");
  const previewLink = document.querySelector("[data-release-prerelease-link]");

  if (downloads) {
    downloads.textContent = formatDownloadCount(summary.downloads);
  }

  if (stable) {
    stable.textContent = summary.stable;
  }

  if (preview) {
    preview.textContent = summary.preview;
  }

  if (previewNote) {
    previewNote.textContent = summary.previewNote;
  }

  setReleaseAction(stableLink, summary.stableUrl, `Download ${summary.stable}`);
  setReleaseAction(
    previewLink,
    summary.previewUrl,
    `Download ${summary.preview} preview`,
  );
}

function formatDownloadCount(downloads) {
  if (downloads < 1_000) {
    return new Intl.NumberFormat("en-US").format(downloads);
  }

  const thousands = Math.ceil(downloads / 100) / 10;
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
  }).format(thousands);

  return `${formatted}K`;
}

const releaseCacheKey = "messenger-next-docs-release-summary-v3";
const releaseCacheLifetime = 12 * 60 * 60 * 1000;

function readReleaseCache() {
  try {
    const value = JSON.parse(window.localStorage.getItem(releaseCacheKey));
    return value && Date.now() - value.cachedAt < releaseCacheLifetime
      ? value.summary
      : undefined;
  } catch {
    return undefined;
  }
}

function saveReleaseCache(summary) {
  try {
    window.localStorage.setItem(
      releaseCacheKey,
      JSON.stringify({ cachedAt: Date.now(), summary }),
    );
  } catch {
    // Release status remains optional when local storage is unavailable.
  }
}

async function loadReleaseSummary() {
  const cached = readReleaseCache();
  if (cached) {
    setReleaseSummary(cached);
    return;
  }

  try {
    const response = await fetch(
      "https://api.github.com/repos/rozsazoltan/messenger/releases?per_page=100",
      { headers: { Accept: "application/vnd.github+json" } },
    );

    if (!response.ok) {
      throw new Error(`Release API responded with ${response.status}`);
    }

    const summary = buildReleaseSummary(await response.json());
    saveReleaseCache(summary);
    setReleaseSummary(summary);
  } catch {
    setReleaseSummary({
      downloads: 0,
      preview: "Unavailable",
      previewNote: "Check GitHub Releases",
      previewUrl: undefined,
      stable: "Unavailable",
      stableUrl: undefined,
    });
  }
}

if (document.querySelector("[data-release-status]")) {
  loadReleaseSummary();
}

function initializeMotion() {
  motionRuntime?.revert();
  motionRuntime = undefined;
  document.documentElement.classList.remove("motion-ready");

  const { gsap, ScrollTrigger, SplitText } = window;
  if (!motionQuery.matches || !gsap || !ScrollTrigger) {
    revealMotionContent();
    return;
  }

  document.documentElement.classList.add("motion-ready");
  gsap.registerPlugin(ScrollTrigger);
  if (SplitText) {
    gsap.registerPlugin(SplitText);
  }

  const cleanupCallbacks = [];
  const titleSplits = [];
  const media = gsap.matchMedia();
  let heroTimeline;
  let hasHeroEntrance = false;
  const context = gsap.context(() => {
    const header = document.querySelector(".header-inner");
    const runway = document.querySelector("[data-product-runway]");
    const heroCopy = document.querySelector("[data-hero-copy]");
    const heroTitle = heroCopy?.querySelector("[data-split-title]");
    const heroActions = document.querySelector("[data-hero-actions]");
    const heroWindow = document.querySelector("[data-hero-window]");
    const heroFocus = document.querySelector("[data-focus-overlay]");
    const scrollCue = document.querySelector("[data-scroll-cue]");
    const productFrame = document.querySelector("[data-product-frame]");
    const productWindow = productFrame?.querySelector(".product-window");
    const noiseStory = document.querySelector("[data-noise-story]");
    const noiseGate = document.querySelector("[data-noise-gate]");
    const noiseOrbit = noiseGate?.querySelector(".noise-gate-orbit");
    const noiseRing = noiseGate?.querySelector(".noise-gate-ring");
    const noiseSource = noiseStory?.querySelector(".noise-source");
    const noiseLead = noiseStory?.querySelector(".noise-story-copy > p");
    const noiseRecipient = noiseStory?.querySelector(".noise-recipient");
    const noiseRoutes = gsap.utils.toArray("[data-noise-route]");
    const mobileNoiseRoutes = gsap.utils.toArray("[data-noise-route-mobile]");
    const outputRoute = noiseStory?.querySelector("[data-output-route]");
    const mobileOutputRoute = noiseStory?.querySelector(
      "[data-output-route-mobile]",
    );
    const noiseItems = gsap.utils.toArray("[data-noise-item]");
    const blockedNoise = noiseItems.filter(
      (item) => item.dataset.noiseItem !== "message",
    );
    const messageNoise = noiseItems.find(
      (item) => item.dataset.noiseItem === "message",
    );
    const noiseOutput = gsap.utils.toArray("[data-noise-output]");
    const guideBoundary = document.querySelector("[data-guide-boundary]");
    const guideTransition = document.querySelector("[data-guide-transition]");
    const releaseCards = gsap.utils.toArray("[data-release-card]");
    const totalDownloadsCard = document.querySelector(
      ".release-metric-downloads",
    );
    const secondaryReleaseCards = releaseCards.filter(
      (card) => card !== totalDownloadsCard,
    );

    const heroWords = heroTitle
      ? Array.from(heroTitle.querySelectorAll("[data-hero-title-line]"))
      : [];
    const heroTagline = heroCopy?.querySelector(".landing-tagline");
    const heroLead = heroCopy?.querySelector(".landing-lead");
    const heroActionItems = heroActions ? Array.from(heroActions.children) : [];

    if (shouldStartStoryAtTop && header && heroWords.length > 0 && heroWindow) {
      // Apply the visual starting state before revealing the document. A paused
      // timeline with explicit final values cannot flash its completed state.
      gsap.set(header, { autoAlpha: 0, y: -16 });
      gsap.set(heroWords, { autoAlpha: 0, yPercent: 112 });
      gsap.set(heroTagline, { autoAlpha: 0, y: 16 });
      gsap.set(heroLead, { autoAlpha: 0, y: 16 });
      gsap.set(heroActionItems, { autoAlpha: 0, y: 14 });
      gsap.set(heroWindow, {
        autoAlpha: 0,
        rotateX: 7,
        rotateY: -8,
        scale: 0.9,
        transformPerspective: 1600,
        y: 34,
      });
      gsap.set(releaseCards, {
        autoAlpha: 0,
        scale: 0.985,
        transformOrigin: "center center",
        y: 20,
      });

      heroTimeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        paused: true,
      });

      heroTimeline
        .to(header, { autoAlpha: 1, duration: 0.56, y: 0 })
        .to(
          heroWords,
          { autoAlpha: 1, duration: 0.72, stagger: 0.075, yPercent: 0 },
          "-=0.14",
        )
        .to(heroTagline, { autoAlpha: 1, duration: 0.5, y: 0 }, "-=0.42")
        .to(heroLead, { autoAlpha: 1, duration: 0.5, y: 0 }, "-=0.3")
        .to(
          heroActionItems,
          { autoAlpha: 1, duration: 0.45, stagger: 0.09, y: 0 },
          "-=0.24",
        )
        .to(
          heroWindow,
          {
            autoAlpha: 1,
            duration: 0.94,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            y: 0,
          },
          "-=0.78",
        )
        .to(
          totalDownloadsCard,
          { autoAlpha: 1, duration: 0.58, scale: 1, y: 0 },
          "-=0.18",
        )
        .to(
          secondaryReleaseCards,
          { autoAlpha: 1, duration: 0.52, scale: 1, stagger: 0.1, y: 0 },
          "-=0.34",
        );
      hasHeroEntrance = true;
    }

    gsap.utils
      .toArray(".landing-download h2, .guide-intro h2")
      .forEach((title) => {
        if (!SplitText) {
          return;
        }

        const split = SplitText.create(title, {
          aria: "auto",
          autoSplit: true,
          linesClass: "split-line",
          type: "lines",
        });
        titleSplits.push(split);
        gsap.from(split.lines, {
          autoAlpha: 0,
          duration: 0.68,
          ease: "power3.out",
          scrollTrigger: {
            invalidateOnRefresh: true,
            once: true,
            start: "top 84%",
            trigger: title,
          },
          stagger: 0.08,
          yPercent: 72,
        });
      });

    if (runway && productFrame && productWindow) {
      const incoming = productWindow.querySelector("[data-current-prompt]");
      const outgoing = productWindow.querySelector("[data-current-response]");
      const outgoingRow = productWindow.querySelector("[data-outgoing-row]");
      const lateMessage = productWindow.querySelector(".demo-message-late");
      const incomingStage = productWindow.querySelector(
        "[data-incoming-stage]",
      );
      const typing = productWindow.querySelector(".demo-typing");
      const notification = productWindow.querySelector(".demo-notification");
      const activeAvatars = productWindow.querySelectorAll(
        "[data-active-avatar]",
      );
      const statusBefore = productWindow.querySelector("[data-status-before]");
      const statusAfter = productWindow.querySelector("[data-status-after]");
      const theoContact = productWindow.querySelector("[data-theo-contact]");
      const theoBefore = theoContact?.querySelector("[data-theo-before]");
      const theoAfter = theoContact?.querySelector("[data-theo-after]");
      const noraInitial = productWindow.querySelector("[data-nora-initial]");
      const noraResponse = productWindow.querySelector("[data-nora-response]");
      const noraLatest = productWindow.querySelector("[data-nora-latest]");
      const noraTimeInitial = productWindow.querySelector(
        "[data-nora-time-initial]",
      );
      const noraTimeResponse = productWindow.querySelector(
        "[data-nora-time-response]",
      );
      const noraTimeLatest = productWindow.querySelector(
        "[data-nora-time-latest]",
      );
      const animatedProductDetails = [
        outgoing,
        lateMessage,
        typing,
        notification,
        statusAfter,
        theoAfter,
        noraResponse,
        noraLatest,
        noraTimeResponse,
        noraTimeLatest,
      ].filter(Boolean);

      media.add("(min-width: 961px)", () => {
        gsap.set(heroFocus, { autoAlpha: 0, y: 52 });
        gsap.set(animatedProductDetails, { autoAlpha: 0 });
        gsap.set(
          [
            incoming,
            statusBefore,
            theoBefore,
            noraInitial,
            noraTimeInitial,
          ].filter(Boolean),
          {
            autoAlpha: 1,
          },
        );
        gsap.set([outgoingRow, incomingStage].filter(Boolean), {
          height: 0,
        });
        gsap.set(activeAvatars, {
          "--active-dot-opacity": 0,
          "--active-dot-scale": 0.7,
        });
        gsap.set(theoContact, { "--unread-dot-opacity": 0 });

        const messageRowHeight = (element) => {
          const gap = window.innerWidth <= 960 ? 6 : 9;
          return (element?.offsetHeight ?? 0) + gap;
        };

        const centerProduct = () => {
          const bounds = productFrame.getBoundingClientRect();
          return window.innerWidth / 2 - (bounds.left + bounds.width / 2);
        };

        const productTimeline = gsap.timeline({
          scrollTrigger: {
            anticipatePin: 1,
            end: () => `+=${Math.max(window.innerHeight * 3.45, 2350)}`,
            invalidateOnRefresh: true,
            pin: true,
            scrub: 0.68,
            start: "top top+=68",
            trigger: runway,
          },
        });

        productTimeline
          .to(scrollCue, { autoAlpha: 0, duration: 0.16, y: 12 }, 0)
          .to(heroCopy, { autoAlpha: 0, duration: 0.52, xPercent: -24 }, 0.03)
          .to(
            productFrame,
            {
              duration: 0.92,
              ease: "power1.inOut",
              rotateX: 0,
              rotateY: 0,
              scale: 1.18,
              x: centerProduct,
              y: () => (window.innerHeight < 860 ? 34 : -18),
            },
            0,
          )
          .to(statusBefore, { autoAlpha: 0, duration: 0.16 }, 0.25)
          .fromTo(
            statusAfter,
            { autoAlpha: 0, y: 3 },
            { autoAlpha: 1, duration: 0.18, y: 0 },
            0.27,
          )
          .to(
            activeAvatars,
            {
              "--active-dot-opacity": 1,
              "--active-dot-scale": 1,
              duration: 0.2,
            },
            0.27,
          )
          .to(
            outgoingRow,
            {
              duration: 0.2,
              ease: "power1.out",
              height: () => messageRowHeight(outgoing),
            },
            0.34,
          )
          .fromTo(
            outgoing,
            { autoAlpha: 0, x: 18, y: 8 },
            {
              autoAlpha: 1,
              duration: 0.22,
              ease: "power2.out",
              x: 0,
              y: 0,
            },
            0.37,
          )
          .to(
            [noraInitial, noraTimeInitial].filter(Boolean),
            { autoAlpha: 0, duration: 0.14, y: -2 },
            0.47,
          )
          .fromTo(
            [noraResponse, noraTimeResponse].filter(Boolean),
            { autoAlpha: 0, y: 3 },
            { autoAlpha: 1, duration: 0.18, y: 0 },
            0.49,
          )
          .to(
            incomingStage,
            {
              duration: 0.18,
              ease: "power1.out",
              height: () => messageRowHeight(typing),
            },
            0.53,
          )
          .fromTo(
            typing,
            { autoAlpha: 0, x: -12 },
            { autoAlpha: 1, duration: 0.16, x: 0 },
            0.56,
          )
          .to(typing, { autoAlpha: 0, duration: 0.12 }, 0.76)
          .to(
            incomingStage,
            {
              duration: 0.2,
              ease: "power1.inOut",
              height: () => messageRowHeight(lateMessage),
            },
            0.85,
          )
          .fromTo(
            lateMessage,
            { autoAlpha: 0, x: -16, y: 7 },
            {
              autoAlpha: 1,
              duration: 0.2,
              ease: "power2.out",
              x: 0,
              y: 0,
            },
            0.88,
          )
          .to(
            [noraResponse, noraTimeResponse].filter(Boolean),
            { autoAlpha: 0, duration: 0.14, y: -2 },
            0.88,
          )
          .fromTo(
            [noraLatest, noraTimeLatest].filter(Boolean),
            { autoAlpha: 0, y: 3 },
            { autoAlpha: 1, duration: 0.18, y: 0 },
            0.9,
          )
          .to(theoBefore, { autoAlpha: 0, duration: 0.14, y: -2 }, 1.04)
          .fromTo(
            theoAfter,
            { autoAlpha: 0, y: 3 },
            { autoAlpha: 1, duration: 0.18, y: 0 },
            1.06,
          )
          .to(
            theoContact,
            {
              "--unread-dot-opacity": 1,
              duration: 0.2,
            },
            1.06,
          )
          .fromTo(
            notification,
            { autoAlpha: 0, scale: 0.96, x: 16, y: -10 },
            {
              autoAlpha: 1,
              duration: 0.24,
              ease: "power2.out",
              scale: 1,
              x: 0,
              y: 0,
            },
            1.09,
          )
          .to(
            productFrame,
            {
              duration: 0.42,
              ease: "power1.inOut",
              scale: 1.24,
              x: () => centerProduct() - window.innerWidth * 0.1,
              y: () => (window.innerHeight < 860 ? 34 : -32),
            },
            1.24,
          )
          .to(
            heroFocus,
            { autoAlpha: 1, duration: 0.36, ease: "power2.out", y: 0 },
            1.3,
          )
          .to({}, { duration: 0.34 });

        return () => {
          gsap.set(
            [
              heroCopy,
              heroFocus,
              productFrame,
              incoming,
              outgoing,
              outgoingRow,
              lateMessage,
              incomingStage,
              typing,
              notification,
              activeAvatars,
              statusBefore,
              statusAfter,
              theoContact,
              theoBefore,
              theoAfter,
              noraBefore,
              noraAfter,
            ],
            { clearProps: "all" },
          );
        };
      });
    }

    if (
      noiseStory &&
      noiseGate &&
      noiseOrbit &&
      noiseLead &&
      messageNoise &&
      noiseOutput.length > 0
    ) {
      const itemToGateX = (item) => {
        const itemBounds = item.getBoundingClientRect();
        const gateBounds = noiseGate.getBoundingClientRect();
        return (
          gateBounds.left +
          gateBounds.width / 2 -
          (itemBounds.left + itemBounds.width / 2)
        );
      };
      const itemToGateY = (item) => {
        const itemBounds = item.getBoundingClientRect();
        const gateBounds = noiseGate.getBoundingClientRect();
        return (
          gateBounds.top +
          gateBounds.height / 2 -
          (itemBounds.top + itemBounds.height / 2)
        );
      };
      const gateToOutputX = (output) => {
        const gateBounds = noiseGate.getBoundingClientRect();
        const outputBounds = output.getBoundingClientRect();
        return (
          gateBounds.left +
          gateBounds.width / 2 -
          (outputBounds.left + outputBounds.width / 2)
        );
      };
      const gateToOutputY = (output) => {
        const gateBounds = noiseGate.getBoundingClientRect();
        const outputBounds = output.getBoundingClientRect();
        return (
          gateBounds.top +
          gateBounds.height / 2 -
          (outputBounds.top + outputBounds.height / 2)
        );
      };

      const setupNoiseSequence = ({ isMobile, routes, routeOut }) => {
        const noiseTitleLines = gsap.utils.toArray(".noise-story h2 > span");
        gsap.set(noiseOutput, {
          autoAlpha: 0,
          scale: 0.72,
          x: (_, output) => gateToOutputX(output),
          y: (_, output) => gateToOutputY(output),
        });
        gsap.set(noiseRecipient, { autoAlpha: 0.38, scale: 0.9 });
        gsap.set([...routes, routeOut].filter(Boolean), {
          strokeDashoffset: 72,
        });
        const noiseTimeline = gsap.timeline({
          scrollTrigger: isMobile
            ? {
                end: "bottom 22%",
                invalidateOnRefresh: true,
                scrub: 0.75,
                start: "top 72%",
                trigger: noiseStory,
              }
            : {
                anticipatePin: 1,
                end: () => `+=${Math.max(window.innerHeight * 2.4, 1900)}`,
                invalidateOnRefresh: true,
                pin: true,
                scrub: 0.9,
                start: "top top+=68",
                trigger: noiseStory,
              },
        });

        noiseTimeline
          .from(
            noiseTitleLines,
            {
              autoAlpha: 0,
              duration: 0.42,
              stagger: 0.1,
              yPercent: 48,
            },
            0,
          )
          .from(
            noiseLead,
            {
              autoAlpha: 0,
              duration: 0.36,
              ease: "power2.out",
              y: 18,
            },
            0.18,
          )
          .from(noiseSource, { autoAlpha: 0, duration: 0.24, scale: 0.8 }, 0)
          .to(
            routes,
            { duration: 0.58, ease: "none", strokeDashoffset: 0 },
            0.04,
          )
          .from(
            noiseItems,
            {
              autoAlpha: 0,
              duration: 0.32,
              scale: 0.72,
              stagger: 0.055,
              x: isMobile ? 0 : -48,
              y: isMobile ? -42 : 0,
            },
            0.14,
          )
          .to(
            noiseItems,
            {
              duration: 0.82,
              ease: "power1.inOut",
              x: (_, item) => itemToGateX(item),
              y: (_, item) => itemToGateY(item),
            },
            0.44,
          )
          .to(
            noiseOrbit,
            {
              borderRadius: "39% 61% 43% 57% / 62% 38% 62% 38%",
              duration: 0.58,
              rotation: 18,
              scale: 1.12,
            },
            0.68,
          )
          .to(
            noiseRing,
            {
              borderRadius: "61% 39% 48% 52% / 35% 57% 43% 65%",
              duration: 0.68,
              rotation: -24,
              scale: 1.05,
            },
            0.62,
          )
          .to(
            blockedNoise,
            {
              autoAlpha: 0,
              duration: 0.2,
              scale: 0.18,
              stagger: 0.015,
            },
            0.92,
          )
          .to(
            messageNoise,
            {
              autoAlpha: 0,
              duration: 0.18,
              ease: "power1.inOut",
              scale: 0.32,
            },
            1.02,
          )
          .to(
            routeOut,
            { duration: 0.48, ease: "none", strokeDashoffset: 0 },
            1.18,
          )
          .to(
            noiseOutput,
            {
              autoAlpha: 1,
              duration: 0.58,
              ease: "power2.out",
              scale: 1,
              stagger: 0.12,
              x: 0,
              y: 0,
            },
            1.22,
          )
          .to(noiseRecipient, { autoAlpha: 1, duration: 0.38, scale: 1 }, 1.34)
          .to({}, { duration: 0.5 });

        return () => {
          gsap.set(
            [
              ...noiseItems,
              ...noiseOutput,
              ...noiseTitleLines,
              ...routes,
              routeOut,
              noiseOrbit,
              noiseRing,
              noiseLead,
              noiseSource,
              noiseRecipient,
            ].filter(Boolean),
            { clearProps: "all" },
          );
        };
      };

      media.add("(min-width: 681px)", () => {
        return setupNoiseSequence({
          isMobile: false,
          routeOut: outputRoute,
          routes: noiseRoutes,
        });
      });

      media.add("(max-width: 680px)", () => {
        return setupNoiseSequence({
          isMobile: true,
          routeOut: mobileOutputRoute,
          routes: mobileNoiseRoutes,
        });
      });
    }

    media.add("(hover: hover) and (pointer: fine)", () => {
      const magneticElements = gsap.utils.toArray("[data-magnetic]");
      const listeners = magneticElements.map((element) => {
        const moveX = gsap.quickTo(element, "x", {
          duration: 0.28,
          ease: "power3.out",
        });
        const moveY = gsap.quickTo(element, "y", {
          duration: 0.28,
          ease: "power3.out",
        });
        const onMove = (event) => {
          const bounds = element.getBoundingClientRect();
          const strength = element.matches(".button-primary") ? 0.18 : 0.075;
          moveX((event.clientX - bounds.left - bounds.width / 2) * strength);
          moveY((event.clientY - bounds.top - bounds.height / 2) * strength);
        };
        const onLeave = () => {
          moveX(0);
          moveY(0);
        };

        element.addEventListener("pointermove", onMove);
        element.addEventListener("pointerleave", onLeave);
        return () => {
          element.removeEventListener("pointermove", onMove);
          element.removeEventListener("pointerleave", onLeave);
          gsap.set(element, { clearProps: "transform" });
        };
      });

      return () => listeners.forEach((remove) => remove());
    });

    if (guideBoundary && guideTransition) {
      gsap.fromTo(
        guideBoundary,
        { scaleX: 0.08 },
        {
          ease: "none",
          scaleX: 1,
          scrollTrigger: {
            end: "bottom 72%",
            scrub: 0.5,
            start: "top bottom",
            trigger: guideBoundary,
          },
          transformOrigin: "left center",
        },
      );
      gsap.fromTo(
        guideTransition,
        { clipPath: "inset(0 5% 0 5%)", y: 34 },
        {
          clipPath: "inset(0 0% 0 0%)",
          ease: "power2.out",
          scrollTrigger: {
            end: "top 48%",
            scrub: 0.55,
            start: "top 88%",
            trigger: guideTransition,
          },
          y: 0,
        },
      );
    }
  }, document.body);

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh, { once: true });
  motionRuntime = {
    revert() {
      window.removeEventListener("load", refresh);
      cleanupCallbacks.forEach((cleanup) => cleanup());
      media.revert();
      titleSplits.forEach((split) => split.revert());
      context.revert();
    },
  };
  revealMotionContent();
  if (hasHeroEntrance) {
    window.requestAnimationFrame(() => heroTimeline?.play(0));
  }
}

motionQuery.addEventListener("change", initializeMotion);
window.addEventListener(
  "pagehide",
  () => {
    motionRuntime?.revert();
  },
  { once: true },
);

if (shouldStartStoryAtTop) {
  window.scrollTo({ left: 0, top: 0 });
  initializeMotion();
  window.addEventListener(
    "load",
    () => {
      window.requestAnimationFrame(() => {
        window.scrollTo({ left: 0, top: 0 });
        window.ScrollTrigger?.refresh(true);
      });
    },
    { once: true },
  );
} else {
  initializeMotion();
}

function scrollToHashTarget() {
  const hash = window.location.hash.slice(1);

  if (!hash) {
    return;
  }

  const target = document.getElementById(decodeURIComponent(hash));

  if (!target) {
    return;
  }

  const scroll = () => {
    target.scrollIntoView({ block: "start" });
  };

  window.requestAnimationFrame(() => {
    scroll();
    window.requestAnimationFrame(scroll);
  });
}

window.addEventListener("hashchange", scrollToHashTarget);
window.addEventListener(
  "load",
  () => {
    scrollToHashTarget();
    window.setTimeout(scrollToHashTarget, 100);
  },
  { once: true },
);
window.addEventListener("pageshow", scrollToHashTarget);

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.append(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const originalLabel = button.textContent;

    try {
      await copyText(button.dataset.copy);
      button.textContent = "Copied";
    } catch {
      button.textContent = "Copy failed";
    }

    window.setTimeout(() => {
      button.textContent = originalLabel;
    }, 1800);
  });
});
