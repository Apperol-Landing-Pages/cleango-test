import Image from "next/image";
import Link from "next/link";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";

import styles from "./page.module.css";

const steps = [
  {
    title: "Answer 6 quick questions",
    description: "Tell us about your everyday online habits.",
    highlighted: false,
  },
  {
    title: "Discover your strengths",
    description:
      "See where your habits may leave you exposed — and what you already do well.",
    highlighted: false,
  },
  {
    title: "Get your next steps",
    description: "Find out which changes deserve your attention first.",
    highlighted: true,
  },
] as const;

const habits: ReadonlyArray<{
  icon: string;
  title: string;
  description: string;
}> = [
  {
    icon: "/icons/habit-private-browsing.svg",
    title: "Private browsing",
    description: "Understand what private mode can and can’t do.",
  },
  {
    icon: "/icons/habit-wifi-safety.svg",
    title: "Wi-Fi safety",
    description: "Make smarter choices when connecting online.",
  },
  {
    icon: "/icons/habit-password-security.svg",
    title: "Password security",
    description: "Learn why unique passwords matter.",
  },
  {
    icon: "/icons/habit-account-protection.svg",
    title: "Account protection",
    description: "Explore ways to keep important accounts safer.",
  },
  {
    icon: "/icons/habit-app-permissions.svg",
    title: "App permissions",
    description: "Stay in control of what apps can access.",
  },
  {
    icon: "/icons/habit-software-updates.svg",
    title: "Software updates",
    description: "Keep your devices up to date.",
  },
];

const privacyPolicyUrl = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL?.trim();
const termsOfUseUrl = process.env.NEXT_PUBLIC_TERMS_OF_USE_URL?.trim();

export default function HomePage() {
  return (
    <FunnelScreen screenId="intro">
      <div className={styles.pageContent}>
        <section className={styles.hero} aria-labelledby="screen-title">
          <Image
            className={styles.heroImage}
            src="/images/privacy-intro.svg"
            width={361}
            height={218}
            preload
            alt="A smartphone surrounded by privacy and connectivity symbols"
          />

          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Your online privacy</p>
            <h1 id="screen-title" className={styles.title}>
              Are your online habits putting your privacy at risk?
            </h1>
            <p className={styles.lead}>
              Small everyday choices can expose more
              <br />
              information than you realize.
            </p>
            <p className={styles.supportingCopy}>
              Take this 1-minute check to uncover overlooked
              <br />
              privacy habits — and learn what to fix first.
            </p>
          </div>
        </section>

        <section className={styles.stepsSection} aria-labelledby="steps-title">
          <h2 id="steps-title">How it works</h2>
          <ol className={styles.stepsList}>
            {steps.map((step, index) => (
              <li
                className={`${styles.step} ${step.highlighted ? styles.stepHighlighted : ""}`}
                key={step.title}
              >
                <span className={styles.stepNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.habitsSection} aria-labelledby="habits-title">
          <div className={styles.sectionHeading}>
            <h2 id="habits-title">What we’ll cover</h2>
          </div>

          <ul className={styles.habitsGrid}>
            {habits.map((habit) => (
              <li className={styles.habitCard} key={habit.title}>
                <Image alt="" height={32} src={habit.icon} width={32} />
                <h3>{habit.title}</h3>
                <p>{habit.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <footer className={styles.footer}>
          <Link
            className={styles.primaryAction}
            data-amplitude-event="quiz_startscreen_button_clicked"
            href="/quiz/browsing-habits"
          >
            Find my privacy blind spots
          </Link>
          <p className={styles.legalLinks}>
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
          <p className={styles.copyright}>© Veylo, Inc. 2026 - All rights reserved.</p>
        </footer>
      </div>
    </FunnelScreen>
  );
}
