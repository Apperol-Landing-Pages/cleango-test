export const secondQuestionByFirstAnswer = {
  "local-history": {
    pathname: "/quiz/network-privacy",
    storageKey: "security-white.answers.network-privacy",
    correctAnswer: "mobile-connection",
  },
  "websites-and-provider": {
    pathname: "/quiz/private-mode-sign-in",
    storageKey: "security-white.answers.private-mode-sign-in",
    correctAnswer: "recognised",
  },
  "everything-online": {
    pathname: "/quiz/private-mode-sign-in",
    storageKey: "security-white.answers.private-mode-sign-in",
    correctAnswer: "recognised",
  },
  "not-sure": {
    pathname: "/quiz/private-mode-sign-in",
    storageKey: "security-white.answers.private-mode-sign-in",
    correctAnswer: "recognised",
  },
} as const;

export function getSecondQuestion(firstAnswer: string | null) {
  if (
    !firstAnswer ||
    !Object.prototype.hasOwnProperty.call(
      secondQuestionByFirstAnswer,
      firstAnswer,
    )
  ) {
    return null;
  }

  return secondQuestionByFirstAnswer[
    firstAnswer as keyof typeof secondQuestionByFirstAnswer
  ];
}
