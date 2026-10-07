import Image from "next/image";
import Link from "next/link";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import {
  HabitIcon,
  type HabitIconName,
} from "@/components/icons/HabitIcon";

import styles from "./page.module.css";

const steps = [
  {
    title: "Start with your habits.",
    description:
      "Answer six simple questions. Each next question adapts to your answers.",
    highlighted: false,
  },
  {
    title: "Connect the dots.",
    description:
      "See which habits are working for you and which deserve a closer look.",
    highlighted: false,
  },
  {
    title: "Know your next move.",
    description:
      "Enter your email to view your snapshot and practical recommendations.",
    highlighted: true,
  },
] as const;

const habits: ReadonlyArray<{
  icon: HabitIconName;
  title: string;
  description: string;
}> = [
  {
    icon: "globe",
    title: "Browsing privacy",
    description: "See what private mode does – and what it doesn’t.",
  },
  {
    icon: "wifi",
    title: "Wi-Fi habits",
    description: "Rethink auto-join and everyday connection choices.",
  },
  {
    icon: "key",
    title: "Password habits",
    description: "Spot password reuse across your accounts.",
  },
  {
    icon: "shield",
    title: "Sign-in security",
    description: "Review the extra steps protecting your accounts.",
  },
  {
    icon: "sliders",
    title: "App permissions",
    description: "Consider who can access your location and photos.",
  },
  {
    icon: "refresh",
    title: "Device updates",
    description: "Keep security updates current.",
  },
];

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
              How private are
              <br />
              your <span>“private”</span>
              <br />
              <span>habits?</span>
            </h1>
            <p className={styles.lead}>
              What feels private online
              <br />
              may leave more of a trail than you think.
            </p>
            <p className={styles.supportingCopy}>
              Answer 6 quick questions to discover your
              <br />
              privacy blind spots – and where to start.
            </p>
          </div>
        </section>

        <div className={styles.actionBlock}>
          <Link
            className={styles.primaryAction}
            data-amplitude-event="quiz_started"
            href="/quiz/browsing-habits"
          >
            Show my privacy blind spots
          </Link>
          <p className={styles.actionNote}>
            <span>About 1 minute</span>
            <span aria-hidden="true">·</span>
            <span>No card needed</span>
          </p>
        </div>

        <section className={styles.stepsSection} aria-labelledby="steps-title">
          <h2 id="steps-title">Small steps. Better habits.</h2>
          <ol className={styles.stepsList}>
            {steps.map((step, index) => (
              <li
                className={step.highlighted ? styles.stepHighlighted : styles.step}
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
            <h2 id="habits-title">The habits we explore.</h2>
            <p>
              Your answers guide which topics
              <br />
              we look at more closely.
            </p>
          </div>

          <ul className={styles.habitsGrid}>
            {habits.map((habit) => (
              <li className={styles.habitCard} key={habit.title}>
                <HabitIcon name={habit.icon} />
                <h3>{habit.title}</h3>
                <p>{habit.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <footer className={styles.footer}>
          <p>© VEIL, Inc. 2026 – All rights reserved.</p>
        </footer>
      </div>
    </FunnelScreen>
  );
}
