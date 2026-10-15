import Image from "next/image";

import type { RiskResultCard } from "@/lib/funnel/risk-result-cards";

type Habit = RiskResultCard["icon"];
type Tone = "green" | "medium" | "red";

export function ResultHabitIcon({ name, tone }: Readonly<{ name: Habit; tone: Tone }>) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      height={28}
      src={`/icons/results/${tone}-${name}.svg`}
      width={28}
    />
  );
}
