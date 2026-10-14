import Image from "next/image";

import type { MediumResultCard } from "@/lib/funnel/medium-result-cards";

type Habit = MediumResultCard["icon"];
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
