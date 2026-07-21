"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ROUTER_ENDPOINTS } from "@/utils/constants";
import LandingHeader from "../shared/LandingHeader/LandingHeader";
import LandingFooter from "../shared/LandingFooter/LandingFooter";
import s from "./SecurityScan.module.scss";

const SCAN_ITEMS = [
  "Check System Settings",
  "Review App Permissions",
  "Scan for Harmful Files",
  "Web Protection",
] as const;

const TOTAL_DURATION_MS = 8000;
const STEP_MS = TOTAL_DURATION_MS / SCAN_ITEMS.length;
const RESULT_DELAY_MS = 600;

const ScanHeroIcon = () => (
  <Image
    className={s.heroIcon}
    src="/landing/security-scan.svg"
    width={264}
    height={264}
    alt=""
    priority
  />
);

const Spinner = () => (
  <span className={s.spinner} aria-hidden>
    {Array.from({ length: 12 }).map((_, i) => (
      <span
        key={i}
        style={{ transform: `rotate(${i * 30}deg)`, opacity: (i + 1) / 12 }}
      />
    ))}
  </span>
);

const GreenCheck = () => (
  <span className={s.greenCheck} aria-hidden>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.5 8.3l3 3L12.5 5"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const ScanResultModal = () => (
  <div
    className={s.modalOverlay}
    role="dialog"
    aria-modal="true"
    aria-label="Scan results"
  >
    <div className={s.modalCard}>
      <span className={s.modalBadge} aria-hidden>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12.5l4 4L19 7"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h2 className={s.modalTitle}>Scan successful!</h2>

      <div className={s.modalDivider} />

      <p className={s.modalLabel}>Scan Result:</p>
      <ul className={s.modalList}>
        {SCAN_ITEMS.map((item) => (
          <li key={item} className={s.modalItem}>
            <span>{item}</span>
            <GreenCheck />
          </li>
        ))}
      </ul>

      <Link href={ROUTER_ENDPOINTS.LANDING_EMAIL} className={s.continueBtn}>
        Continue
      </Link>
    </div>
  </div>
);

const SecurityScan = () => {
  const [completed, setCompleted] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const stepTimers = SCAN_ITEMS.map((_, i) =>
      setTimeout(() => setCompleted(i + 1), STEP_MS * (i + 1)),
    );
    const resultTimer = setTimeout(
      () => setShowResult(true),
      TOTAL_DURATION_MS + RESULT_DELAY_MS,
    );

    return () => {
      stepTimers.forEach(clearTimeout);
      clearTimeout(resultTimer);
    };
  }, []);

  return (
    <div className={`${s.page} ${showResult ? s.pageLocked : ""}`}>
      <LandingHeader logoHref={ROUTER_ENDPOINTS.LANDING} />

      <main className={s.main}>
        <ScanHeroIcon />

        <h1 className={s.title}>Running Security Scan...</h1>
        <p className={s.subtitle}>
          Let&rsquo;s explore methods to strengthen
          <br />
          your security.
        </p>

        <div className={s.progressTrack}>
          <div
            className={s.progressFill}
            style={{ animationDuration: `${TOTAL_DURATION_MS}ms` }}
          />
        </div>

        <ul className={s.itemList}>
          {SCAN_ITEMS.map((item, index) => {
            const done = index < completed;
            return (
              <li key={item} className={s.item}>
                <span className={s.itemLabel}>{item}</span>
                {done ? <GreenCheck /> : <Spinner />}
              </li>
            );
          })}
        </ul>
      </main>

      <LandingFooter />

      {showResult && <ScanResultModal />}
    </div>
  );
};

export default SecurityScan;
