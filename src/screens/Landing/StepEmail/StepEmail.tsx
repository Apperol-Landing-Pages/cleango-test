"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, ChangeEvent, MouseEvent } from "react";
import cx from "clsx";

import { ROUTER_ENDPOINTS } from "@/utils/constants";
import { useValidators } from "@/utils/useValidators";

import LandingHeader from "../shared/LandingHeader/LandingHeader";
import LandingFooter from "../shared/LandingFooter/LandingFooter";

import TrustedImg from "./images/trustedImg.png";

import s from "./StepEmail.module.scss";

const EMAILS_HINTS = [
  { id: 1, title: "@gmail.com" },
  { id: 2, title: "@yahoo.com" },
  { id: 3, title: "@hotmail.com" },
  { id: 4, title: "@outlook.com" },
  { id: 5, title: "@icloud.com" },
];
const EMAIL_LENGTH_TO_SHOW_HINTS = 3;
const EMAIL_DOMAIN_REGEXP = /@[^:]*/;

const StepEmail = () => {
  const router = useRouter();
  const { validateEmail } = useValidators();
  const [errorMessageAskEmail, setErrorMessageAskEmail] = useState({
    text: "",
  });
  const [currentEmailValue, setCurrentEmailValue] = useState("");
  const [isDirtyAskEmail, setIsDirtyAskEmail] = useState(false);
  const showEmailHints =
    currentEmailValue.length >= EMAIL_LENGTH_TO_SHOW_HINTS;

  const runValidator = (email: string) => {
    const validationResult = validateEmail(email);

    if (validationResult.message !== errorMessageAskEmail.text) {
      setErrorMessageAskEmail({ text: validationResult.message });
    }
    setCurrentEmailValue(email);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    runValidator(e.target.value);
  };

  const handleContinue = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsDirtyAskEmail(true);

    const validationResult = validateEmail(currentEmailValue);

    if (!validationResult.isValid) {
      setErrorMessageAskEmail({ text: validationResult.message });
      return;
    }

    router.push(ROUTER_ENDPOINTS.LANDING_PREMIUM);
  };

  const addEmailHint = (emailHint: string) => {
    let newEmail = currentEmailValue;

    if (EMAIL_DOMAIN_REGEXP.test(currentEmailValue)) {
      newEmail = currentEmailValue.replace(EMAIL_DOMAIN_REGEXP, emailHint);
    } else {
      newEmail += emailHint;
    }

    runValidator(newEmail);
    setCurrentEmailValue(newEmail);
  };

  return (
    <div className={s.page}>
      <LandingHeader logoHref={ROUTER_ENDPOINTS.LANDING} />

      <main className={s.main}>
        <Image src={TrustedImg} alt="Trusted by" width={147} height={60} />
        <h1 className={s.title}>Enter your Email, protect your device!</h1>

        <div className={s.fieldContainer}>
          <input
            id="email"
            type="email"
            aria-label={"email"}
            name="email"
            value={currentEmailValue}
            onChange={handleChangeEmail}
            placeholder={"Enter your email"}
            className={cx({
              [s.invalid]: isDirtyAskEmail && errorMessageAskEmail.text,
            })}
          />

          <div className={s.errorMessage}>
            {isDirtyAskEmail ? errorMessageAskEmail.text : ""}
          </div>
        </div>
        {showEmailHints && (
          <ul className={s.emailHints}>
            {EMAILS_HINTS.map(({ id, title }) => {
              return (
                <li
                  className={s.emailHintsItem}
                  key={id}
                  onClick={() => addEmailHint(title)}
                >
                  {title}
                </li>
              );
            })}
          </ul>
        )}

        <button className={s.continueBtn} onClick={handleContinue}>
          Continue
        </button>
        <div className={s.secureWrap}>
          <svg
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.606 0.0808895C7.7305 0.0275197 7.86454 0 8 0C8.13546 0 8.2695 0.0275197 8.394 0.0808895L14.788 2.82189C15.1478 2.97615 15.4545 3.23262 15.6699 3.55953C15.8854 3.88643 16.0002 4.26938 16 4.66089V11.5209C15.9999 12.7548 15.6736 13.9668 15.0542 15.034C14.4348 16.1012 13.5443 16.9857 12.473 17.5979L8.496 19.8699C8.34494 19.9562 8.17397 20.0016 8 20.0016C7.82603 20.0016 7.65506 19.9562 7.504 19.8699L3.527 17.5979C2.45537 16.9855 1.5647 16.1007 0.945292 15.0331C0.325886 13.9655 -0.000231496 12.7531 1.23291e-07 11.5189V4.66089C4.3344e-05 4.26955 0.114896 3.88682 0.33033 3.56011C0.545765 3.2334 0.852313 2.97708 1.212 2.82289L7.606 0.0808895ZM11.707 8.70789C11.8892 8.51929 11.99 8.26669 11.9877 8.00449C11.9854 7.74229 11.8802 7.49148 11.6948 7.30607C11.5094 7.12066 11.2586 7.01549 10.9964 7.01322C10.7342 7.01094 10.4816 7.11173 10.293 7.29389L7 10.5869L5.707 9.29389C5.5184 9.11173 5.2658 9.01094 5.0036 9.01322C4.7414 9.01549 4.49059 9.12066 4.30518 9.30607C4.11977 9.49148 4.0146 9.74229 4.01233 10.0045C4.01005 10.2667 4.11084 10.5193 4.293 10.7079L6.293 12.7079C6.48053 12.8954 6.73484 13.0007 7 13.0007C7.26516 13.0007 7.51947 12.8954 7.707 12.7079L11.707 8.70789Z"
              fill="#0BBC23"
            />
          </svg>
          100% Private & Secure
        </div>
      </main>

      <LandingFooter />
    </div>
  );
};

export default StepEmail;
