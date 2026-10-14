import { getSecondQuestion } from "./second-question";

export type ResultSeverity = "green" | "medium" | "red";

export type QuizResult = Readonly<{
  answeredCount: number;
  incorrectCount: number;
  severity: ResultSeverity;
}>;

type StorageReader = Pick<Storage, "getItem">;
type StorageWriter = Pick<Storage, "setItem">;

const resultCountKey = "security-white.result.incorrect-count";
const resultSeverityKey = "security-white.result.severity";

const firstQuestionKey = "security-white.answers.browsing-habits";

const commonQuestions = [
  {
    key: "security-white.answers.account-security",
    correctAnswer: "all-unique",
  },
  {
    key: "security-white.answers.two-factor-auth",
    correctAnswer: "important-accounts-covered",
  },
  {
    key: "security-white.answers.app-permissions",
    correctAnswer: "only-necessary",
  },
  {
    key: "security-white.answers.device-security",
    correctAnswer: "promptly",
  },
] as const;

export type QuizQuestionOutcome = Readonly<{
  key: string;
  answer: string | null;
  correctAnswer: string;
  isCorrect: boolean | null;
}>;

export function readQuizQuestionOutcomes(storage: StorageReader): QuizQuestionOutcome[] {
  const firstAnswer = storage.getItem(firstQuestionKey);
  const questions: Array<Readonly<{ key: string; correctAnswer: string }>> = [
    { key: firstQuestionKey, correctAnswer: "local-history" },
  ];

  const followUp = getSecondQuestion(firstAnswer);

  if (followUp) {
    questions.push({
      key: followUp.storageKey,
      correctAnswer: followUp.correctAnswer,
    });
  }

  questions.push(...commonQuestions);

  return questions.map(({ key, correctAnswer }) => {
    const answer = storage.getItem(key);

    return {
      key,
      answer,
      correctAnswer,
      isCorrect: answer === null ? null : answer === correctAnswer,
    };
  });
}

export function getResultSeverity(incorrectCount: number): ResultSeverity {
  if (incorrectCount === 0) {
    return "green";
  }

  if (incorrectCount <= 3) {
    return "medium";
  }

  return "red";
}

export function calculateQuizResult(storage: StorageReader): QuizResult {
  const outcomes = readQuizQuestionOutcomes(storage);
  const answeredCount = outcomes.filter((outcome) => outcome.isCorrect !== null).length;
  const incorrectCount = outcomes.filter((outcome) => outcome.isCorrect === false).length;

  return {
    answeredCount,
    incorrectCount,
    severity: getResultSeverity(incorrectCount),
  };
}

export function saveQuizResult(storage: StorageWriter, result: QuizResult) {
  storage.setItem(resultCountKey, String(result.incorrectCount));
  storage.setItem(resultSeverityKey, result.severity);
}

export function readSavedQuizResult(storage: StorageReader): QuizResult | null {
  const storedCount = storage.getItem(resultCountKey);
  const incorrectCount = storedCount === null ? Number.NaN : Number(storedCount);

  if (
    !Number.isInteger(incorrectCount) ||
    incorrectCount < 0 ||
    incorrectCount > 6
  ) {
    return null;
  }

  return {
    answeredCount: 6,
    incorrectCount,
    severity: getResultSeverity(incorrectCount),
  };
}

export function getResultsRoute(severity: ResultSeverity) {
  return severity === "green" ? "/results" : `/results/${severity}`;
}

export function getSnapshotRoute(severity: ResultSeverity) {
  return severity === "green" ? "/results/snapshot" : `/results/snapshot/${severity}`;
}
