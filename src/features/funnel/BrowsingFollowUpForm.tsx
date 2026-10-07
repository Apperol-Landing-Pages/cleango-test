"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import styles from "@/app/quiz/browsing-habits/page.module.css";

type FollowUpAnswer = Readonly<{
  id: string;
  label: string;
}>;

type BrowsingFollowUpFormProps = Readonly<{
  answers: readonly FollowUpAnswer[];
  formName: string;
  storageKey: string;
}>;

export function BrowsingFollowUpForm({
  answers,
  formName,
  storageKey,
}: BrowsingFollowUpFormProps) {
  const router = useRouter();
  const eventPrefix = `quiz_${formName.replaceAll("-", "_")}`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const selectedAnswer = new FormData(event.currentTarget).get(formName);

    if (typeof selectedAnswer !== "string") {
      return;
    }

    try {
      sessionStorage.setItem(storageKey, selectedAnswer);
    } catch {
      // The funnel still works when browser storage is unavailable.
    }

    router.push("/quiz/account-security");
  }

  return (
    <form
      className={styles.questionForm}
      action="/quiz/account-security"
      data-amplitude-submit-event={`${eventPrefix}_continue_clicked`}
      onSubmit={handleSubmit}
    >
      <fieldset className={styles.options}>
        <legend className={styles.visuallyHidden}>Choose one answer</legend>
        {answers.map((answer, index) => (
          <label className={styles.option} key={answer.id}>
            <span>{answer.label}</span>
            <input
              data-amplitude-change-event={`${eventPrefix}_option_${index + 1}_selected`}
              type="radio"
              name={formName}
              value={answer.id}
              required
            />
          </label>
        ))}
      </fieldset>

      <div className={styles.formBottom}>
        <div className={styles.formActions}>
          <button className={styles.continueButton} type="submit">
            Continue
          </button>
          <p className={styles.privacyNote}>
            No scans. No browsing history. Just the answers you choose.
          </p>
        </div>

        <footer className={styles.footer}>
          <p>© VEIL, Inc. 2026 – All rights reserved.</p>
        </footer>
      </div>
    </form>
  );
}
