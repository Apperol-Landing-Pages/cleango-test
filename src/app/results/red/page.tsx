import type { Metadata } from "next";
import Image from "next/image";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { QuizResultEntrySummary } from "@/features/funnel/QuizResultDisplay";
import { ResultsEmailForm } from "@/features/funnel/ResultsEmailForm";

import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "Your privacy exposure",
};

export default function RedResultsPage() {
  return (
    <FunnelScreen screenId="results-red">
      <div className={styles.resultScreen}>
        <section
          className={`${styles.resultCard} ${styles.redCard}`}
          aria-labelledby="result-title"
        >
          <div className={`${styles.resultCopy} ${styles.redCopy}`}>
            <p className={`${styles.badge} ${styles.dangerBadge}`}>
              <Image
                alt=""
                aria-hidden="true"
                className={styles.badgeIcon}
                height={18}
                priority
                src="/icons/result-info-dark-red.svg"
                width={18}
              />
              High exposure
            </p>

            <h1 id="result-title">
              Your data is
              <br />
              <span>more exposed</span>
              <br />
              than you think.
            </h1>

            <QuizResultEntrySummary variant="red" />

            <p className={styles.description}>
              These gaps add up. Enter your email to see what’s most exposed and what to
              fix first.
            </p>
          </div>

          <ResultsEmailForm
            action="/results/snapshot/red"
            buttonLabel="Show my gaps & fix plan"
          />
        </section>

        <footer className={styles.footer}>
          <p>© VEIL, Inc. 2026 – All rights reserved.</p>
        </footer>
      </div>
    </FunnelScreen>
  );
}
