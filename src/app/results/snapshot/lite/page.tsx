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
  title: "Your privacy quick fix",
};

const strongHabits = [
  "Every account has its own password",
  "I review what apps can access",
  "I check networks before connecting",
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

export default function LitePrivacySnapshotPage() {
  return (
    <FunnelScreen screenId="privacy-snapshot-lite">
      <div className={baseStyles.results}>
        <section
          className={`${baseStyles.summaryCard} ${styles.liteSummary}`}
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
                src="/icons/result-warning-gradient.svg"
                width={17}
              />
              <span>Privacy gaps identified</span>
            </div>

            <QuizResultSnapshotHeading id="snapshot-title" variant="lite" />

            <p className={baseStyles.intro}>
              Based on your answers, these habits deserve attention. Take the next step to
              address them.
            </p>
          </div>

          <QuizResultScore
            activeColor="#3f8054"
            ariaLabel="Low privacy risk"
            defaultIncorrectCount={1}
            inactiveColor="#cfe2d6"
            indicatorIcon="/icons/result-warning-gradient.svg"
            scoreClassName={styles.alertScore}
          />

          <div className={baseStyles.actionGroup}>
            <Link
              className={baseStyles.primaryButton}
              data-amplitude-event="quiz_screen10_top_plan_click"
              href="/plans"
            >
              Find my privacy plan
            </Link>
            <p>Compare 3 plans. Choose what fits you.</p>
          </div>
        </section>

        <section className={styles.quickWins} aria-labelledby="quick-win-title">
          <header className={styles.quickWinsHeader}>
            <p className={styles.eyebrow}>Based on your answers</p>
            <h2 id="quick-win-title">One quick win.</h2>
            <p>Your answers highlight 1 area to work on. Everything else looks good.</p>
          </header>

          <div className={styles.quickWinsBody}>
            <article className={styles.quickFix}>
              <span className={styles.quickFixNumber} aria-hidden="true">
                1
              </span>
              <div>
                <h3>Give every account its own password</h3>
                <p className={styles.answerQuote}>
                  “Your answer: ‘A few accounts share a password’”
                </p>
                <p className={styles.quickFixDescription}>
                  Start with your email and most important accounts. A password manager can
                  create and store unique passwords, so a leak from one service is less
                  likely to affect others.
                </p>
              </div>
            </article>

            <ul className={styles.habitsList}>
              {strongHabits.map((habit) => (
                <li key={habit}>
                  <CheckIcon />
                  <span>{habit}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={baseStyles.supportSection} aria-labelledby="support-title">
          <header className={baseStyles.supportHeader}>
            <h2 id="support-title">
              Stay ahead.
              <span>Keep it effortless.</span>
            </h2>
            <p>Choose how much support you want to keep your habits strong.</p>
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

        <section className={baseStyles.planCard} aria-labelledby="plan-title">
          <div className={baseStyles.planCopy}>
            <h2 id="plan-title">Keep your privacy strong.</h2>
            <p>
              Small habits, kept up over time, do most of the work. Pick a plan that keeps
              you on track.
            </p>
          </div>

          <div className={baseStyles.actionGroup}>
            <Link
              className={baseStyles.primaryButton}
              data-amplitude-event="quiz_screen10_bottom_plan_click"
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
          data-amplitude-event="quiz_screen10_review_answers_click"
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
