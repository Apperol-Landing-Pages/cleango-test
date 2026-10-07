import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import {
  QuizResultScore,
  QuizResultSnapshotHeading,
} from "@/features/funnel/QuizResultDisplay";

import baseStyles from "../page.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Your privacy fix plan",
};

const recommendations = [
  {
    number: "1",
    priority: true,
    title: "Give every account its own password",
    answer: "A few accounts share a password",
    description:
      "Start with your email and most important accounts. A password manager can create and store unique passwords, so a leak from one service is less likely to affect others.",
  },
  {
    number: "2",
    priority: true,
    title: "Give apps only the access they need",
    answer: "Check some requests, but not every one",
    description:
      "Review permissions in your device settings. Remove unnecessary access and choose ‘while using the app’ or selected photos where those options fit your needs.",
  },
  {
    number: "3",
    priority: false,
    title: "Be deliberate about public Wi-Fi",
    answer: "I connect automatically to available networks",
    description:
      "Turn off automatic connections, confirm the network name with the venue, and pay attention to browser security warnings. Use mobile data when a network seems suspicious.",
  },
  {
    number: "4",
    priority: false,
    title: "Turn on two-step verification",
    answer: "Only on a couple of accounts",
    description:
      "Add it to email, banking and social accounts first. Even if a password leaks, a second step blocks most sign-in attempts.",
  },
  {
    number: "5",
    priority: false,
    title: "Limit tracking while you browse",
    answer: "Sites and ads follow me around",
    description:
      "A VPN hides your IP address from the sites you visit, and tracker blocking cuts down on ads that follow you across the web.",
  },
] as const;

const supportLevels = [
  {
    number: "1",
    title: "Your priorities",
    description: "Your strong habits, plus what to watch for.",
  },
  {
    number: "2",
    title: "Practical checklists",
    description: "Everyday actions to work through with Plus.",
  },
  {
    number: "3",
    title: "Deeper guidance",
    description: "More detailed walkthroughs with Complete.",
  },
] as const;

function CheckIcon() {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={styles.check}
      height={24}
      src="/icons/result-check-green.svg"
      width={24}
    />
  );
}

export default function RedPrivacySnapshotPage() {
  return (
    <FunnelScreen screenId="privacy-snapshot-red">
      <div className={`${baseStyles.results} ${styles.redResults}`}>
        <section
          className={`${baseStyles.summaryCard} ${styles.redSummary}`}
          aria-labelledby="snapshot-title"
        >
          <div className={baseStyles.summaryCopy}>
            <div className={`${baseStyles.badge} ${styles.dangerBadge}`}>
              <Image
                alt=""
                aria-hidden="true"
                className={styles.badgeIcon}
                height={18}
                priority
                src="/icons/result-info-dark-red.svg"
                width={18}
              />
              <span>High exposure</span>
            </div>

            <QuizResultSnapshotHeading id="snapshot-title" variant="red" />

            <p className={baseStyles.intro}>
              Based on your answers, several habits leave your data open. Fixing the top
              two closes most of the risk.
            </p>
          </div>

          <QuizResultScore
            activeColor="#cf4a47"
            ariaLabel="High privacy risk"
            defaultIncorrectCount={5}
            inactiveColor="#f1cfce"
            indicatorIcon="/icons/result-info-red.svg"
            indicatorWidth={22}
            scoreClassName={styles.alertScore}
          />

          <div className={baseStyles.actionGroup}>
            <Link
              className={baseStyles.primaryButton}
              data-amplitude-event="quiz_snapshot_top_button_clicked"
              href="/plans"
            >
              Get my protection plan
            </Link>
            <p>Compare 3 plans. Choose what fits you.</p>
          </div>
        </section>

        <section className={styles.recommendations} aria-labelledby="fix-title">
          <header className={styles.recommendationsHeader}>
            <p className={styles.eyebrow}>Based on your answers</p>
            <h2 id="fix-title">Fix these first.</h2>
            <p>
              Your answers highlight 5 areas to work on. Start with the recommendations
              below.
            </p>
          </header>

          <div className={styles.recommendationsBody}>
            <ol className={styles.recommendationList}>
              {recommendations.map((recommendation) => (
                <li className={styles.recommendationCard} key={recommendation.number}>
                  <span className={styles.recommendationNumber} aria-hidden="true">
                    {recommendation.number}
                  </span>
                  <div>
                    {recommendation.priority ? (
                      <p className={styles.priority}>High priority</p>
                    ) : null}
                    <h3>{recommendation.title}</h3>
                    <p className={styles.answerQuote}>
                      “Your answer: ‘{recommendation.answer}’”
                    </p>
                    <p className={styles.recommendationDescription}>
                      {recommendation.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className={styles.strongHabit}>
              <p>Already strong (1)</p>
              <div>
                <CheckIcon />
                <span>I install updates within days</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`${baseStyles.supportSection} ${styles.redSupport}`}
          aria-labelledby="support-title"
        >
          <header className={baseStyles.supportHeader}>
            <h2 id="support-title">
              5 gaps.
              <span>One clear plan.</span>
            </h2>
            <p>Choose the level of guidance you need.</p>
          </header>

          <ol className={baseStyles.supportGrid}>
            {supportLevels.map((level) => (
              <li key={level.number}>
                <span className={baseStyles.supportNumber}>{level.number}</span>
                <h3>{level.title}</h3>
                <p>{level.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className={`${baseStyles.planCard} ${styles.redPlan}`}
          aria-labelledby="plan-title"
        >
          <div className={baseStyles.planCopy}>
            <h2 id="plan-title">Start closing your gaps today.</h2>
            <p>
              The top two fixes take less than an hour. Your plan walks you through each
              one.
            </p>
          </div>

          <div className={baseStyles.actionGroup}>
            <Link
              className={baseStyles.primaryButton}
              data-amplitude-event="quiz_snapshot_bottom_button_clicked"
              href="/plans"
            >
              See plans
            </Link>
            <p>Monthly plans. Cancel anytime.</p>
          </div>
        </section>

        <p className={baseStyles.disclaimer}>
          Based on your answers, not a device scan. This check does not detect tracking or
          data breaches.
        </p>

        <Link
          className={baseStyles.reviewLink}
          data-amplitude-event="quiz_snapshot_review_clicked"
          href="/quiz/browsing-habits"
        >
          Review my answers
        </Link>

        <footer className={baseStyles.footer}>
          <p>© VEIL, Inc. 2026 - All rights reserved.</p>
        </footer>
      </div>
    </FunnelScreen>
  );
}
