import type { Metadata } from "next";
import Image from "next/image";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { QuizResultEntrySummary } from "@/features/funnel/QuizResultDisplay";
import { ResultsEmailForm } from "@/features/funnel/ResultsEmailForm";

import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Your privacy gaps",
};

export default function MediumResultsPage() {
  return (
    <FunnelScreen screenId="results-medium">
      <div className={styles.resultScreen}>
        <section
          className={`${styles.resultCard} ${styles.mediumCard}`}
          aria-labelledby="result-title"
        >
          <div className={`${styles.resultCopy} ${styles.mediumCopy}`}>
            <p className={`${styles.badge} ${styles.warningBadge}`}>
              <Image
                alt=""
                aria-hidden="true"
                className={`${styles.badgeIcon} ${styles.warningIcon}`}
                height={16}
                priority
                src="/icons/result-warning-solid.svg"
                width={17}
              />
              Privacy gaps identified
            </p>

            <h1 id="result-title">
              Feeling private
              <br />
              isn’t <span>enough.</span>
            </h1>

            <QuizResultEntrySummary variant="medium" />

            <p className={styles.description}>
              Don’t leave them unchecked. Enter your email to see where your
              habits fall short - and what to change first.
            </p>
          </div>

          <ResultsEmailForm
            action="/results/snapshot/medium"
            buttonLabel="Show my gaps & next steps"
          />
        </section>

        <footer className={styles.footer}>
          <p>© VEIL, Inc. 2026 – All rights reserved.</p>
        </footer>
      </div>
    </FunnelScreen>
  );
}
