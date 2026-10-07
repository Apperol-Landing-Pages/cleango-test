import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { QuizResultScore } from "@/features/funnel/QuizResultDisplay";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Your privacy snapshot",
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

function CheckIcon({ small = false }: Readonly<{ small?: boolean }>) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={small ? styles.smallCheck : styles.check}
      height={small ? 18 : 24}
      priority={small}
      src="/icons/result-check-green.svg"
      width={small ? 18 : 24}
    />
  );
}

export default function PrivacySnapshotPage() {
  return (
    <FunnelScreen screenId="privacy-snapshot">
      <div className={styles.results}>
        <section className={styles.summaryCard} aria-labelledby="snapshot-title">
          <div className={styles.summaryCopy}>
            <div className={styles.badge}>
              <CheckIcon small />
              <span>Your privacy snapshot</span>
            </div>

            <h1 id="snapshot-title">
              Strong habits.
              <span>Nothing major to fix.</span>
            </h1>

            <p className={styles.intro}>
              Conduct a more in-depth analysis to identify where your weaknesses lie.
            </p>
          </div>

          <QuizResultScore
            activeColor="#3f8054"
            ariaLabel="Low privacy risk"
            defaultIncorrectCount={0}
            inactiveColor="#cfe2d6"
          />

          <div className={styles.actionGroup}>
            <Link
              className={styles.primaryButton}
              data-amplitude-event="quiz_screen10_top_plan_click"
              href="/plans"
            >
              Find my privacy plan
            </Link>
            <p>Compare 3 plans. Choose what fits you.</p>
          </div>
        </section>

        <section className={styles.habitsCard} aria-labelledby="habits-title">
          <header className={styles.habitsHeader}>
            <p className={styles.eyebrow}>Based on your answers</p>
            <h2 id="habits-title">Keep doing this.</h2>
            <p>These habits already protect you. Here&apos;s what you&apos;re doing right.</p>
          </header>

          <ul className={styles.habitsList}>
            {strongHabits.map((habit) => (
              <li key={habit}>
                <CheckIcon />
                <span>{habit}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.supportSection} aria-labelledby="support-title">
          <header className={styles.supportHeader}>
            <h2 id="support-title">
              Stay ahead.
              <span>Keep it effortless.</span>
            </h2>
            <p>Choose how much support you want to keep your habits strong.</p>
          </header>

          <ol className={styles.supportGrid}>
            {supportLevels.map((level) => (
              <li key={level.number}>
                <span className={styles.supportNumber}>{level.number}</span>
                <h3>{level.title}</h3>
                <p>{level.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.planCard} aria-labelledby="plan-title">
          <div className={styles.planCopy}>
            <h2 id="plan-title">Keep your privacy strong.</h2>
            <p>
              Small habits, kept up over time, do most of the work. Pick a plan that keeps
              you on track.
            </p>
          </div>

          <div className={styles.actionGroup}>
            <Link
              className={styles.primaryButton}
              data-amplitude-event="quiz_screen10_bottom_plan_click"
              href="/plans"
            >
              See plans
            </Link>
            <p>Monthly plans. Cancel anytime.</p>
          </div>
        </section>

        <p className={styles.disclaimer}>
          Based on your answers, not a device scan. This check does not detect tracking or
          data breaches.
        </p>

        <Link
          className={styles.reviewLink}
          data-amplitude-event="quiz_screen10_review_answers_click"
          href="/quiz/browsing-habits"
        >
          Review my answers
        </Link>

        <footer className={styles.footer}>
          <p>© VEIL, Inc. 2026 - All rights reserved.</p>
        </footer>
      </div>
    </FunnelScreen>
  );
}
