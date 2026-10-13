import type { Metadata } from "next";

import { SecondQuestionPage } from "@/features/funnel/SecondQuestionPage";

export const metadata: Metadata = {
  title: "Browsing privacy",
  description: "Question 2 of the Security White privacy habits quiz.",
};

const answers = [
  { id: "recognised", label: "Yes, the website can recognize my account" },
  { id: "anonymous", label: "No, private mode makes me anonymous" },
  { id: "not-sure", label: "I’m not sure" },
] as const;

export default function PrivateModeSignInPage() {
  return (
    <SecondQuestionPage
      analyticsScreenName="quiz_screen22"
      answers={answers}
      category="Browsing privacy"
      formName="private-mode-sign-in"
      hint="What happens when you sign in to an account using a private window?"
      question="Can websites still identify you in private mode?"
      screenId="private-mode-sign-in"
      storageKey="security-white.answers.private-mode-sign-in"
    />
  );
}
