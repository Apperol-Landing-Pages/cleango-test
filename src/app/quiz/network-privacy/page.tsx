import type { Metadata } from "next";

import { SecondQuestionPage } from "@/features/funnel/SecondQuestionPage";

export const metadata: Metadata = {
  title: "Network privacy",
  description: "Question 2 of the Security White privacy habits quiz.",
};

const answers = [
  { id: "automatic", label: "I connect automatically when Wi-Fi is available" },
  { id: "check-network-name", label: "I check the network before connecting" },
  { id: "mobile-connection", label: "I usually use my mobile data instead" },
] as const;

export default function NetworkPrivacyPage() {
  return (
    <SecondQuestionPage
      analyticsScreenName="quiz_screen21"
      answers={answers}
      category="Network privacy"
      formName="network-privacy"
      hint="Think about how you connect at cafés, hotels, and airports."
      question="Could your public Wi-Fi habits expose your activity?"
      screenId="network-privacy"
      storageKey="security-white.answers.network-privacy"
    />
  );
}
