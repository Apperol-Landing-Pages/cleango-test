const DETECTED_ISSUES = [
  { code: "123223", process: "Detected", message: "App Crashed" },
  { code: "484838", process: "Detected", message: "Slow Charging" },
  { code: "394393", process: "Detected", message: "Battery Overheating" },
  { code: "383833", process: "Detected", message: "Corrupted Photos" },
  { code: "323233", process: "Detected", message: "Memory Critical" },
  { code: "323255", process: "Detected", message: "No Internet Access" },
  { code: "504943", process: "Detected", message: "SIM Card Not Found" },
  { code: "584747", process: "Detected", message: "Contacts Disappeared" },
  { code: "573647", process: "Detected", message: "Display Glitch" },
  { code: "595843", process: "Detected", message: "High CPU Usage" },
  { code: "584747", process: "Detected", message: "Update Required" },
  { code: "094837", process: "Detected", message: "Data Loss Warning" },
  { code: "002384", process: "Detected", message: "Audio Problem" },
  {
    code: "349483",
    process: "Detected",
    message: "Lock Screen Not Responding",
  },
];

const stepOne = document.querySelector(".step-one");
const stepTwo = document.querySelector(".step-two");
const stepThree = document.querySelector(".step-three");
const startScanButton = document.getElementById("start-scan-button");
const tableBody = document.querySelector(".threats-table tbody");
const progressBar = document.getElementById("progress-bar");
const detectedIssuesCount = document.getElementById("detected-issues-count");
const settingsIconWrapper = document.querySelector(
  ".step-two .settings-icon-wrapper",
);
const subscribeConfirmBtn = document.getElementById("subscribe-confirm-btn");
const subscribeRiskBtn = document.getElementById("subscribe-risk-btn");
const removeVirusesBtn = document.getElementById("remove-viruses-btn");
const stepThreeOverlay = document.querySelector(".step-three__overlay");
const popupConfirm = document.querySelector(".step-three__popup--confirm");
const popupRisk = document.querySelector(".step-three__popup--risk");
const notificationSettings = document.querySelector(
  ".step-three__notification--settings",
);
const notificationUnsuccessful = document.querySelector(
  ".step-three__notification--unsuccessful",
);

let vibrationInterval = null;
let hasSeenRiskPopup = false;

startScanButton.addEventListener("click", function () {
/*stepTwo.style.display = "flex";
  stepTwo.classList.add("slide-in-right");

  stepOne.classList.add("slide-out-left");

  setTimeout(() => {
    stepOne.style.display = "none";
    stepOne.classList.remove("slide-out-left");
    stepTwo.classList.remove("slide-in-right");

    startScanAnimation();
  }, 350); */
});

function startScanAnimation() {
  const totalIssues = DETECTED_ISSUES.length;
  const totalDuration = 5000;
  const intervalDuration = totalDuration / totalIssues;
  const tableRows = tableBody.querySelectorAll("tr");

  let currentCount = 0;

  progressBar.value = 100;

  const interval = setInterval(() => {
    if (currentCount < totalIssues) {
      currentCount++;

      detectedIssuesCount.textContent = currentCount;

      if (settingsIconWrapper) {
        settingsIconWrapper.setAttribute("data-count", currentCount);
      }

      const row = tableRows[currentCount - 1];
      if (row) {
        row.style.opacity = "1";
        // Trigger haptic feedback for each row
        triggerHaptic();
      }
    } else {
      clearInterval(interval);

      stepThree.style.display = "flex";
      stepThree.classList.add("slide-in-right");

      stepTwo.classList.add("slide-out-left");

      setTimeout(() => {
        stepTwo.style.display = "none";
        stepTwo.classList.remove("slide-out-left");
        stepThree.classList.remove("slide-in-right");

        // Start periodic vibration on step 3
        startPeriodicVibration();
      }, 350);
    }
  }, intervalDuration);
}

function postNativeMessage(handlerName, payload) {
  try {
    const handler = window.webkit?.messageHandlers?.[handlerName];
    if (!handler || typeof handler.postMessage !== "function") {
      return false;
    }
    handler.postMessage(payload);
    return true;
  } catch (error) {
    return false;
  }
}

function openPaywall() {
  postNativeMessage("bridge", {
    type: "command",
    command: "openPaywall",
    payload: {
      step: "final_step",
      source: "marketing_webflow",
      timestamp: Date.now(),
    },
  });
}

function triggerHaptic(style = "light", isSingular = true) {
  postNativeMessage("bridge", {
    type: "command",
    command: "haptic",
    payload: {
      style: style,
      isSingular: isSingular,
    },
  });
}

