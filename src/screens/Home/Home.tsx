"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";

import { useDeviceLayout } from "./hooks/useDeviceLayout";
import { postNativeMessage, useHaptics } from "./hooks/useHaptics";
import { getPaywallOffers, createTopupIntent, topupWallet } from "@/api/wallet";
import { useApplePayRequest } from "@/utils/useApplePayRequest";
import s from "./Home.module.scss";

type Step = 1 | 2 | 3;

type Threat = {
  code: string;
  process: "Simulated" | "Not shown";
  message: string;
};

const SCAN_DURATION_MS = 5000;
const MAX_ISSUES = 14;
const HOME_PRODUCT_PRICE_CENTS = 499;
const HOME_PRODUCT_LABEL = "One-time protection purchase";
const LOTTIE_SCRIPT_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";

type LottieAnimation = {
  addEventListener: (event: "complete", callback: () => void) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    lottie?: {
      loadAnimation: (options: {
        container: HTMLElement;
        renderer: "svg";
        loop: boolean;
        autoplay: boolean;
        path: string;
      }) => LottieAnimation;
    };
  }
}

let lottieScriptPromise: Promise<void> | null = null;

function loadLottieScript(): Promise<void> {
  if (window.lottie) return Promise.resolve();
  if (lottieScriptPromise) return lottieScriptPromise;

  lottieScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${LOTTIE_SCRIPT_URL}"]`,
    );

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = LOTTIE_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });

  return lottieScriptPromise;
}

const threats: Threat[] = [
  { code: "123223", process: "Not shown", message: "Example app issue" },
  { code: "484838", process: "Not shown", message: "Example charging issue" },
  { code: "394393", process: "Simulated", message: "Example battery risk" },
  { code: "383833", process: "Simulated", message: "Example media risk" },
  { code: "323233", process: "Simulated", message: "Example storage risk" },
  { code: "323255", process: "Simulated", message: "Example network risk" },
  { code: "504943", process: "Simulated", message: "Example SIM risk" },
  { code: "584747", process: "Simulated", message: "Example contacts risk" },
  { code: "573647", process: "Simulated", message: "Example display risk" },
  { code: "595843", process: "Simulated", message: "Example performance risk" },
  { code: "584747", process: "Simulated", message: "Example update reminder" },
  { code: "094837", process: "Simulated", message: "Example backup risk" },
  { code: "002384", process: "Simulated", message: "Example audio risk" },
  { code: "349483", process: "Simulated", message: "Example screen risk" },
];

const apps = [
  {
    icon: "wallet_icon.svg",
    name: "Wallet",
    note: "Example payment-card risk",
  },
  {
    icon: "media_icon.svg",
    name: "Media",
    note: "Simulated warning",
  },
  {
    icon: "safari_icon.svg",
    name: "Safari",
    note: "Simulated warning",
  },
  {
    icon: "passwords_icon.svg",
    name: "Passwords",
    note: "Simulated warning",
  },
];

