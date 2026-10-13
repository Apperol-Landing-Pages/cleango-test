import styles from "@/app/quiz/browsing-habits/page.module.css";

const privacyPolicyUrl = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL?.trim();
const termsOfUseUrl = process.env.NEXT_PUBLIC_TERMS_OF_USE_URL?.trim();

export function QuestionFooter() {
  return (
    <footer className={`${styles.footer} ${styles.footerPinned}`}>
      <button className={styles.continueButton} type="submit">
        Continue
      </button>
      <p className={styles.legalLinks}>
        {privacyPolicyUrl ? (
          <a href={privacyPolicyUrl}>Privacy Policy</a>
        ) : (
          <span>Privacy Policy</span>
        )}
        {" & "}
        {termsOfUseUrl ? (
          <a href={termsOfUseUrl}>Terms of Use</a>
        ) : (
          <span>Terms of Use</span>
        )}
      </p>
      <p className={styles.copyright}>
        © Veylo, Inc. 2026 - All rights reserved.
      </p>
    </footer>
  );
}
