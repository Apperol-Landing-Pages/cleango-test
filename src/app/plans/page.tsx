import type { Metadata } from "next";

import { FunnelScreen } from "@/components/funnel/FunnelScreen";
import { PlansExperience } from "@/features/funnel/PlansExperience";

export const metadata: Metadata = {
  title: "Choose your privacy plan",
};

export default function PlansPage() {
  return (
    <FunnelScreen screenId="plans">
      <PlansExperience />
    </FunnelScreen>
  );
}
