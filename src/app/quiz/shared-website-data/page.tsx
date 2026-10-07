import type { Metadata } from "next";

import { BrowsingFollowUpPage } from "@/features/funnel/BrowsingFollowUpPage";

export const metadata: Metadata = {
  title: "Shared website data",
  description: "Question 2 of the Security White privacy habits quiz.",
};

const answers = [
  {
    id: "deleted",
    label: "It is deleted from the website too",
  },
  {
    id: "website-keeps-it",
    label: "The website may still keep it",
  },
  {
    id: "not-sure",
    label: "I’m not sure",
  },
] as const;

export default function SharedWebsiteDataPage() {
  return (
    <BrowsingFollowUpPage
      answers={answers}
      formName="shared-website-data"
      hint="Think about information the website has already received."
      question="When you close a private tab, what happens to data already shared with a website?"
      screenId="shared-website-data"
      storageKey="security-white.answers.shared-website-data"
    />
  );
}
