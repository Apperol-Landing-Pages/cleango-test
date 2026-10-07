import type { Metadata } from "next";
import Link from "next/link";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { BrowsingHabitsForm } from "@/features/funnel/BrowsingHabitsForm";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Browsing habits",
  description: "Question 1 of the Security White privacy habits quiz.",
};

export default function BrowsingHabitsPage() {
  return (
    <FunnelScreen screenId="browsing-habits">
      <div className={styles.questionScreen}>
        <div className={styles.questionIntro}>
          <div className={styles.progressHeader}>
            <div className={styles.topLine}>
              <Link
                className={styles.backLink}
                data-amplitude-event="quiz_screen2_back_click"
                href="/"
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
              <p>Question 1 of 6</p>
            </div>

            <div
              className={styles.progress}
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={1}
              aria-valuemax={6}
              aria-valuenow={1}
            >
              {Array.from({ length: 6 }, (_, index) => (
                <span
                  className={index === 0 ? styles.progressActive : undefined}
                  key={index}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <header className={styles.questionHeading}>
            <p className={styles.category}>Browsing habits</p>
            <h1 id="question-title">
              <span aria-hidden="true">🕶️</span> What do you expect
              <br />
              private browsing to hide?
            </h1>
            <p className={styles.hint}>
              Think about the incognito or private mode in your browser.
            </p>
          </header>
        </div>

        <BrowsingHabitsForm />
      </div>
    </FunnelScreen>
  );
}
