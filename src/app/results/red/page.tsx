import type { Metadata } from "next";
import Image from "next/image";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import {
  RiskEmailHeading,
  RiskEmailPositiveCount,
} from "@/features/funnel/MediumEmailSummary";
import { ResultsEmailForm } from "@/features/funnel/ResultsEmailForm";

import baseStyles from "../page.module.css";
import sharedStyles from "../medium/page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Your privacy blind spots",
};

const privacyPolicyUrl = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL?.trim();
const termsOfUseUrl = process.env.NEXT_PUBLIC_TERMS_OF_USE_URL?.trim();

export default function RedResultsPage() {
  return (
    <FunnelScreen screenId="results-red">
      <div className={`${baseStyles.resultScreen} ${baseStyles.greenScreen} ${sharedStyles.screen} ${styles.screen}`}>
        <main className={baseStyles.greenContent}>
          <div className={`${baseStyles.greenIntro} ${sharedStyles.intro}`}>
            <p className={`${baseStyles.badge} ${baseStyles.dangerBadge}`}>
              <Image
                alt=""
                aria-hidden="true"
                className={baseStyles.badgeIcon}
                height={16}
                priority
                src="/icons/result-info-dark-red.svg"
                width={16}
              />
              Privacy blind spots identified
            </p>

            <RiskEmailHeading defaultIncorrectCount={5} />
            <p>
              Some everyday habits can make your information easier to expose.
              Your answers suggest where to pay attention.
            </p>
          </div>

          <section className={`${baseStyles.greenCard} ${sharedStyles.emailCard} ${styles.emailCard}`} aria-labelledby="email-title">
            <RiskEmailPositiveCount defaultIncorrectCount={5} />
            <div className={baseStyles.greenCardDivider} />
            <h2 id="email-title">Get your full results by email</h2>
            <ResultsEmailForm
              action="/results/snapshot/red"
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
