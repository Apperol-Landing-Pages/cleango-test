const DETECTED_ISSUES = [
  "App Crashed",
  "Slow Charging",
  "Battery Overheating",
  "Corrupted Photos",
  "Memory Critical",
  "No Internet Access",
  "SIM Card Not Found",
  "Contacts Disappeared",
  "Display Glitch",
  "High CPU Usage",
  "Update Required",
  "Data Loss Warning",
  "Audio Problem",
  "Lock Screen Not Responding",
];

const DEVICE_LAYOUTS = [
  "device-desktop",
  "device-iphone-12-pro",
  "device-iphone-16",
  "device-iphone-17-pro-max",
  "device-iphone-se",
];

const DEVICE_QUERY_MAP = {
  desktop: "device-desktop",
  "iphone-12-pro": "device-iphone-12-pro",
  iphone12pro: "device-iphone-12-pro",
  "iphone-16": "device-iphone-16",
  iphone16: "device-iphone-16",
  "iphone-17-pro-max": "device-iphone-17-pro-max",
  iphone17promax: "device-iphone-17-pro-max",
  "iphone-se": "device-iphone-se",
  iphonese: "device-iphone-se",
  se: "device-iphone-se",
};

let layoutResizeTimer = null;
let debugOverlay = null;
let debugResizeTimer = null;

const stepOne = document.querySelector(".step-one");
const stepTwo = document.querySelector(".step-two");
const stepThree = document.querySelector(".step-three");
const startScanButton = document.getElementById("start-scan-button");
const tableBody = document.querySelector(".threats-table tbody");
const progressBar = document.getElementById("progress-bar");
const detectedIssuesCount = document.getElementById("detected-issues-count");
const stepTwoSecurityIcon = document.getElementById("step-two-security-icon");
const stepTwoFaceId = document.getElementById("step-two-face-id");
const stepTwoStatuses = {
  identity: document.querySelector('[data-check="identity"] .step-two__status'),
  settings: document.querySelector('[data-check="settings"] .step-two__status'),
  applecare: document.querySelector(
    '[data-check="applecare"] .step-two__status',
  ),
};
const removeVirusesBtn = document.getElementById("remove-viruses-btn");
const stepThreeOverlay = document.querySelector(".step-three__overlay");
const riskSheet = document.getElementById("step-three-risk-sheet");
const notificationSettings = document.querySelector(
  ".step-three__notification--settings",
);
const notificationTime = document.getElementById("step-three-notification-time");
const notificationUnsuccessful = document.querySelector(
  ".step-three__notification--unsuccessful",
);

let vibrationInterval = null;
let faceIdAnimation = null;
let faceIdAnimationTimer = null;
let faceIdAnimationFallbackTimer = null;
let faceIdAnimationDestroyTimer = null;
let stepThreeNotificationTimer = null;
let riskSheetNotificationTimer = null;
let stepThreeEntryNotificationBlockedUntil = 0;

const STEP_THREE_ENTRY_NOTIFICATION_DELAY = 1000;
const STEP_THREE_NOTIFICATION_TOTAL_TIME = 3050;
const BRIDGE_HANDLER_NAME = "appBridge";
const HAPTIC_TRIGGER = "haptic";
const HAPTIC_START_ACTION = "start";
const HAPTIC_STOP_ACTION = "stop";
const HAPTIC_PULSE_DURATION = 45;
const BUILD_VERSION = "css29-js26";

applyDeviceLayout();
initDebugOverlay();
window.addEventListener("resize", scheduleDeviceLayoutUpdate);
window.addEventListener("resize", scheduleDebugOverlayUpdate);
window.addEventListener("orientationchange", scheduleDeviceLayoutUpdate);
window.addEventListener("orientationchange", scheduleDebugOverlayUpdate);
window.visualViewport?.addEventListener("resize", scheduleDebugOverlayUpdate);
window.visualViewport?.addEventListener("scroll", scheduleDebugOverlayUpdate);

function isDebugEnabled() {
  const params = new URLSearchParams(window.location.search);
  const debug = params.get("debug");

  return debug === "1" || debug === "true" || debug === "yes";
}

function getForcedLayoutClass() {
  const params = new URLSearchParams(window.location.search);
  const device = params.get("device") || params.get("layout");

  if (!device) {
    return null;
  }

  const normalizedDevice = device.toLowerCase().replace(/[_\s]+/g, "-");
  return DEVICE_QUERY_MAP[normalizedDevice] || null;
}

