import type { Metadata } from "next";
import Image from "next/image";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import {
  RiskEmailHeading,
  RiskEmailPositiveCount,
} from "@/features/funnel/RiskEmailSummary";
import { ResultsEmailForm } from "@/features/funnel/ResultsEmailForm";

import baseStyles from "../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Your privacy blind spots",
};

const privacyPolicyUrl = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL?.trim();
const termsOfUseUrl = process.env.NEXT_PUBLIC_TERMS_OF_USE_URL?.trim();

export default function MediumResultsPage() {
  return (
    <FunnelScreen screenId="results-medium">
      <div className={`${baseStyles.resultScreen} ${baseStyles.greenScreen} ${styles.screen}`}>
        <main className={baseStyles.greenContent}>
          <div className={`${baseStyles.greenIntro} ${styles.intro}`}>
            <p className={`${baseStyles.badge} ${baseStyles.warningBadge}`}>
              <Image
                alt=""
                aria-hidden="true"
                className={`${baseStyles.badgeIcon} ${baseStyles.warningIcon}`}
                height={16}
                priority
                src="/icons/result-warning-solid.svg"
                width={17}
              />
              Privacy blind spots identified
            </p>

            <RiskEmailHeading />
            <p>
              Some everyday habits can make your information easier to expose.
              Your answers suggest where to pay attention.
            </p>
          </div>

          <section className={`${baseStyles.greenCard} ${styles.emailCard}`} aria-labelledby="email-title">
            <RiskEmailPositiveCount />
            <div className={baseStyles.greenCardDivider} />
            <h2 id="email-title">Get your full results by email</h2>
            <ResultsEmailForm
              action="/results/snapshot/medium"
              buttonLabel="Reveal my privacy gaps"
              greenLayout
            />
          </section>
        </main>

        <footer className={baseStyles.greenFooter}>
          <p>Free to view. No payment required.</p>
          <p className={baseStyles.greenLegal}>
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
