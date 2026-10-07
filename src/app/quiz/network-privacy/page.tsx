import type { Metadata } from "next";
import Link from "next/link";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { NetworkPrivacyForm } from "@/features/funnel/NetworkPrivacyForm";

import styles from "../browsing-habits/page.module.css";

export const metadata: Metadata = {
  title: "Network privacy",
  description: "Question 2 of the Security White privacy habits quiz.",
};

export default function NetworkPrivacyPage() {
  return (
    <FunnelScreen screenId="network-privacy">
      <div className={styles.questionScreen}>
        <div className={styles.questionIntro}>
          <div className={styles.progressHeader}>
            <div className={styles.topLine}>
              <Link
                className={styles.backLink}
                data-amplitude-event="quiz_back_button_clicked"
                data-amplitude-screen-name="quiz_screen21"
                href="/quiz/browsing-habits"
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
              <p>Question 2 of 6</p>
            </div>

            <div
              className={styles.progress}
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={1}
              aria-valuemax={6}
              aria-valuenow={2}
            >
              {Array.from({ length: 6 }, (_, index) => (
                <span
                  className={index < 2 ? styles.progressActive : undefined}
                  key={index}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <header className={styles.questionHeading}>
            <p className={styles.category}>Network privacy</p>
            <h1 id="question-title">
              <span aria-hidden="true">📶</span> How do you use public
              <br />
              Wi-Fi?
            </h1>
            <p className={styles.hint}>
              For example, at a café, hotel, or airport.
            </p>
          </header>
        </div>

        <NetworkPrivacyForm />
      </div>
    </FunnelScreen>
  );
}
