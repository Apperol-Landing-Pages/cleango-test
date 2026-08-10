"use client";

import Link from "next/link";
import { ROUTER_ENDPOINTS } from "@/utils/constants";
import LandingHeader from "../shared/LandingHeader/LandingHeader";
import LandingFooter from "../shared/LandingFooter/LandingFooter";
import {
  CheckIcon,
  FEATURES,
  PhoneMockup,
} from "../shared/whiteLandingContent";
import s from "./WhiteLanding.module.scss";

const PROTECTION_STEPS = [
  {
    title: "Complete a quick setup",
    text: "Answer a few questions to personalize your protection",
  },
  {
    title: "Protect your device",
    text: "Aurex will scan for threats and activate real-time security",
  },
  {
    title: "Enjoy peace of mind",
    text: "Stay safe from malware, phishing, and unwanted trackers",
  },
] as const;

const SupportIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M16 34v-5c0-9 7.2-16 16-16s16 7 16 16v5"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <rect x="11" y="31" width="10" height="19" rx="5" stroke="currentColor" strokeWidth="4" />
    <rect x="43" y="31" width="10" height="19" rx="5" stroke="currentColor" strokeWidth="4" />
    <path d="M48 48c-2.3 4.7-7.2 7-14.5 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <circle cx="30.5" cy="55" r="3" fill="currentColor" />
  </svg>
);

const WhiteLanding = () => {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className={s.page}>
      <LandingHeader
        logoHref="#"
        onLogoClick={scrollToTop}
        contactHref="https://app-support-web.com/"
      />

      <section className={s.hero}>
        <PhoneMockup />
        <h1 className={s.heroTitle}>
          Easily safeguard your
          <br />
          digital world
        </h1>
        <div className={s.heroCta}>
          <Link href={ROUTER_ENDPOINTS.LANDING_SCAN} className={s.primaryBtn}>
            Get Started
          </Link>
          <p className={s.secureBadge}>
            <CheckIcon />
            100% Private &amp; Secure
          </p>
        </div>
      </section>

      <section className={s.steps}>
        <h2 className={s.stepsTitle}>
          Get your protection
          <br />
          <span>in 3 easy</span> steps:
        </h2>

        <ol className={s.stepList}>
          {PROTECTION_STEPS.map((step, index) => (
            <li key={step.title} className={s.stepCard}>
              <span
                className={`${s.stepNumber} ${index === 2 ? s.stepNumberActive : ""}`}
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div className={s.stepContent}>
                <p className={s.stepTitle}>{step.title}</p>
                <p className={s.stepText}>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={s.ctaStack}>
          <Link href={ROUTER_ENDPOINTS.LANDING_SCAN} className={s.primaryBtn}>
            Get Started
          </Link>
          <a href="#features" className={s.secondaryBtn}>
            Learn More
          </a>
          <p className={s.secureBadge}>
            <CheckIcon />
            100% Private &amp; Secure
          </p>
        </div>
      </section>

      <section className={s.features} id="features">
        <p className={s.eyebrow}>Features</p>
        <h2 className={s.sectionTitle}>
          All You Need
          <br />
          In One App
        </h2>
        <p className={s.sectionSubtitle}>
          Powerful phone protection that works quietly
          <br />
          in the background — no setup, no stress.
        </p>

        <div className={s.featureGrid}>
          {FEATURES.map((f) => (
            <div key={f.title} className={s.featureCard}>
              <div className={s.featureIcon}>{f.icon}</div>
              <p className={s.featureTitle}>{f.title}</p>
              <p className={s.featureText}>{f.text}</p>
            </div>
          ))}
        </div>

        <Link
          href={ROUTER_ENDPOINTS.LANDING_SCAN}
          className={`${s.primaryBtn} ${s.primaryBtnTight}`}
        >
          Get Started
        </Link>
        <p className={s.secureBadge}>
          <CheckIcon />
          100% Private &amp; Secure
        </p>
      </section>

      <section className={s.support} id="support">
        <div className={s.supportCard}>
          <div className={s.supportIcon}>
            <SupportIcon />
          </div>
          <div>
            <h2 className={s.supportTitle}>Need support?</h2>
            <p className={s.supportText}>
              Contact us and we will respond
              <br />
              within 24 hours.
            </p>
          </div>
          <a
            href="https://app-support-web.com/"
            className={s.primaryBtn}
          >
            Contact Us
          </a>
        </div>
      </section>

      <LandingFooter contactHref="https://app-support-web.com/" />
    </div>
  );
};

export default WhiteLanding;
