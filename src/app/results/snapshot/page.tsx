import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { ResultHabitIcon } from "@/features/funnel/ResultHabitIcon";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Your privacy snapshot",
};

const privacyPolicyUrl = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL?.trim();
const termsOfUseUrl = process.env.NEXT_PUBLIC_TERMS_OF_USE_URL?.trim();

const strongHabits = [
  {
    icon: "password",
    title: "Password Security",
    description: "You know how to create strong passwords and keep your accounts secure.",
  },
  {
    icon: "permissions",
    title: "App Permissions",
    description: "You're thoughtful about what apps can access.",
  },
  {
    icon: "wifi",
    title: "Public Wi-Fi",
    description: "You're wisely choosing how to connect to public networks.",
  },
  {
    icon: "account",
    title: "Account Protection",
    description: "You understand how to protect your accounts from unauthorized access.",
  },
  {
    icon: "updates",
    title: "Software Updates",
    description: "You're keeping your software up to date.",
  },
  {
    icon: "browsing",
    title: "Private Browsing",
    description: "You understand the limits of private browsing.",
  },
] as const;

function CheckIcon({ small = false }: Readonly<{ small?: boolean }>) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={small ? styles.smallCheck : styles.check}
      height={small ? 18 : 24}
      src="/icons/result-check-green.svg"
      width={small ? 18 : 24}
    />
  );
}

export default function PrivacySnapshotPage() {
  return (
    <FunnelScreen screenId="privacy-snapshot">
      <main className={`${styles.results} ${styles.greenResults}`}>
        <section className={styles.greenSummary} aria-labelledby="snapshot-title">
          <div className={styles.badge}>
            <CheckIcon small />
            <span>Your privacy snapshot</span>
          </div>

          <h1 id="snapshot-title">
            You&apos;re building <span>strong privacy habits.</span>
          </h1>
          <p className={styles.greenIntro}>
            This is not a device scan. Your answers point to habits that could
            increase exposure — and steps you can take.
          </p>

          <div className={styles.greenScores} aria-label="0 areas to improve, 6 of 6 positive answers">
            <div>
              <strong>0</strong>
              <span>areas to improve</span>
            </div>
            <div>
              <strong>6 <small>of 6</small></strong>
              <span>positive answers</span>
            </div>
          </div>
          <div className={styles.greenScoreTrack} aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => <span key={index} />)}
          </div>
        </section>

        <section className={styles.greenHabits} aria-labelledby="habits-title">
          <header>
            <p className={styles.eyebrow}>Based on your answers</p>
            <h2 id="habits-title">Here&apos;s what you&apos;re doing right.</h2>
            <p>
              Your answers show no obvious privacy gaps. Here&apos;s what you&apos;re
              already doing right — and how to keep it that way.
            </p>
          </header>

          <ul>
            {strongHabits.map((habit) => (
              <li key={habit.title}>
                <span className={styles.greenHabitIcon}>
                  <ResultHabitIcon name={habit.icon} tone="green" />
                </span>
                <span>
                  <strong>{habit.title}</strong>
                  <span>{habit.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.greenPlan} aria-labelledby="plan-title">
          <h2 id="plan-title">Turn your privacy tips into a simple plan.</h2>
          <p>Turn your results into a clear, manageable action plan.</p>
          <ul>
            <li><CheckIcon small /> Follow easy, practical checklists</li>
            <li><CheckIcon small /> Build better habits at your own pace</li>
          </ul>
          <Link
            className={styles.primaryButton}
            data-amplitude-event="quiz_snapshot_bottom_button_clicked"
            href="/plans"
          >
            Build my privacy plan
          </Link>
          <p className={styles.greenPlanNote}>Monthly plans · Cancel anytime</p>
        </section>

        <p className={styles.disclaimer}>
          Based on your answers, not a device scan. This check does not detect
          tracking or data breaches.
        </p>
      </main>

      <footer className={styles.greenFixedFooter}>
        <Link
          className={styles.primaryButton}
          data-amplitude-event="quiz_snapshot_top_button_clicked"
          href="/plans"
        >
          See what I should fix first
        </Link>
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
        <p className={styles.greenCopyright}>© Veylo, Inc. 2026 - All rights reserved.</p>
      </footer>
    </FunnelScreen>
  );
}
