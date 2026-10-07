import type { Metadata } from "next";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { ProgressExperience } from "@/features/funnel/ProgressExperience";

export const metadata: Metadata = {
  title: "Preparing your results",
};

export default function ProgressPage() {
  return (
    <FunnelScreen screenId="progress">
      <ProgressExperience />
    </FunnelScreen>
  );
}
