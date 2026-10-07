import type { Metadata } from "next";

import { BrowsingFollowUpPage } from "@/features/funnel/BrowsingFollowUpPage";

export const metadata: Metadata = {
  title: "Private mode sign-in",
  description: "Question 2 of the Security White privacy habits quiz.",
};

const answers = [
  {
    id: "recognised",
    label: "Yes, signing in lets the website recognise you",
  },
  {
    id: "anonymous",
    label: "No, private mode keeps me completely anonymous",
  },
  {
    id: "not-sure",
    label: "I’m not sure",
  },
] as const;

export default function PrivateModeSignInPage() {
  return (
    <BrowsingFollowUpPage
      answers={answers}
      formName="private-mode-sign-in"
      hint="For example, if you sign in while using private mode."
      question="Can a website recognise you if you sign in while using private mode?"
      screenId="private-mode-sign-in"
      storageKey="security-white.answers.private-mode-sign-in"
    />
  );
}
