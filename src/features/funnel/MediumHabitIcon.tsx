import type { MediumResultCard } from "@/lib/funnel/medium-result-cards";

export function MediumHabitIcon({ name }: Readonly<{ name: MediumResultCard["icon"] }>) {
  return (
    <svg aria-hidden="true" fill="none" height="24" viewBox="0 0 32 32" width="24">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
        {name === "password" ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="m15 15 8.5 8.5M20.7 20.7l2-2M18.2 18.2l2-2" />
          </>
        ) : null}
        {name === "permissions" ? (
          <>
            <path d="M9 11h3m4 0h7M9 16h8m4 0h2M9 21h3m4 0h7" />
            <circle cx="14" cy="11" r="2" />
            <circle cx="19" cy="16" r="2" />
            <circle cx="14" cy="21" r="2" />
          </>
        ) : null}
        {name === "wifi" ? (
          <>
            <path d="M8 12.5a12 12 0 0 1 16 0M10.7 15.5a8 8 0 0 1 10.6 0M13.4 18.5a4 4 0 0 1 5.2 0" />
            <circle cx="16" cy="22" r=".7" fill="currentColor" stroke="none" />
          </>
        ) : null}
        {name === "account" ? (
          <>
            <path d="M16 7.5 23 10v5.2c0 4.1-2.8 7-7 9.3-4.2-2.3-7-5.2-7-9.3V10l7-2.5Z" />
            <path d="m12.5 15.8 2.3 2.3 4.7-4.7" />
          </>
        ) : null}
        {name === "updates" ? (
          <>
            <path d="M23.2 13a7.5 7.5 0 0 0-12.3-2.5L8 13m5 0H8V8M8.8 19a7.5 7.5 0 0 0 12.3 2.5L24 19m-5 0h5v5" />
          </>
        ) : null}
        {name === "browsing" ? (
          <>
            <path d="M5 16c2.7-4.3 6.4-6.5 11-6.5s8.3 2.2 11 6.5c-2.7 4.3-6.4 6.5-11 6.5S7.7 20.3 5 16Z" />
            <circle cx="16" cy="16" r="3" />
            <path d="M6 6 26 26" strokeWidth="2.2" />
          </>
        ) : null}
      </g>
    </svg>
  );
}