const Home = () => {
  const [step, setStep] = useState<Step>(1);
  const [progress, setProgress] = useState(0);
  const [isRiskOverlayVisible, setIsRiskOverlayVisible] = useState(false);
  const [isRiskSheetVisible, setIsRiskSheetVisible] = useState(false);
  const [isPaymentRunning, setIsPaymentRunning] = useState(false);
  const [isEntryNotificationVisible, setIsEntryNotificationVisible] =
    useState(false);
  const [isFailureNotificationVisible, setIsFailureNotificationVisible] =
    useState(false);
  const [failureSequence, setFailureSequence] = useState(0);
  const [notificationTime, setNotificationTime] = useState("9:41 AM");
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [isFaceIdVisible, setIsFaceIdVisible] = useState(false);
  const faceIdContainerRef = useRef<HTMLDivElement>(null);
  const visibleThreatCountRef = useRef(0);

  useDeviceLayout();
  const { triggerHaptic, startPeriodicVibration, stopPeriodicVibration } =
    useHaptics();
  const applePay = useApplePayRequest({
    stripe,
    label: HOME_PRODUCT_LABEL,
    amountCents: HOME_PRODUCT_PRICE_CENTS,
  });

  useEffect(() => {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) return;

    let active = true;
    loadStripe(publishableKey).then((instance) => {
      if (active) setStripe(instance);
    });

    return () => {
      active = false;
    };
  }, []);

  const detectedIssues = Math.min(
    MAX_ISSUES,
    Math.floor((progress / 100) * MAX_ISSUES),
  );

  const visibleThreats = useMemo(() => {
    if (step !== 2) return threats.length;

    const count = Math.ceil((progress / 100) * threats.length);

    return count;
  }, [progress, step]);

  const startScan = () => {
    setIsRiskOverlayVisible(false);
    setIsRiskSheetVisible(false);
    setIsFailureNotificationVisible(false);
    visibleThreatCountRef.current = 0;
    setProgress(0);
    setStep(2);
  };

  useEffect(() => {
    if (step !== 2) return;

    const startedAt = Date.now();

    const intervalId = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextProgress = Math.min(
        100,
        Math.round((elapsed / SCAN_DURATION_MS) * 100),
      );

      setProgress(nextProgress);

      if (nextProgress >= 100) {
        window.clearInterval(intervalId);

        window.setTimeout(() => {
          setNotificationTime(
            new Intl.DateTimeFormat("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }).format(new Date()),
          );
          setStep(3);
        }, 450);
      }
    }, 80);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [step, triggerHaptic]);

  useEffect(() => {
    if (step !== 2) {
      visibleThreatCountRef.current = 0;
      return;
    }

    if (visibleThreats > visibleThreatCountRef.current) {
      visibleThreatCountRef.current = visibleThreats;
      triggerHaptic();
    }
  }, [step, triggerHaptic, visibleThreats]);

  useEffect(() => {
    if (step !== 2) return;

    let animation: LottieAnimation | null = null;
    let cancelled = false;
    let fallbackTimer: number | undefined;

    const startTimer = window.setTimeout(async () => {
      try {
        await loadLottieScript();
        if (cancelled || !window.lottie || !faceIdContainerRef.current) return;

        setIsFaceIdVisible(true);
        animation = window.lottie.loadAnimation({
          container: faceIdContainerRef.current,
          renderer: "svg",
          loop: false,
          autoplay: true,
          path: "/security-assets/face-id-animation.json",
        });

        const hide = () => setIsFaceIdVisible(false);
        animation.addEventListener("complete", hide);
        fallbackTimer = window.setTimeout(hide, 4200);
      } catch {
        setIsFaceIdVisible(false);
      }
    }, 1000);

    return () => {
      cancelled = true;
      window.clearTimeout(startTimer);
      window.clearTimeout(fallbackTimer);
      animation?.destroy();
    };
  }, [step]);

  useEffect(() => {
    if (step === 3) {
      startPeriodicVibration();
      return stopPeriodicVibration;
    }

    stopPeriodicVibration();
  }, [startPeriodicVibration, step, stopPeriodicVibration]);

  useEffect(() => {
    if (step !== 3) return;

    const showTimer = window.setTimeout(() => {
      setIsEntryNotificationVisible(true);
    }, 1000);
    const hideTimer = window.setTimeout(() => {
      setIsEntryNotificationVisible(false);
    }, 3500);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [step]);

  useEffect(() => {
    if (failureSequence === 0) return;

    const notificationTimer = window.setTimeout(() => {
      setIsFailureNotificationVisible(true);
    }, 80);
    const sheetTimer = window.setTimeout(() => {
      setIsRiskSheetVisible(true);
    }, 650);
    const hideTimer = window.setTimeout(() => {
      setIsFailureNotificationVisible(false);
    }, 3200);

    return () => {
      window.clearTimeout(notificationTimer);
      window.clearTimeout(sheetTimer);
      window.clearTimeout(hideTimer);
    };
  }, [failureSequence]);

  const runPayment = useCallback(
    async () => {
      if (isPaymentRunning) return;

      setIsPaymentRunning(true);
      let paymentIntentId: string | null = null;
      let packageSlug = "";

      const result = await applePay.present(async () => {
        const offers = await getPaywallOffers();
        const configuredSlug = process.env.NEXT_PUBLIC_HOME_PACKAGE_SLUG;
        const offer = configuredSlug
          ? offers.find((item) => item.slug === configuredSlug)
          : offers.find(
              (item) =>
                Math.round(Number(item.price_usd) * 100) ===
                HOME_PRODUCT_PRICE_CENTS,
            );

        if (!offer) {
          throw new Error("The $4.99 product is not configured on backend.");
        }

        if (
          Math.round(Number(offer.price_usd) * 100) !==
          HOME_PRODUCT_PRICE_CENTS
        ) {
          throw new Error("The configured product price is not $4.99.");
        }

        packageSlug = offer.slug;
        const intent = await createTopupIntent({ package_slug: packageSlug });
        paymentIntentId = intent.payment_intent_id;
        return { clientSecret: intent.client_secret };
      });

      if (result.status === "succeeded") {
        const completedPaymentIntentId =
          result.paymentIntentId || paymentIntentId;

        if (completedPaymentIntentId && packageSlug) {
          await topupWallet(completedPaymentIntentId, packageSlug).catch(
            () => null,
          );
        }

        postNativeMessage({ trigger: "finish" });
      }

      if (result.status !== "succeeded") {
        setIsFailureNotificationVisible(false);
        setIsRiskSheetVisible(false);
        setIsRiskOverlayVisible(true);
        setFailureSequence((sequence) => sequence + 1);
      }

      setIsPaymentRunning(false);
    },
    [applePay, isPaymentRunning],
  );

  const getStatusClass = (threshold: number, hasError = false) => {
    if (progress < threshold) {
      return `${s["step-two__status"]} ${s["step-two__status--loading"]}`;
    }

    return `${s["step-two__status"]} ${
      hasError
        ? s["step-two__status--error"]
        : s["step-two__status--success"]
    }`;
  };

  return (
    <main className={s.wrapper}>
      {step === 1 && (
        <div className={`${s.container} ${s["step-one"]}`}>
          <div className={s["step-one__content"]}>
            <section
              className={`${s.section} ${s["step-one__security"]}`}
            >
              <img
                src="/security-assets/home_screen_iphone.svg"
                alt="iPhone home screen"
                className={s["step-one__phone"]}
                draggable={false}
              />

              <h1
                className={`${s.title} ${s["step-one__security-title"]}`}
              >
                Security Demo
              </h1>

              <p className={s["step-one__device"]}>
                Your Device: <strong>iPhone 17 Pro</strong>
              </p>

              <div className={s["step-one__risk"]}>
                Demonstration mode
              </div>

              <p className={s["step-one__description"]}>
                This animation does not inspect your device.
                <br />
                Start to preview a simulated security scan.
              </p>
            </section>

            <div className={s["step-one__alerts"]}>
              <section className={s["step-one__alert"]}>
                <img
                  src="/security-assets/_icon_settings.svg"
                  alt="Settings"
                  className={s["step-one__alert-icon"]}
                  draggable={false}
                />

                <div className={s["step-one__alert-copy"]}>
                  <h2>Example settings check</h2>
                  <p>14 simulated issues</p>
                </div>

                <span className={s["step-one__alert-count"]}>14</span>
              </section>

              <section className={s["step-one__alert"]}>
                <img
                  src="/security-assets/_icon_apple.svg"
                  alt="Security demo"
                  className={s["step-one__alert-icon"]}
                  draggable={false}
                />

                <div className={s["step-one__alert-copy"]}>
                  <h2>Example protection check</h2>
                  <p>16 simulated issues</p>
                </div>

                <span className={s["step-one__alert-count"]}>16</span>
              </section>
            </div>
          </div>

          <footer className={s["step-one__footer"]}>
            <p className={s["text-uppercase"]}>
              INTERACTIVE DEMONSTRATION
            </p>

            <button
              type="button"
              className={`${s["scan-button"]} ${s["step-one__scan-button"]}`}
              onClick={startScan}
            >
              Start Scan
            </button>
          </footer>
        </div>
      )}

      {step === 2 && (
        <div className={`${s.container} ${s["step-two"]}`}>
          <div
            ref={faceIdContainerRef}
            className={`${s["step-two__face-id"]} ${
              isFaceIdVisible ? s["is-visible"] : ""
            }`}
            aria-hidden="true"
          />

          <div className={s["step-two__content"]}>
            <div className={s["step-two__top-content"]}>
              <h2 className={s["step-two__page-title"]}>
                Security Scan Demo
              </h2>

              <section className={s["step-two__security"]}>
                <img
                  src="/security-assets/_icon_apple.svg"
                  alt="Security demo"
                  className={s["step-two__security-icon"]}
                  draggable={false}
                />

                <h1 className={s["step-two__title"]}>
                  Simulated Scan
                </h1>

                <div
                  className={s["step-two__progress"]}
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                >
                  <div
                    className={s["step-two__progress-fill"]}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <ul className={s["step-two__checks"]}>
                  <li className={s["step-two__check"]}>
                    <span>Identity Identification:</span>
                    <span
                      className={getStatusClass(30)}
                      aria-hidden="true"
                    />
                  </li>

                  <li className={s["step-two__check"]}>
                    <span>Settings Security Check:</span>
                    <span
                      className={getStatusClass(65)}
                      aria-hidden="true"
                    />
                  </li>

                  <li className={s["step-two__check"]}>
                    <span>Example protection check:</span>
                    <span
                      className={getStatusClass(92, true)}
                      aria-hidden="true"
                    />
                  </li>
                </ul>
              </section>
            </div>

            <div className={s["step-two__detected-btn"]}>
              Simulated issues:&nbsp;
              <span>{detectedIssues}</span>
            </div>

            <section className={s["threats-terminal"]}>
              <h3>Demonstration results:</h3>

              <table className={s["threats-table"]}>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Process</th>
                    <th>Message</th>
                  </tr>
                </thead>

                <tbody>
                  {threats.map((threat, index) => (
                    <tr
                      key={`${threat.code}-${index}`}
                      className={`${s["threat-row"]} ${
                        index < visibleThreats ? s["is-visible"] : ""
                      }`}
                    >
                      <td>{threat.code}</td>
                      <td
                        className={
                          threat.process === "Simulated"
                            ? s.detected
                            : s["not-detected"]
                        }
                      >
                        {threat.process}
                      </td>
                      <td>{threat.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className={`${s.container} ${s["step-three"]}`}>
          <div
            className={`${s["step-three__notification"]} ${s["step-three__notification--settings"]} ${
              isEntryNotificationVisible
                ? s["step-three__notification--show"]
                : ""
            }`}
            aria-hidden="true"
          >
            <img
              src="/security-assets/_icon_settings.svg"
              alt="Settings"
              className={s["step-three__notification-icon"]}
              draggable={false}
            />

            <div className={s["step-three__notification-content"]}>
              <div className={s["step-three__notification-header"]}>
                <p>Settings</p>
                <span>{notificationTime}</span>
              </div>

              <p className={s["step-three__notification-note"]}>
                Demonstration completed
              </p>
            </div>
          </div>

          <div className={s["step-three__content"]}>
            <h2 className={s["step-three__page-title"]}>
              Security Scan Demo
            </h2>

            <section className={s["step-three__security"]}>
              <img
                src="/security-assets/_icon_apple.svg"
                alt="Security demo"
                className={s["step-three__security-icon"]}
                draggable={false}
              />

              <h1 className={s["step-three__title"]}>Protection Demo</h1>

              <p className={s["step-three__risk-text"]}>
                Simulated results
              </p>

              <p className={s["step-three__description"]}>
                No real device scan was performed.
              </p>

              <div className={s["step-three__device-card"]}>
                <div className={s["step-three__device-row"]}>
                  <div className={s["step-three__device-name"]}>
                    <img
                      src="/security-assets/warning_icon.svg"
                      alt="Warning"
                      className={s["step-three__device-warning"]}
                      draggable={false}
                    />
                    <span>iPhone</span>
                  </div>

                  <span className={s["step-three__device-count"]}>
                    26 simulated issues
                  </span>
                </div>

                <img
                  src="/security-assets/device_risk_bar.svg"
                  alt=""
                  className={s["step-three__risk-bar"]}
                  draggable={false}
                />
              </div>
            </section>

            <section className={s["step-three__threats"]}>
              <h2 className={s["step-three__threats-title"]}>
                Example risk categories:
              </h2>

              <ul className={s["step-three__apps"]}>
                {apps.map((app) => (
                  <li
                    key={app.name}
                    className={s["step-three__apps-item"]}
                  >
                    <img
                      src={`/security-assets/${app.icon}`}
                      alt={app.name}
                      className={s["step-three__app-icon"]}
                      draggable={false}
                    />

                    <div className={s["step-three__app-copy"]}>
                      <span className={s["step-three__app-name"]}>
                        {app.name}
                      </span>

                      <span className={s["step-three__app-note"]}>
                        {app.note}
                      </span>
                    </div>

                    <span className={s["step-three__app-alert"]}>!</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <footer className={s["step-three__footer"]}>
            <div className={s["step-three__footer-warning"]}>
              <img
                src="/security-assets/warning_icon2.svg"
                alt="Warning"
                className={s["step-three__footer-warning-icon"]}
                draggable={false}
              />

              <p>Optional one-time protection purchase — $4.99</p>
            </div>

            <button
              type="button"
              className={`${s["scan-button"]} ${s["step-three__remove-button"]}`}
              onClick={() => void runPayment()}
              disabled={isPaymentRunning}
            >
              {isPaymentRunning ? "Processing..." : "Buy protection — $4.99"}
            </button>
          </footer>

          {isRiskOverlayVisible && (
            <div
              className={`${s["step-three__overlay"]} ${s["step-three__overlay--visible"]}`}
            >
              <div
                className={`${s["step-three__notification"]} ${s["step-three__notification--unsuccessful"]} ${
                  isFailureNotificationVisible
                    ? s["step-three__notification--show"]
                    : ""
                }`}
              >
                <span className={s["step-three__notification-icon-wrap"]}>
                  <img
                    src="/security-assets/AppStore-Icon.svg"
                    alt="App Store"
                    className={`${s["step-three__notification-icon"]} ${s["step-three__notification-icon--appstore"]}`}
                    draggable={false}
                  />

                  <span
                    className={s["step-three__notification-badge"]}
                    aria-hidden="true"
                  />
                </span>

                <div className={s["step-three__notification-content"]}>
                  <div className={s["step-three__notification-header"]}>
                    <p>Unsuccessful payment</p>
                    <span>now</span>
                  </div>

                  <p className={s["unsuccessful-note"]}>
                    No charge was completed.
                  </p>
                </div>
              </div>

              <div
                className={`${s["step-three__risk-sheet"]} ${
                  isRiskSheetVisible ? s["step-three__risk-sheet--show"] : ""
                }`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="risk-sheet-title"
              >
                <img
                  src="/security-assets/warning_icon2.svg"
                  alt="Warning"
                  className={s["step-three__risk-sheet-warning"]}
                  draggable={false}
                />

                <h2
                  id="risk-sheet-title"
                  className={s["step-three__risk-sheet-title"]}
                >
                  Payment not completed
                </h2>

                <p className={s["step-three__risk-sheet-message"]}>
                  You can close this window or retry the optional $4.99
                  one-time purchase.
                </p>

                <div className={s["step-three__risk-terminal"]}>
                  <h3>Demonstration results:</h3>

                  <table>
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Process</th>
                        <th>Message</th>
                      </tr>
                    </thead>

                    <tbody>
                      {threats.slice(1, 10).map((threat, index) => (
                        <tr key={`risk-${threat.code}-${index}`}>
                          <td>{threat.code}</td>
                          <td className={s.detected}>Simulated</td>
                          <td>{threat.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className={s["step-three__risk-sheet-loss"]}>
                  This demonstration did not inspect your device.
                </p>

                <button
                  type="button"
                  className={`${s["scan-button"]} ${s["step-three__try-again-button"]}`}
                  onClick={() => void runPayment()}
                  disabled={isPaymentRunning}
                >
                  {isPaymentRunning ? "Processing..." : "Try Again"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Home;
