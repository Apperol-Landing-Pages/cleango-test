import type { Metadata } from "next";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { AccountSecurityForm } from "@/features/funnel/AccountSecurityForm";
import { AdaptiveSecondQuestionBackLink } from "@/features/funnel/AdaptiveSecondQuestionBackLink";

import styles from "../browsing-habits/page.module.css";

export const metadata: Metadata = {
  title: "Password security",
  description: "Question 3 of the Security White privacy habits quiz.",
};

export default function AccountSecurityPage() {
  return (
    <FunnelScreen screenId="account-security">
      <div
        className={`${styles.questionScreen} ${styles.questionScreenPinned} ${styles.questionScreenFollowUp}`}
      >
        <div className={styles.questionIntro}>
          <div className={styles.progressHeader}>
            <div className={styles.topLine}>
              <AdaptiveSecondQuestionBackLink />
              <p>Question 3 of 6</p>
            </div>

            <div
              className={styles.progress}
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={1}
              aria-valuemax={6}
              aria-valuenow={3}
            >
              {Array.from({ length: 6 }, (_, index) => (
                <span
                  className={index < 3 ? styles.progressActive : undefined}
                  key={index}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <header className={styles.questionHeading}>
            <p className={styles.category}>Password security</p>
            <h1 id="question-title">
              <span aria-hidden="true">🔑</span> Could reusing a password put
              several of your accounts at risk?
            </h1>
            <p className={styles.hint}>
              If one account is compromised, other accounts using the same
              password could be affected too.
            </p>
          </header>
        </div>

        <AccountSecurityForm />
      </div>
    </FunnelScreen>
  );
}
