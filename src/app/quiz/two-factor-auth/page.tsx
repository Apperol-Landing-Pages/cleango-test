import type { Metadata } from "next";
import Link from "next/link";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { TwoFactorAuthForm } from "@/features/funnel/TwoFactorAuthForm";

import styles from "../browsing-habits/page.module.css";

export const metadata: Metadata = {
  title: "Two-factor authentication",
  description: "Question 4 of the Security White privacy habits quiz.",
};

export default function TwoFactorAuthPage() {
  return (
    <FunnelScreen screenId="two-factor-auth">
      <div className={styles.questionScreen}>
        <div className={styles.questionIntro}>
          <div className={styles.progressHeader}>
            <div className={styles.topLine}>
              <Link
                className={styles.backLink}
                data-amplitude-event="quiz_screen5_back_click"
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
            <p className={styles.category}>Account security</p>
            <h1 id="question-title">
              <span aria-hidden="true">🔐</span> Do your important accounts
              <br />
              have a second sign-in step?
            </h1>
            <p className={styles.hint}>
              Such as an authenticator code, security key, or a passkey.
            </p>
          </header>
        </div>

        <TwoFactorAuthForm />
      </div>
    </FunnelScreen>
  );
}
