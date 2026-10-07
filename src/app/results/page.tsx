import type { Metadata } from "next";
import Image from "next/image";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { ResultsEmailForm } from "@/features/funnel/ResultsEmailForm";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Your privacy snapshot",
};

export default function ResultsPage() {
  return (
    <FunnelScreen screenId="results">
      <div className={styles.resultScreen}>
        <section className={styles.resultCard} aria-labelledby="result-title">
          <div className={styles.resultCopy}>
            <p className={styles.badge}>
              <Image
                alt=""
                aria-hidden="true"
                className={styles.badgeIcon}
                height={18}
                priority
                src="/icons/result-check-green.svg"
                width={18}
              />
              No gaps found
            </p>

            <h1 id="result-title">
              Your habits
              <br />
              look <span>solid.</span>
            </h1>

            <p className={styles.summary}>
              Your answers revealed:
              <br />
              <strong>no obvious privacy gaps.</strong>
            </p>

            <p className={styles.description}>
              Enter your email address to receive additional results and some
              tips on how to save them.
            </p>
          </div>

          <ResultsEmailForm />
        </section>

        <footer className={styles.footer}>
          <p>© VEIL, Inc. 2026 – All rights reserved.</p>
        </footer>
      </div>
    </FunnelScreen>
  );
}
