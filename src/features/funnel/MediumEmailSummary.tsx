"use client";

import { useSyncExternalStore } from "react";

import styles from "@/app/results/page.module.css";
import { readSavedQuizResult } from "@/lib/funnel/quiz-result";

const subscribe = () => () => undefined;

function getIncorrectCount(defaultCount: number) {
  try {
    return readSavedQuizResult(sessionStorage)?.incorrectCount ?? defaultCount;
  } catch {
    return defaultCount;
  }
}

function useIncorrectCount(defaultCount: number) {
  return useSyncExternalStore(
    subscribe,
    () => getIncorrectCount(defaultCount),
    () => defaultCount,
  );
}

export function RiskEmailHeading({ defaultIncorrectCount = 3 }: Readonly<{ defaultIncorrectCount?: number }>) {
  const incorrectCount = useIncorrectCount(defaultIncorrectCount);

  return (
    <h1>
      <span>{incorrectCount} potential privacy {incorrectCount === 1 ? "gap" : "gaps"}</span> worth a closer look
    </h1>
  );
}

export function RiskEmailPositiveCount({ defaultIncorrectCount = 3 }: Readonly<{ defaultIncorrectCount?: number }>) {
  const positiveCount = 6 - useIncorrectCount(defaultIncorrectCount);

  return (
    <p className={styles.greenScore}>
      <strong>{positiveCount}</strong><span>/6</span> habits already covered
    </p>
  );
}
