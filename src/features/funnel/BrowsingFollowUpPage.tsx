import Link from "next/link";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { BrowsingFollowUpForm } from "@/features/funnel/BrowsingFollowUpForm";

import styles from "@/app/quiz/browsing-habits/page.module.css";

type FollowUpAnswer = Readonly<{
  id: string;
  label: string;
}>;

type BrowsingFollowUpPageProps = Readonly<{
  answers: readonly FollowUpAnswer[];
  formName: string;
  hint: string;
  question: string;
  screenId: string;
  storageKey: string;
}>;

export function BrowsingFollowUpPage({
  answers,
  formName,
  hint,
  question,
  screenId,
  storageKey,
}: BrowsingFollowUpPageProps) {
  const analyticsScreenName =
    screenId === "shared-website-data" ? "quiz_screen22" : "quiz_screen23";

  return (
    <FunnelScreen screenId={screenId}>
      <div className={styles.questionScreen}>
        <div className={styles.questionIntro}>
          <div className={styles.progressHeader}>
            <div className={styles.topLine}>
              <Link
                className={styles.backLink}
                data-amplitude-event="quiz_back_button_clicked"
                data-amplitude-screen-name={analyticsScreenName}
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
            <p className={styles.category}>Browsing habits</p>
            <h1 id="question-title">
              <span aria-hidden="true">🛜</span> {question}
            </h1>
            <p className={styles.hint}>{hint}</p>
          </header>
        </div>

        <BrowsingFollowUpForm
          answers={answers}
          formName={formName}
          storageKey={storageKey}
        />
      </div>
    </FunnelScreen>
  );
}
