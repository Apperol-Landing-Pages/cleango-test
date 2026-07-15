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
