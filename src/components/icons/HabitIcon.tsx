import type { ReactNode } from "react";

import styles from "./HabitIcon.module.css";

export type HabitIconName =
  | "globe"
  | "wifi"
  | "key"
  | "shield"
  | "sliders"
  | "refresh";

type HabitIconProps = Readonly<{
  name: HabitIconName;
}>;

const paths: Record<HabitIconName, ReactNode> = {
  globe: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.1 2.2 3.2 4.9 3.2 8s-1.1 5.8-3.2 8M12 4c-2.1 2.2-3.2 4.9-3.2 8s1.1 5.8 3.2 8" />
    </>
  ),
  wifi: (
    <>
      <path d="M4.9 9.2a11.1 11.1 0 0 1 14.2 0M7.8 12.3a6.7 6.7 0 0 1 8.4 0M10.5 15.4a2.4 2.4 0 0 1 3 0" />
      <circle cx="12" cy="18" r=".7" fill="currentColor" stroke="none" />
    </>
  ),
  key: (
    <>
      <circle cx="8.5" cy="9" r="4.5" />
      <path d="m12 12.3 7 7M15.1 15.4l1.7-1.7M17.2 17.5l1.7-1.7" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 19 6v5.2c0 4.4-2.8 7.7-7 9.6-4.2-1.9-7-5.2-7-9.6V6l7-2.8Z" />
      <path d="m8.8 12 2.1 2.1 4.4-4.4" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 7h4M12 7h8M4 12h10M18 12h2M4 17h7M15 17h5" />
      <circle cx="10" cy="7" r="2" />
      <circle cx="16" cy="12" r="2" />
      <circle cx="13" cy="17" r="2" />
    </>
  ),
  refresh: (
    <>
      <path d="M19 8V4l-1.8 1.8A8 8 0 0 0 4.8 8M5 16v4l1.8-1.8A8 8 0 0 0 19.2 16" />
      <path d="M15.8 4H19v3.2M8.2 20H5v-3.2" />
    </>
  ),
};

export function HabitIcon({ name }: HabitIconProps) {
  return (
    <span className={styles.icon} aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths[name]}
      </svg>
    </span>
  );
}