function detectDeviceLayoutClass() {
  const forcedLayoutClass = getForcedLayoutClass();

  if (forcedLayoutClass) {
    return forcedLayoutClass;
  }

  const width = Math.round(window.innerWidth);
  const height = Math.round(window.innerHeight);
  const shortSide = Math.min(width, height);
  const longSide = Math.max(width, height);
  const isTouchScreen = window.matchMedia("(pointer: coarse)").matches;

  if (!isTouchScreen && shortSide >= 700) {
    return "device-desktop";
  }

  if (shortSide <= 375 && longSide <= 700) {
    return "device-iphone-se";
  }

  if (shortSide >= 428 && longSide >= 900) {
    return "device-iphone-17-pro-max";
  }

  if (shortSide >= 390 && shortSide <= 391 && longSide >= 820 && longSide <= 860) {
    return "device-iphone-12-pro";
  }

  if (shortSide >= 392 && shortSide <= 414 && longSide >= 830 && longSide <= 900) {
    return "device-iphone-16";
  }

  return isTouchScreen ? "device-iphone-16" : "device-desktop";
}

function applyDeviceLayout() {
  const layoutClass = detectDeviceLayoutClass();

  document.body.classList.remove(...DEVICE_LAYOUTS);
  document.body.classList.add(layoutClass);
  document.body.dataset.layoutDevice = layoutClass.replace("device-", "");
  updateDebugOverlay();
}

function scheduleDeviceLayoutUpdate() {
  if (layoutResizeTimer) {
    clearTimeout(layoutResizeTimer);
  }

  layoutResizeTimer = setTimeout(() => {
    applyDeviceLayout();
    layoutResizeTimer = null;
  }, 120);
}

window.setLayoutDevice = function setLayoutDevice(device) {
  const normalizedDevice = String(device || "").toLowerCase().replace(/[_\s]+/g, "-");
  const layoutClass = DEVICE_QUERY_MAP[normalizedDevice];

  if (!layoutClass) {
    return false;
  }

  document.body.classList.remove(...DEVICE_LAYOUTS);
  document.body.classList.add(layoutClass);
  document.body.dataset.layoutDevice = layoutClass.replace("device-", "");
  updateDebugOverlay();
  return true;
};

function initDebugOverlay() {
  if (!isDebugEnabled()) {
    return;
  }

  debugOverlay = document.createElement("div");
  debugOverlay.className = "debug-viewport";
  debugOverlay.setAttribute("aria-hidden", "true");
  document.body.appendChild(debugOverlay);
  updateDebugOverlay();
}

function getCssEnvProbeValue(property, envName) {
  const probe = document.createElement("div");
  probe.style.cssText = `
    position: fixed;
    visibility: hidden;
    pointer-events: none;
    ${property}: env(${envName}, 0px);
  `;
  document.body.appendChild(probe);
  const value = window.getComputedStyle(probe).getPropertyValue(property);
  probe.remove();
  return value.trim() || "0px";
}

function updateDebugOverlay() {
  if (!debugOverlay) {
    return;
  }

  const visualViewport = window.visualViewport;
  const width = Math.round(window.innerWidth);
  const height = Math.round(window.innerHeight);
  const visualWidth = visualViewport ? Math.round(visualViewport.width) : "-";
  const visualHeight = visualViewport ? Math.round(visualViewport.height) : "-";
  const visualTop = visualViewport ? Math.round(visualViewport.offsetTop) : "-";
  const dpr = Math.round(window.devicePixelRatio * 100) / 100;
  const device = document.body.dataset.layoutDevice || "unknown";
  const safeTop = getCssEnvProbeValue("padding-top", "safe-area-inset-top");
  const safeBottom = getCssEnvProbeValue(
    "padding-bottom",
    "safe-area-inset-bottom",
  ).replace("0px", "");
  const bodyStyles = window.getComputedStyle(document.body);
  const cardScale = bodyStyles.getPropertyValue("--s1-card-scale").trim();
  const cardY = bodyStyles.getPropertyValue("--s1-card-y").trim();
  const alertsY = bodyStyles.getPropertyValue("--s1-alerts-y").trim();
  const notificationTop = notificationUnsuccessful
    ? window.getComputedStyle(notificationUnsuccessful).top
    : "-";
  const sheetHeight = riskSheet ? window.getComputedStyle(riskSheet).height : "-";
  const sheetMaxHeight = riskSheet
    ? window.getComputedStyle(riskSheet).maxHeight
    : "-";

  debugOverlay.innerHTML = `
    <strong>${device}</strong>
    <span>build: ${BUILD_VERSION}</span>
    <span>inner: ${width}x${height}</span>
    <span>visual: ${visualWidth}x${visualHeight}</span>
    <span>vv-top: ${visualTop} | dpr: ${dpr}</span>
    <span>safe: ${safeTop}${safeBottom ? ` / ${safeBottom}` : ""}</span>
    <span>s1: ${cardScale} ${cardY} ${alertsY}</span>
    <span>s3: n=${notificationTop} sh=${sheetHeight}/${sheetMaxHeight}</span>
  `;
}

