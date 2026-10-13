import type { Metadata } from "next";
import Link from "next/link";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { TwoFactorAuthForm } from "@/features/funnel/TwoFactorAuthForm";

import styles from "../browsing-habits/page.module.css";

export const metadata: Metadata = {
  title: "Account protection",
  description: "Question 4 of the Security White privacy habits quiz.",
};

export default function TwoFactorAuthPage() {
  return (
    <FunnelScreen screenId="two-factor-auth">
      <div
        className={`${styles.questionScreen} ${styles.questionScreenPinned} ${styles.questionScreenFollowUp}`}
      >
        <div className={styles.questionIntro}>
          <div className={styles.progressHeader}>
            <div className={styles.topLine}>
              <Link
                className={styles.backLink}
                data-amplitude-event="quiz_back_button_clicked"
                data-amplitude-screen-name="quiz_screen4"
                href="/quiz/account-security"
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
              <p>Question 4 of 6</p>
            </div>

            <div
              className={styles.progress}
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={1}
              aria-valuemax={6}
              aria-valuenow={4}
            >
              {Array.from({ length: 6 }, (_, index) => (
                <span
                  className={index < 4 ? styles.progressActive : undefined}
                  key={index}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <header className={styles.questionHeading}>
            <p className={styles.category}>Account protection</p>
            <h1 id="question-title">
              <span aria-hidden="true">🔐</span> Could someone access your
              important accounts with just your password?
            </h1>
            <p className={styles.hint}>
              Without extra sign-in protection, a stolen password could be
              enough to access an account.
            </p>
          </header>
        </div>

        <TwoFactorAuthForm />
      </div>
    </FunnelScreen>
  );
}
