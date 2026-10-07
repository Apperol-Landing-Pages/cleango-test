"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";

import baseStyles from "@/app/results/snapshot/page.module.css";
import entryStyles from "@/app/results/page.module.css";
import { readSavedQuizResult } from "@/lib/funnel/quiz-result";

type ResultVariant = "lite" | "medium" | "red";

const defaultCounts: Record<ResultVariant, number> = {
  lite: 1,
  medium: 3,
  red: 5,
};

function useIncorrectCount(defaultCount: number) {
  return useSyncExternalStore(
    () => () => undefined,
    () => {
      try {
        return readSavedQuizResult(sessionStorage)?.incorrectCount ?? defaultCount;
      } catch {
        return defaultCount;
      }
    },
    () => defaultCount,
  );
}

type QuizResultScoreProps = Readonly<{
  activeColor: string;
  ariaLabel: string;
  defaultIncorrectCount: number;
  inactiveColor: string;
  indicatorIcon?: string;
  indicatorWidth?: number;
  scoreClassName?: string;
}>;

export function QuizResultScore({
  activeColor,
  ariaLabel,
  defaultIncorrectCount,
  inactiveColor,
  indicatorIcon,
  indicatorWidth = 23,
  scoreClassName,
}: QuizResultScoreProps) {
  const incorrectCount = useIncorrectCount(defaultIncorrectCount);
  const strongCount = 6 - incorrectCount;

  return (
    <div className={baseStyles.scoreArea}>
      <div className={baseStyles.scores}>
        <div className={baseStyles.score}>
          <p className={`${baseStyles.scoreNumber} ${scoreClassName ?? ""}`}>
            {incorrectCount}
            {indicatorIcon ? (
              <Image
                alt=""
                aria-hidden="true"
                className={baseStyles.scoreIndicator}
                height={22}
                priority
                src={indicatorIcon}
                width={indicatorWidth}
              />
            ) : null}
          </p>
          <p className={baseStyles.scoreLabel}>areas to improve</p>
        </div>
        <div className={baseStyles.scoreDivider} aria-hidden="true" />
        <div className={baseStyles.score}>
          <p className={baseStyles.scoreNumber}>
            {strongCount} <span>/6</span>
          </p>
          <p className={baseStyles.scoreLabel}>strong habits</p>
        </div>
      </div>

      <div className={baseStyles.risk} aria-label={ariaLabel}>
        <div className={baseStyles.riskTrack} aria-hidden="true">
          {Array.from({ length: 6 }, (_, index) => (
            <span
              key={index}
              style={{ background: index < incorrectCount ? activeColor : inactiveColor }}
            />
          ))}
        </div>
        <div className={baseStyles.riskLabels}>
          <span>Low risk</span>
          <span>High risk</span>
        </div>
      </div>
    </div>
  );
}

export function QuizResultEntrySummary({ variant }: Readonly<{ variant: ResultVariant }>) {
  const incorrectCount = useIncorrectCount(defaultCounts[variant]);

  const resultText =
    variant === "lite"
      ? `${incorrectCount} ${incorrectCount === 1 ? "gap" : "gaps"} to close.`
      : variant === "medium"
        ? `${incorrectCount} potential privacy gaps.`
        : `${incorrectCount} of 6 habits leave gaps.`;

  return (
    <p className={entryStyles.summary}>
      Your answers revealed:
      <br />
      <strong>{resultText}</strong>
    </p>
  );
}

export function QuizResultSnapshotHeading({
  id,
  variant,
}: Readonly<{ id: string; variant: ResultVariant }>) {
  const incorrectCount = useIncorrectCount(defaultCounts[variant]);

  if (variant === "lite") {
    return (
      <h1 id={id}>
        Strong habits.
        <span>
          {incorrectCount} {incorrectCount === 1 ? "thing" : "things"} to tighten.
        </span>
      </h1>
    );
  }

  if (variant === "medium") {
    return (
      <h1 id={id}>
        We found {incorrectCount} potential
        <span>privacy gaps.</span>
      </h1>
    );
  }

  return (
    <h1 id={id}>
      We found <span>{incorrectCount} privacy<br />gaps.</span>
    </h1>
  );
}