function scheduleDebugOverlayUpdate() {
  if (!debugOverlay) {
    return;
  }

  if (debugResizeTimer) {
    clearTimeout(debugResizeTimer);
  }

  debugResizeTimer = setTimeout(() => {
    updateDebugOverlay();
    debugResizeTimer = null;
  }, 120);
}

startScanButton.addEventListener("click", function () {
  stepTwo.style.display = "flex";
  stepTwo.classList.add("slide-in-right");

  stepOne.classList.add("slide-out-left");

  setTimeout(() => {
    stepOne.style.display = "none";
    stepOne.classList.remove("slide-out-left");
    stepTwo.classList.remove("slide-in-right");

    startScanAnimation();
  }, 350);
});

function startScanAnimation() {
  const totalIssues = DETECTED_ISSUES.length;
  const totalDuration = 5000;
  const intervalDuration = totalDuration / totalIssues;
  const tableRows = tableBody.querySelectorAll(".threat-row");

  let currentCount = 0;

  resetScanState(tableRows);
  startChecklistAnimation();
  scheduleFaceIdAnimation();

  requestAnimationFrame(() => {
    if (progressBar) {
      progressBar.style.width = "100%";
      progressBar.parentElement?.setAttribute("aria-valuenow", "100");
    }
  });

  const interval = setInterval(() => {
    if (currentCount < totalIssues) {
      currentCount++;

      detectedIssuesCount.textContent = currentCount;

      const row = tableRows[currentCount - 1];
      if (row) {
        row.classList.add("is-visible");
        triggerHaptic();
      }

      if (currentCount === totalIssues) {
        setStatus("applecare", "error");
      }
    } else {
      clearInterval(interval);
    }
  }, intervalDuration);

 setTimeout(showStepThree, totalDuration + 1200);
}

function resetScanState(tableRows) {
  detectedIssuesCount.textContent = "0";

  if (progressBar) {
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    progressBar.parentElement?.setAttribute("aria-valuenow", "0");

    requestAnimationFrame(() => {
      progressBar.style.transition = "width 5s linear";
    });
  }

  tableRows.forEach((row) => {
    row.classList.remove("is-visible");
  });

  setStatus("identity", "loading");
  setStatus("settings", "loading");
  setStatus("applecare", "loading");

  if (stepTwoSecurityIcon) {
    stepTwoSecurityIcon.src = "./assets/_icon_apple.svg";
    stepTwoSecurityIcon.alt = "Apple Security";
  }
}

function startChecklistAnimation() {
  setTimeout(() => {
    setStatus("identity", "success");
  }, 1250);

  setTimeout(() => {
    setStatus("settings", "error");
  }, 2500);
}

function setStatus(name, state) {
  const status = stepTwoStatuses[name];
  if (!status) {
    return;
  }

  status.className = `step-two__status step-two__status--${state}`;
}

function scheduleFaceIdAnimation() {
  if (!stepTwoFaceId) {
    return;
  }

  hideFaceIdAnimation();

  faceIdAnimationTimer = setTimeout(() => {
    faceIdAnimationTimer = null;

    if (!window.lottie || typeof window.lottie.loadAnimation !== "function") {
      return;
    }

    destroyFaceIdAnimation();
    stepTwoFaceId.classList.add("is-visible");

    faceIdAnimation = window.lottie.loadAnimation({
      container: stepTwoFaceId,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "./assets/face-id-animation.json",
    });

    faceIdAnimation.addEventListener("complete", hideFaceIdAnimation);
    faceIdAnimationFallbackTimer = setTimeout(hideFaceIdAnimation, 4200);
  }, 1000);
}

function hideFaceIdAnimation() {
  if (faceIdAnimationTimer) {
    clearTimeout(faceIdAnimationTimer);
    faceIdAnimationTimer = null;
  }

  if (faceIdAnimationFallbackTimer) {
    clearTimeout(faceIdAnimationFallbackTimer);
    faceIdAnimationFallbackTimer = null;
  }

  if (faceIdAnimationDestroyTimer) {
    clearTimeout(faceIdAnimationDestroyTimer);
    faceIdAnimationDestroyTimer = null;
  }

  if (!stepTwoFaceId) {
    destroyFaceIdAnimation();
    return;
  }

  stepTwoFaceId.classList.remove("is-visible");

  faceIdAnimationDestroyTimer = setTimeout(() => {
    destroyFaceIdAnimation();
    faceIdAnimationDestroyTimer = null;
  }, 220);
}

function destroyFaceIdAnimation() {
  if (faceIdAnimation) {
    faceIdAnimation.destroy();
    faceIdAnimation = null;
  }

  if (stepTwoFaceId) {
    stepTwoFaceId.innerHTML = "";
  }
}

