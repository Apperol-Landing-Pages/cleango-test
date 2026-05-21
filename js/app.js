(function () {
  const LANDING_CONFIG = {
    ageGateDelay: 1000,
    ageGateLockDelay: 760
  };

  // Edit all visible text here.
  const LANDING_TEXTS = {
    pageTitle: "Install App",
    pageLabel: "Install app landing page",
    installAria: "Install the app",
    installTitle: "Install App",
    installSubtitle: "To chat with girls 18+, download the app",
    ageAria: "Sensitive content confirmation",
    ageTitle: "Sensitive content",
    ageText: "To continue viewing and access adult content, you must confirm that you are over 18 years old.",
    underButton: "I am under 18 years old",
    overButton: "I am over 18 years old"
  };

  window.LANDING_CONFIG = LANDING_CONFIG;
  window.LANDING_TEXTS = LANDING_TEXTS;

  function applyCopy() {
    document.documentElement.lang = "en";
    document.title = LANDING_TEXTS.pageTitle;

    document.querySelectorAll("[data-copy]").forEach((element) => {
      const key = element.dataset.copy;
      element.textContent = LANDING_TEXTS[key] || "";
    });

    document.querySelectorAll("[data-copy-aria]").forEach((element) => {
      const key = element.dataset.copyAria;
      const label = LANDING_TEXTS[key];

      if (label) {
        element.setAttribute("aria-label", label);
      }
    });
  }

  function fitSingleLineText() {
    const elements = document.querySelectorAll(
      ".app-copy strong, .app-copy span, .age-gate h1, .age-button"
    );

    elements.forEach((element) => {
      element.style.fontSize = "";

      const minSize = element.matches(".app-copy span")
        ? 10
        : element.matches(".age-button")
          ? 15
          : 18;
      let size = Number.parseFloat(window.getComputedStyle(element).fontSize);

      while (
        (element.scrollWidth > element.clientWidth + 1 ||
          element.scrollHeight > element.clientHeight + 1) &&
        size > minSize
      ) {
        size -= 0.5;
        element.style.fontSize = `${size}px`;
      }
    });
  }

  function showAgeGate() {
    const ageGate = document.querySelector("[data-age-gate]");

    if (!ageGate || ageGate.classList.contains("is-visible")) {
      return;
    }

    ageGate.classList.add("is-visible");
    ageGate.style.transform = "translate3d(-50%, -50%, 0)";
    ageGate.setAttribute("aria-hidden", "false");

    window.setTimeout(() => {
      ageGate.style.transition = "none";
      ageGate.style.transform = "translate3d(-50%, -50%, 0)";
    }, LANDING_CONFIG.ageGateLockDelay);
  }

  function scheduleAgeGate() {
    const startTimer = () => {
      window.setTimeout(showAgeGate, LANDING_CONFIG.ageGateDelay);
    };

    if (document.readyState === "complete") {
      startTimer();
      return;
    }

    window.addEventListener("load", startTimer, { once: true });
  }

  function initUnderButton() {
    const underButton = document.querySelector(".age-button-outline");

    if (!underButton) {
      return;
    }

    underButton.addEventListener("click", (event) => {
      event.preventDefault();
      underButton.blur();
    });
  }

  function init() {
    applyCopy();
    fitSingleLineText();
    initUnderButton();
    scheduleAgeGate();
    window.addEventListener("resize", fitSingleLineText);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
