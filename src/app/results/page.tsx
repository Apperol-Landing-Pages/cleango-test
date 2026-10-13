import type { Metadata } from "next";
import Image from "next/image";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { ResultsEmailForm } from "@/features/funnel/ResultsEmailForm";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Your privacy results are ready",
};

const privacyPolicyUrl = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL?.trim();
const termsOfUseUrl = process.env.NEXT_PUBLIC_TERMS_OF_USE_URL?.trim();

export default function ResultsPage() {
  return (
    <FunnelScreen screenId="results">
      <div className={`${styles.resultScreen} ${styles.greenScreen}`}>
        <main className={styles.greenContent}>
          <div className={styles.greenIntro}>
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
              Your privacy results are ready
            </p>

            <h1>
              Your security habits look <span>strong.</span> But are you fully protected?
            </h1>
            <p>
              You&apos;re making smart choices to protect your privacy. Explore your
              results and discover additional steps that could help you stay safer
              online.
            </p>
          </div>

          <section className={styles.greenCard} aria-labelledby="email-title">
            <p className={styles.greenScore}>
              <strong>6</strong><span>/6</span> habits already covered
            </p>
            <div className={styles.greenCardDivider} />
            <h2 id="email-title">Get your full results by email</h2>
            <ResultsEmailForm buttonLabel="Explore my results" greenLayout />
          </section>
        </main>

        <footer className={styles.greenFooter}>
          <p>Based on your answers, not a device scan.</p>
          <p className={styles.greenLegal}>
            {privacyPolicyUrl ? (
              <a href={privacyPolicyUrl}>Privacy Policy</a>
            ) : (
              <span>Privacy Policy</span>
            )}
            {" & "}
            {termsOfUseUrl ? (
              <a href={termsOfUseUrl}>Terms of Use</a>
            ) : (
              <span>Terms of Use</span>
            )}
          </p>
          <p>© Veylo, Inc. 2026 - All rights reserved.</p>
        </footer>
      </div>
    </FunnelScreen>
  );
}
