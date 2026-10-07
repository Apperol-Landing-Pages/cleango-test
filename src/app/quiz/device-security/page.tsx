import type { Metadata } from "next";
import Link from "next/link";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { DeviceSecurityForm } from "@/features/funnel/DeviceSecurityForm";

import styles from "../browsing-habits/page.module.css";

export const metadata: Metadata = {
  title: "Device security",
  description: "Question 6 of the Security White privacy habits quiz.",
};

export default function DeviceSecurityPage() {
  return (
    <FunnelScreen screenId="device-security">
      <div className={styles.questionScreen}>
        <div className={styles.questionIntro}>
          <div className={styles.progressHeader}>
            <div className={styles.topLine}>
              <Link
                className={styles.backLink}
                data-amplitude-event="quiz_screen7_back_click"
                href="/quiz/app-permissions"
              >
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="m9.75 3.5-4.5 4.5 4.5 4.5M5.5 8h7"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back
              </Link>
              <p>Question 6 of 6</p>
            </div>

            <div
              className={styles.progress}
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={1}
              aria-valuemax={6}
              aria-valuenow={6}
            >
              {Array.from({ length: 6 }, (_, index) => (
                <span
                  className={styles.progressActive}
                  key={index}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <header className={styles.questionHeading}>
            <p className={styles.category}>Device security</p>
            <h1 id="question-title">
              <span aria-hidden="true">🔄</span> How quickly do you install
              <br />
              security updates?
            </h1>
            <p className={styles.hint}>
              For your phone, computer, browser, and apps.
            </p>
          </header>
        </div>

        <DeviceSecurityForm />
      </div>
    </FunnelScreen>
  );
}
