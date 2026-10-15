import type { Metadata } from "next";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { RiskSnapshotExperience } from "@/features/funnel/RiskSnapshotExperience";

export const metadata: Metadata = {
  title: "Your privacy snapshot",
};

export default function RedPrivacySnapshotPage() {
  return (
    <FunnelScreen screenId="privacy-snapshot-red">
      <RiskSnapshotExperience tone="red" />
    </FunnelScreen>
  );
}
