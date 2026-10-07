import type { Metadata } from "next";
import Image from "next/image";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { QuizResultEntrySummary } from "@/features/funnel/QuizResultDisplay";
import { ResultsEmailForm } from "@/features/funnel/ResultsEmailForm";

import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Your privacy gaps",
};

export default function LiteResultsPage() {
  return (
    <FunnelScreen screenId="results-lite">
      <div className={styles.resultScreen}>
        <section
          className={`${styles.resultCard} ${styles.liteCard}`}
          aria-labelledby="result-title"
        >
          <div className={`${styles.resultCopy} ${styles.liteCopy}`}>
            <p className={`${styles.badge} ${styles.warningBadge}`}>
              <Image
                alt=""
                aria-hidden="true"
                className={`${styles.badgeIcon} ${styles.warningIcon}`}
                height={16}
                priority
                src="/icons/result-warning-gradient.svg"
                width={17}
              />
              Privacy gaps identified
            </p>

            <h1 id="result-title">
              You’re <span>mostly covered.</span>
            </h1>

            <QuizResultEntrySummary variant="lite" />

            <p className={styles.description}>
              Enter your email to see which habit to fix and how. It takes a few minutes.
            </p>
          </div>

          <ResultsEmailForm
            action="/results/snapshot/lite"
            buttonLabel="Show my gaps & quick fix"
          />
        </section>

        <footer className={styles.footer}>
          <p>© VEIL, Inc. 2026 – All rights reserved.</p>
        </footer>
      </div>
    </FunnelScreen>
  );
}
