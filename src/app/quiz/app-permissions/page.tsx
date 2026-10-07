import type { Metadata } from "next";
import Link from "next/link";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { AppPermissionsForm } from "@/features/funnel/AppPermissionsForm";

import styles from "../browsing-habits/page.module.css";

export const metadata: Metadata = {
  title: "App permissions",
  description: "Question 5 of the Security White privacy habits quiz.",
};

export default function AppPermissionsPage() {
  return (
    <FunnelScreen screenId="app-permissions">
      <div className={styles.questionScreen}>
        <div className={styles.questionIntro}>
          <div className={styles.progressHeader}>
            <div className={styles.topLine}>
              <Link
                className={styles.backLink}
                data-amplitude-event="quiz_screen6_back_click"
                href="/quiz/two-factor-auth"
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
              <p>Question 5 of 6</p>
            </div>

            <div
              className={styles.progress}
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={1}
              aria-valuemax={6}
              aria-valuenow={5}
            >
              {Array.from({ length: 6 }, (_, index) => (
                <span
                  className={index < 5 ? styles.progressActive : undefined}
                  key={index}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <header className={styles.questionHeading}>
            <p className={styles.category}>App permissions</p>
            <h1 id="question-title">
              <span aria-hidden="true">📱</span> When an app asks for
              <br />
              access, what do you usually do?
            </h1>
            <p className={styles.hint}>
              Think about location, contacts, microphone, or photos.
            </p>
          </header>
        </div>

        <AppPermissionsForm />
      </div>
    </FunnelScreen>
  );
}