function showStepThree() {
  hideFaceIdAnimation();

  stepThree.style.display = "flex";
  stepThree.classList.add("slide-in-right");

  stepTwo.classList.add("slide-out-left");

  setTimeout(() => {
    stepTwo.style.display = "none";
    stepTwo.classList.remove("slide-out-left");
    stepThree.classList.remove("slide-in-right");

    startPeriodicVibration();
    scheduleStepThreeEntryNotification();
  }, 350);
}

function scheduleStepThreeEntryNotification() {
  if (stepThreeNotificationTimer) {
    clearTimeout(stepThreeNotificationTimer);
  }

  stepThreeEntryNotificationBlockedUntil =
    Date.now() +
    STEP_THREE_ENTRY_NOTIFICATION_DELAY +
    STEP_THREE_NOTIFICATION_TOTAL_TIME;

  stepThreeNotificationTimer = setTimeout(() => {
    showNotification();
    stepThreeNotificationTimer = null;
  }, STEP_THREE_ENTRY_NOTIFICATION_DELAY);
}

function postNativeMessage(payload) {
  try {
    const handler = window.webkit?.messageHandlers?.[BRIDGE_HANDLER_NAME];
    if (!handler || typeof handler.postMessage !== "function") {
      return false;
    }
    handler.postMessage(payload);
    return true;
  } catch (error) {
    return false;
  }
}

function postHapticAction(action) {
  return postNativeMessage({
    trigger: HAPTIC_TRIGGER,
    payload: {
      action: action,
    },
  });
}

function triggerHaptic() {
  postHapticAction(HAPTIC_STOP_ACTION);
  postHapticAction(HAPTIC_START_ACTION);

  setTimeout(() => {
    postHapticAction(HAPTIC_STOP_ACTION);
  }, HAPTIC_PULSE_DURATION);
}

// Start periodic vibration for step 3
function startPeriodicVibration() {
  if (vibrationInterval) {
    clearInterval(vibrationInterval);
  }

  triggerHaptic();

  // Then vibrate every 1 seconds
  vibrationInterval = setInterval(() => {
    triggerHaptic();
  }, 1000);
}

function stopPeriodicVibration() {
  if (vibrationInterval) {
    clearInterval(vibrationInterval);
    vibrationInterval = null;
  }

  postHapticAction(HAPTIC_STOP_ACTION);
}

function showNotification() {
  if (notificationSettings) {
    updateNotificationTime();
    notificationSettings.style.display = "flex";
    setTimeout(() => {
      notificationSettings.classList.add("step-three__notification--show");
    }, 50);

    setTimeout(() => {
      notificationSettings.classList.remove("step-three__notification--show");
      setTimeout(() => {
        notificationSettings.style.display = "none";
      }, 500);
    }, 2500);
  }
}

function updateNotificationTime() {
  if (!notificationTime) {
    return;
  }

  notificationTime.textContent = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

function showUnsuccessfulNotification() {
  if (notificationUnsuccessful) {
    notificationUnsuccessful.style.display = "flex";

    setTimeout(() => {
      notificationUnsuccessful.classList.add("step-three__notification--show");
    }, 50);

    setTimeout(() => {
      notificationUnsuccessful.classList.remove(
        "step-three__notification--show",
      );

      setTimeout(() => {
        notificationUnsuccessful.style.display = "none";
      }, 500);
    }, 2500);
  }
}

function getUnsuccessfulNotificationDelay() {
  const entryNotificationWait = Math.max(
    0,
    stepThreeEntryNotificationBlockedUntil - Date.now(),
  );

  return Math.max(1500, entryNotificationWait + 100);
}

function showRiskSheet() {
  if (!stepThreeOverlay || !riskSheet) {
    return;
  }

  if (riskSheetNotificationTimer) {
    clearTimeout(riskSheetNotificationTimer);
  }

  if (notificationUnsuccessful) {
    notificationUnsuccessful.style.display = "none";
    notificationUnsuccessful.classList.remove("step-three__notification--show");
  }

  riskSheet.setAttribute("aria-hidden", "false");
  stepThreeOverlay.style.display = "block";

  requestAnimationFrame(() => {
    stepThreeOverlay.classList.add("step-three__overlay--visible");
    stepThreeOverlay.style.opacity = "1";
    riskSheet.classList.add("step-three__risk-sheet--show");
  });

  riskSheetNotificationTimer = setTimeout(() => {
    showUnsuccessfulNotification();
  }, getUnsuccessfulNotificationDelay());
}

if (removeVirusesBtn) {
  removeVirusesBtn.addEventListener("click", function () {
    showRiskSheet();
  });
}

// Make stopPeriodicVibration available globally for iOS to call
window.stopPeriodicVibration = stopPeriodicVibration;
