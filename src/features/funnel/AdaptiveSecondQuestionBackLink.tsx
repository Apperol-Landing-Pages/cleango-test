"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

import styles from "@/app/quiz/browsing-habits/page.module.css";

const previousRoutes = {
  "local-history": "/quiz/network-privacy",
  "websites-and-provider": "/quiz/shared-website-data",
  "not-sure": "/quiz/private-mode-sign-in",
} as const;

export function AdaptiveSecondQuestionBackLink() {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    try {
      const answer = sessionStorage.getItem(
        "security-white.answers.browsing-habits",
      );

      if (answer && answer in previousRoutes) {
        event.preventDefault();
        router.push(previousRoutes[answer as keyof typeof previousRoutes]);
      }
    } catch {
      // Keep the default route when browser storage is unavailable.
    }
  }

  return (
    <Link
      className={styles.backLink}
      data-amplitude-event="quiz_back_button_clicked"
      data-amplitude-screen-name="quiz_screen3"
      href="/quiz/network-privacy"
      onClick={handleClick}
    >
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="m9.75 3.5-4.5 4.5 4.5 4.5M5.5 8h7"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back
    </Link>
  );
}
