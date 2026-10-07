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
  title: "Your privacy priorities",
};

const recommendations = [
  {
    number: "1",
    title: "Give every account its own password",
    answer: "A few accounts share a password",
    description:
      "Start with your email and most important accounts. A password manager can create and store unique passwords, so a leak from one service is less likely to affect others.",
  },
  {
    number: "2",
    title: "Give apps only the access they need",
    answer: "Check some requests, but not every one",
    description:
      "Review permissions in your device settings. Remove unnecessary access and choose ‘while using the app’ or selected photos where those options fit your needs.",
  },
  {
    number: "3",
    title: "Be deliberate about public Wi-Fi",
    answer: "I connect automatically to available networks",
    description:
      "Turn off automatic connections, confirm the network name with the venue, and pay attention to browser security warnings. Use mobile data when a network seems suspicious.",
  },
] as const;

const strongHabits = [
  "On for all key accounts",
  "I limit tracking while browsing",
  "I install updates within days",
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

export default function MediumPrivacySnapshotPage() {
  return (
    <FunnelScreen screenId="privacy-snapshot-medium">
      <div className={`${baseStyles.results} ${styles.mediumResults}`}>
        <section
          className={`${baseStyles.summaryCard} ${styles.mediumSummary}`}
          aria-labelledby="snapshot-title"
        >
          <div className={baseStyles.summaryCopy}>
            <div className={`${baseStyles.badge} ${styles.warningBadge}`}>
              <Image
                alt=""
                aria-hidden="true"
                className={styles.badgeIcon}
                height={16}
                priority
                src="/icons/result-warning-solid.svg"
                width={17}
              />
              <span>Your privacy snapshot</span>
            </div>

            <QuizResultSnapshotHeading id="snapshot-title" variant="medium" />

            <p className={baseStyles.intro}>
              Based on your answers, these habits deserve attention. Take the next step to
              address them.
            </p>
          </div>

          <QuizResultScore
            activeColor="#a65218"
            ariaLabel="Medium privacy risk"
            defaultIncorrectCount={3}
            inactiveColor="#f2d9c8"
            indicatorIcon="/icons/result-warning-solid.svg"
            scoreClassName={styles.alertScore}
          />

          <div className={baseStyles.actionGroup}>
            <Link
              className={baseStyles.primaryButton}
              data-amplitude-event="quiz_snapshot_top_plan_clicked"
              href="/plans"
            >
              Find my privacy plan
            </Link>
            <p>Compare 3 plans. Choose what fits you.</p>
          </div>
        </section>

        <section className={styles.recommendations} aria-labelledby="focus-title">
          <header className={styles.recommendationsHeader}>
            <p className={styles.eyebrow}>Based on your answers</p>
            <h2 id="focus-title">Here’s where to focus.</h2>
            <p>
              Your answers highlight 3 areas to work on. Start with the recommendations
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

            <div className={styles.strongHabits}>
              <p>Already strong (3)</p>
              <ul>
                {strongHabits.map((habit) => (
                  <li key={habit}>
                    <CheckIcon />
                    <span>{habit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className={`${baseStyles.supportSection} ${styles.mediumSupport}`}
          aria-labelledby="support-title"
        >
          <header className={baseStyles.supportHeader}>
            <h2 id="support-title">
              Less guesswork.
              <span>Clearer next steps.</span>
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
          className={`${baseStyles.planCard} ${styles.mediumPlan}`}
          aria-labelledby="plan-title"
        >
          <div className={baseStyles.planCopy}>
            <h2 id="plan-title">Your next step starts here.</h2>
            <p>Turn your 3 gaps into a short, clear plan.</p>
          </div>

          <div className={baseStyles.actionGroup}>
            <Link
              className={baseStyles.primaryButton}
              data-amplitude-event="quiz_snapshot_bottom_plan_clicked"
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
          data-amplitude-event="quiz_snapshot_review_answers_clicked"
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