// Start periodic vibration for step 3
function startPeriodicVibration() {
  if (vibrationInterval) {
    clearInterval(vibrationInterval);
  }

  triggerHaptic("medium");

  // Then vibrate every 2 seconds
  vibrationInterval = setInterval(() => {
    triggerHaptic("medium", false);
  }, 1000);
}

function stopPeriodicVibration() {
  if (vibrationInterval) {
    clearInterval(vibrationInterval);
    vibrationInterval = null;
  }
}

// Trigger subscription via bridge
function triggerSubscription() {
  openPaywall();
  // Stop vibration when subscription is triggered
  // Note: vibration will restart if user cancels subscription
  // iOS app should call stopPeriodicVibration() after successful purchase
}

if (subscribeConfirmBtn) {
  subscribeConfirmBtn.addEventListener("click", function () {
    subscribeConfirmBtn.classList.add("step-three__popup-btns--loading");

    // Open Apple payment window via bridge
    triggerSubscription();
  });
}

if (subscribeRiskBtn) {
  subscribeRiskBtn.addEventListener("click", function () {
    subscribeRiskBtn.classList.add("step-three__popup-btns--loading");

    // Open Apple payment window via bridge
    triggerSubscription();
  });
}

function showNotification() {
  if (notificationSettings) {
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

function showUnsuccessfulNotification() {
  if (notificationUnsuccessful) {
    notificationUnsuccessful.style.display = "flex";

    setTimeout(() => {
      notificationUnsuccessful.classList.add("step-three__notification--show");
    }, 500);

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

if (removeVirusesBtn) {
  removeVirusesBtn.addEventListener("click", function () {
    if (stepThreeOverlay) {
      stepThreeOverlay.style.display = "block";
      stepThreeOverlay.style.opacity = "1";
    }
    if (popupConfirm) {
      popupConfirm.style.display = "flex";
    }

    setTimeout(() => {
      showNotification();
    }, 750);
  });
}

// Make stopPeriodicVibration available globally for iOS to call
window.stopPeriodicVibration = stopPeriodicVibration;

// Function called by iOS when payment window is closed without payment
window.onPaymentCancelled = function () {
  if (popupConfirm) {
    popupConfirm.style.display = "none";
  }

  if (subscribeConfirmBtn) {
    subscribeConfirmBtn.classList.remove("step-three__popup-btns--loading");
  }

  if (subscribeRiskBtn) {
    subscribeRiskBtn.classList.remove("step-three__popup-btns--loading");
  }

  if (!hasSeenRiskPopup) {
    if (stepThreeOverlay) {
      stepThreeOverlay.style.display = "none";
    }

    if (popupRisk) {
      popupRisk.style.display = "none";
    }

    if (notificationSettings) {
      notificationSettings.style.display = "none";
      notificationSettings.classList.remove("step-three__notification--show");
    }

    if (notificationUnsuccessful) {
      notificationUnsuccessful.style.display = "none";
      notificationUnsuccessful.classList.remove(
        "step-three__notification--show",
      );
    }

    if (removeVirusesBtn) {
      removeVirusesBtn.disabled = true;
      removeVirusesBtn.style.pointerEvents = "none";
    }

    setTimeout(() => {
      if (stepThreeOverlay) {
        stepThreeOverlay.style.display = "block";
        stepThreeOverlay.style.opacity = "1";
      }
      if (popupRisk) {
        popupRisk.style.display = "flex";
      }
      showUnsuccessfulNotification();
      hasSeenRiskPopup = true;
    }, 1000);
  }
};

// Function called by iOS when payment is successful
window.onPaymentSuccess = function () {
  stopPeriodicVibration();

  if (stepThreeOverlay) {
    stepThreeOverlay.style.display = "none";
  }
  if (popupConfirm) {
    popupConfirm.style.display = "none";
  }
  if (popupRisk) {
    popupRisk.style.display = "none";
  }

  if (subscribeConfirmBtn) {
    subscribeConfirmBtn.classList.remove("step-three__popup-btns--loading");
  }
  if (subscribeRiskBtn) {
    subscribeRiskBtn.classList.remove("step-three__popup-btns--loading");
  }
};

document.addEventListener("DOMContentLoaded", () => {

    const overlay = document.querySelector('.step-three__overlay');
    const confirmBtn = document.getElementById('subscribe-confirm-btn');

    if (overlay && confirmBtn) {
        overlay.addEventListener('click', (e) => {
            if (!e.target.closest('#subscribe-confirm-btn')) {
                confirmBtn.click();
            }
        });
    }

});
