"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";

import baseStyles from "@/app/results/snapshot/page.module.css";
import styles from "@/app/results/snapshot/medium/page.module.css";
import { ResultHabitIcon } from "@/features/funnel/ResultHabitIcon";
import { getMediumResultCards } from "@/lib/funnel/medium-result-cards";
import {
  readQuizQuestionOutcomes,
  type QuizQuestionOutcome,
} from "@/lib/funnel/quiz-result";

const privacyPolicyUrl = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL?.trim();
const termsOfUseUrl = process.env.NEXT_PUBLIC_TERMS_OF_USE_URL?.trim();

const subscribe = () => () => undefined;
const getServerSnapshot = () => "[]";

function getAnswersSnapshot() {
  try {
    return JSON.stringify(readQuizQuestionOutcomes(sessionStorage));
  } catch {
    return "[]";
  }
}

function GreenCheck() {
  return (
    <svg aria-hidden="true" fill="none" height="24" viewBox="0 0 24 24" width="24">
      <circle cx="12" cy="12" fill="#DDEFE4" r="12" />
      <path d="m6.8 12.2 3.2 3.1 7-7" stroke="#216E3D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function PlanCheck({ tone }: Readonly<{ tone: "medium" | "red" }>) {
  return (
    <svg aria-hidden="true" fill="none" height="24" viewBox="0 0 24 24" width="24">
      <circle cx="12" cy="12" fill="#fff" r="12" />
      <path
        d="m6.8 12.2 3.2 3.1 7-7"
        stroke={tone === "red" ? "#c43e43" : "#a65218"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function RiskSnapshotExperience({ tone }: Readonly<{ tone: "medium" | "red" }>) {
  const isRed = tone === "red";
  const serialized = useSyncExternalStore(
    subscribe,
    getAnswersSnapshot,
    getServerSnapshot,
  );
  const outcomes = JSON.parse(serialized) as QuizQuestionOutcome[];
  const hasCompleteAnswers =
    outcomes.length === 6 && outcomes.every((outcome) => outcome.isCorrect !== null);
  const cards = hasCompleteAnswers ? getMediumResultCards(outcomes) : [];
  const incorrectCount = cards.filter((card) => !card.isCorrect).length;
  const positiveCount = cards.length - incorrectCount;
  const strongCards = cards.filter((card) => card.isCorrect);

  return (
    <>
      <main className={`${baseStyles.results} ${styles.mediumResults} ${isRed ? styles.redResults : ""}`}>
        <section className={`${baseStyles.greenSummary} ${styles.mediumSummary}`} aria-labelledby="snapshot-title">
          <div className={`${baseStyles.badge} ${styles.warningBadge}`}>
            <Image alt="" aria-hidden="true" height={16} src={isRed ? "/icons/result-info-dark-red.svg" : "/icons/result-warning-solid.svg"} width={17} />
            <span>Your privacy snapshot</span>
          </div>
          {isRed ? (
            <h1 id="snapshot-title">
              Several habits could be <span>putting your privacy at risk.</span>
            </h1>
          ) : (
            <h1 id="snapshot-title">
              Your privacy habits may leave avoidable <span>gaps.</span>
            </h1>
          )}
          <p className={baseStyles.greenIntro}>
            This is not a device scan. Your answers point to habits that could
            increase exposure — and steps you can take.
          </p>
          <div
            className={baseStyles.greenScores}
            aria-label={hasCompleteAnswers ? `${incorrectCount} ${incorrectCount === 1 ? "area" : "areas"} to improve, ${positiveCount} of 6 positive answers` : "Quiz results loading"}
          >
            <div>
              <strong className={styles.problemCount}>
                {hasCompleteAnswers ? incorrectCount : "—"}
                <Image alt="" aria-hidden="true" height={20} src={isRed ? "/icons/result-info-dark-red.svg" : "/icons/result-warning-solid.svg"} width={20} />
              </strong>
              <span>{incorrectCount === 1 ? "area" : "areas"} to improve</span>
            </div>
            <div>
              <strong>{hasCompleteAnswers ? positiveCount : "—"} <small>of 6</small></strong>
              <span>positive answers</span>
            </div>
          </div>
          <div className={`${baseStyles.greenScoreTrack} ${styles.scoreTrack}`} aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => (
              <span className={index < incorrectCount ? styles.scoreActive : undefined} key={index} />
            ))}
          </div>
        </section>

        <section className={styles.focusSection} aria-labelledby="focus-title">
          <header className={styles.focusHeader}>
            <p className={baseStyles.eyebrow}>Based on your answers</p>
            <h2 id="focus-title">Here&apos;s what could leave you exposed.</h2>
            <p>
              {hasCompleteAnswers
                ? `Your answers highlight ${incorrectCount} ${incorrectCount === 1 ? "area" : "areas"} that could put your online privacy at risk. Here's what you can do to improve ${incorrectCount === 1 ? "it" : "them"}.`
                : "Your answer-specific results will appear here after you complete the quiz."}
            </p>
          </header>

          {hasCompleteAnswers ? (
            <ul className={styles.focusList}>
              {cards.map((card) => (
                <li className={`${styles.focusCard} ${card.isCorrect ? styles.focusCardCollapsed : ""}`} key={card.key}>
                  <div className={styles.focusCardLabel}>
                    <span className={styles.orangeIcon}>
                      <ResultHabitIcon name={card.icon} tone={tone} />
                    </span>
                    <span>{card.label}</span>
                  </div>
                  {card.isCorrect ? null : (
                    <div className={styles.focusCardBody}>
                      <h3>{card.riskTitle}</h3>
                      <p>{card.riskDescription}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <Link className={styles.quizLink} href="/quiz/browsing-habits">Review the quiz</Link>
          )}
        </section>

        {hasCompleteAnswers && strongCards.length > 0 ? (
          <section className={styles.strongSection} aria-labelledby="strong-title">
            <header>
              <h2 id="strong-title">Here&apos;s what you&apos;re doing right.</h2>
              <p>
                You got these questions right! Here&apos;s what you already know
                about staying safe online.
              </p>
            </header>
            <ul>
              {strongCards.map((card) => (
                <li key={card.key}>
                  <GreenCheck />
                  <span>
                    <strong>{card.label}</strong>
                    <span>{card.strengthDescription}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className={`${baseStyles.greenPlan} ${styles.mediumPlan}`} aria-labelledby="plan-title">
          <h2 id="plan-title">Knowing the gaps is only the first step.</h2>
          <p>
            Don&apos;t let easy-to-fix habits stay overlooked. Turn your results
            into a clear, manageable action plan.
          </p>
          <ul>
            <li><PlanCheck tone={tone} /> Follow easy, practical checklists</li>
            <li><PlanCheck tone={tone} /> Build better habits at your own pace</li>
          </ul>
          <Link
            className={baseStyles.primaryButton}
            data-amplitude-event="quiz_snapshot_bottom_button_clicked"
            href="/plans"
          >
            Build my privacy plan
          </Link>
          <p className={baseStyles.greenPlanNote}>Monthly plans · Cancel anytime</p>
        </section>

        <p className={baseStyles.disclaimer}>
          Based on your answers, not a device scan. This check does not detect
          tracking or data breaches.
        </p>
      </main>

      <footer className={baseStyles.greenFixedFooter}>
        <Link
          className={baseStyles.primaryButton}
          data-amplitude-event="quiz_snapshot_top_button_clicked"
          href="/plans"
        >
          See what I should fix first
        </Link>
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
        <p className={baseStyles.greenCopyright}>© Veylo, Inc. 2026 - All rights reserved.</p>
      </footer>
    </>
  );
}
