"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import styles from "@/app/quiz/progress/page.module.css";
import {
  calculateQuizResult,
  getResultsRoute,
  saveQuizResult,
} from "@/lib/funnel/quiz-result";
import { trackAmplitudeEvent } from "@/lib/analytics/amplitude";

const durationMs = 6600;
const radius = 64;
const circumference = 2 * Math.PI * radius;

const steps = [
  "Reviewing browsing habits",
  "Identifying habits to improve",
  "Preparing your recommendations",
] as const;

type StepStatus = "complete" | "loading" | "pending";

function getStepStatus(index: number, progress: number): StepStatus {
  if (progress >= 100) {
    return "complete";
  }

  const activeStep = progress < 34 ? 0 : progress < 68 ? 1 : 2;

  if (index < activeStep) {
    return "complete";
  }

  return index === activeStep ? "loading" : "pending";
}

function StepIcon({ index, status }: { index: number; status: StepStatus }) {
  const statusClass =
    status === "complete"
      ? styles.iconComplete
      : status === "loading"
        ? styles.iconLoading
        : styles.iconPending;

  return (
    <span
      className={`${styles.iconTransition} ${statusClass}`}
      aria-hidden="true"
    >
      <span className={`${styles.iconLayer} ${styles.numberLayer}`}>
        {index + 1}
      </span>
      <span className={`${styles.iconLayer} ${styles.loaderLayer}`}>
        <svg
          className={styles.spinnerGlyph}
          viewBox="0 0 24 24"
          fill="none"
        >
          <line x1="12" y1="2.5" x2="12" y2="7" />
          <line x1="18.72" y1="5.28" x2="15.54" y2="8.46" />
          <line x1="21.5" y1="12" x2="17" y2="12" />
          <line x1="18.72" y1="18.72" x2="15.54" y2="15.54" />
          <line x1="12" y1="21.5" x2="12" y2="17" />
          <line x1="5.28" y1="18.72" x2="8.46" y2="15.54" />
          <line x1="2.5" y1="12" x2="7" y2="12" />
          <line x1="5.28" y1="5.28" x2="8.46" y2="8.46" />
        </svg>
      </span>
      <span className={`${styles.iconLayer} ${styles.checkLayer}`}>
        <svg viewBox="0 0 16 16" fill="none">
          <path
            className={styles.checkPath}
            d="m4.25 8.1 2.25 2.25 5.25-5.25"
            pathLength="1"
          />
        </svg>
      </span>
    </span>
  );
}

export function ProgressExperience() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const startedSteps = useRef(new Set<number>());
  const completedSteps = useRef(new Set<number>());
  const analysisCompleted = useRef(false);

  useEffect(() => {
    let animationFrame = 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animationFrame = requestAnimationFrame(() => setProgress(100));
      return () => cancelAnimationFrame(animationFrame);
    }

    const startedAt = performance.now();

    function update(now: number) {
      const nextProgress = Math.min(100, ((now - startedAt) / durationMs) * 100);

      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrame = requestAnimationFrame(update);
      }
    }

    animationFrame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    const startThresholds = [0, 34, 68];
    const completeThresholds = [34, 68, 100];

    startThresholds.forEach((threshold, index) => {
      const stepNumber = index + 1;

      if (progress >= threshold && !startedSteps.current.has(stepNumber)) {
        startedSteps.current.add(stepNumber);
        trackAmplitudeEvent(`quiz_progress_stage_${stepNumber}_started`);
      }
    });

    completeThresholds.forEach((threshold, index) => {
      const stepNumber = index + 1;

      if (progress >= threshold && !completedSteps.current.has(stepNumber)) {
        completedSteps.current.add(stepNumber);
        trackAmplitudeEvent(`quiz_progress_stage_${stepNumber}_completed`);
      }
    });

    if (progress === 100 && !analysisCompleted.current) {
      analysisCompleted.current = true;
      trackAmplitudeEvent("quiz_progress_completed");
    }
  }, [progress]);

  const progressOffset = useMemo(
    () => circumference * (1 - progress / 100),
    [progress],
  );
  const isComplete = progress === 100;
  const displayedProgress = Math.round(progress);

  function handleContinue() {
    let destination = "/results";

    try {
      const result = calculateQuizResult(sessionStorage);

      if (result.answeredCount === 6) {
        saveQuizResult(sessionStorage, result);
        destination = getResultsRoute(result.severity);
      }
    } catch {
      // Fall back to the green results screen when storage is unavailable.
    }

    router.push(destination);
  }

  return (
    <div className={styles.progressScreen}>
      <Link
        className={styles.backLink}
        data-amplitude-event="quiz_progress_back_clicked"
        href="/quiz/device-security"
      >
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="m9.75 3.5-4.5 4.5 4.5 4.5M5.5 8h7"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back
      </Link>

      <div className={styles.content}>
        <section className={styles.intro} aria-labelledby="progress-title">
          <p className={styles.eyebrow}>Turning answers into next steps</p>
          <h1 id="progress-title">
            Finding what
            <br />
            matters for you
          </h1>
          <p className={styles.description}>
            We’re reviewing your habits to highlight where
            <br />a small change could make a difference.
          </p>
        </section>

        <div
          className={styles.progressMeter}
          role="progressbar"
          aria-label="Preparing your privacy snapshot"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={displayedProgress}
        >
          <svg aria-hidden="true" viewBox="0 0 136 136">
            <circle className={styles.progressTrack} cx="68" cy="68" r={radius} />
            <circle
              className={styles.progressValue}
              cx="68"
              cy="68"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
            />
          </svg>
          <span className={styles.percentage}>{displayedProgress}%</span>
        </div>

        <ol className={styles.steps} aria-label="Analysis steps">
          {steps.map((step, index) => {
            const status = getStepStatus(index, progress);

            return (
              <li
                className={`${styles.step} ${
                  status === "complete"
                    ? styles.stepComplete
                    : status === "loading"
                      ? styles.stepLoading
                      : ""
                }`}
                key={step}
              >
                <StepIcon index={index} status={status} />
                <span>{step}</span>
              </li>
            );
          })}
        </ol>

        <div className={styles.bottom}>
          <div className={styles.actions}>
            <button
              aria-label={
                isComplete
                  ? "Continue to my snapshot"
                  : "Preparing your snapshot"
              }
              className={`${styles.continueButton} ${
                isComplete ? styles.continueButtonReady : ""
              }`}
              data-amplitude-event="quiz_progress_continue_clicked"
              disabled={!isComplete}
              onClick={handleContinue}
              type="button"
            >
              <span
                aria-hidden="true"
                className={`${styles.buttonLabel} ${styles.preparingLabel}`}
              >
                Preparing your snapshot…
              </span>
              <span
                aria-hidden="true"
                className={`${styles.buttonLabel} ${styles.readyLabel}`}
              >
                Continue to my snapshot
              </span>
            </button>
            <p className={styles.supportingNote}>
              Based on your six answers.
              <br />
              No access to your device or browsing history.
            </p>
          </div>

          <footer className={styles.footer}>
            <p>© VEIL, Inc. 2026 – All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
