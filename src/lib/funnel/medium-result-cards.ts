import type { QuizQuestionOutcome } from "./quiz-result";

type ResultCardCopy = Readonly<{
  key: string;
  icon: "password" | "permissions" | "wifi" | "account" | "updates" | "browsing";
  label: string;
  riskTitle: string;
  riskDescription: string;
  strengthDescription: string;
}>;

export type MediumResultCard = ResultCardCopy & Readonly<{ isCorrect: boolean }>;

const cards: Record<string, ResultCardCopy> = {
  password: {
    key: "security-white.answers.account-security",
    icon: "password",
    label: "Password Security",
    riskTitle: "One reused password could put multiple accounts at risk",
    riskDescription:
      "If a reused password is exposed in a data breach, someone could try it on your other accounts. Use a unique password for every account to reduce this risk.",
    strengthDescription:
      "You know how to create strong passwords and keep your accounts secure.",
  },
  permissions: {
    key: "security-white.answers.app-permissions",
    icon: "permissions",
    label: "App Permissions",
    riskTitle: "Your apps may have more access than they need",
    riskDescription:
      "Some apps may have access to your location, photos, or microphone even when it's unnecessary. Review your permissions and limit access to personal data.",
    strengthDescription: "You're thoughtful about what apps can access.",
  },
  wifi: {
    key: "security-white.answers.network-privacy",
    icon: "wifi",
    label: "Public Wi-Fi",
    riskTitle: "Unfamiliar Wi-Fi networks could put your privacy at risk",
    riskDescription:
      "Fake or unsecured networks can expose your online activity to additional risks. Avoid connecting automatically, verify network names, and use mobile data when unsure.",
    strengthDescription:
      "You're wisely choosing how to connect to public networks.",
  },
  privateSignIn: {
    key: "security-white.answers.private-mode-sign-in",
    icon: "browsing",
    label: "Private Browsing Sign-in",
    riskTitle: "Signing in still lets websites recognize your account",
    riskDescription:
      "A private window does not hide which account you use after signing in. Websites can still recognize your account and activity on their services.",
    strengthDescription:
      "You know that websites can recognize your account after you sign in, even in private mode.",
  },
  account: {
    key: "security-white.answers.two-factor-auth",
    icon: "account",
    label: "Account Protection",
    riskTitle: "A stolen password could put your accounts at risk",
    riskDescription:
      "Without extra sign-in protection, someone who obtains your password may be able to access your account. Enable an authenticator app, security key, or passkey where available.",
    strengthDescription:
      "You understand how to protect your accounts from unauthorized access.",
  },
  updates: {
    key: "security-white.answers.device-security",
    icon: "updates",
    label: "Software Updates",
    riskTitle: "Outdated software could leave security weaknesses unfixed",
    riskDescription:
      "Delaying updates may leave known vulnerabilities unpatched. Turn on automatic updates or install security fixes promptly to help protect your devices.",
    strengthDescription: "You're keeping your software up to date.",
  },
  browsing: {
    key: "security-white.answers.browsing-habits",
    icon: "browsing",
    label: "Private Browsing",
    riskTitle: "Private mode doesn't make your activity invisible",
    riskDescription:
      "Incognito mode doesn't hide everything you do online. Websites and internet providers may still see parts of your activity. Understand its limits and use additional privacy tools when appropriate.",
    strengthDescription: "You understand the limits of private browsing.",
  },
};

export function getMediumResultCards(outcomes: readonly QuizQuestionOutcome[]) {
  const byKey = new Map(outcomes.map((outcome) => [outcome.key, outcome]));
  const secondQuestion = byKey.has(cards.wifi.key) ? cards.wifi : cards.privateSignIn;

  return [
    cards.password,
    cards.permissions,
    secondQuestion,
    cards.account,
    cards.updates,
    cards.browsing,
  ].flatMap((card) => {
    const isCorrect = byKey.get(card.key)?.isCorrect;
    return isCorrect === null || isCorrect === undefined
      ? []
      : [{ ...card, isCorrect }];
  });
}
