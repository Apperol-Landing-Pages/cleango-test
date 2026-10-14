import type { Metadata } from "next";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { ConfirmationExperience } from "@/features/funnel/ConfirmationExperience";

export const metadata: Metadata = {
  title: "Payment confirmation",
};

export default function ConfirmationPage() {
  return (
    <FunnelScreen screenId="confirmation">
      <ConfirmationExperience />
    </FunnelScreen>
  );
}
