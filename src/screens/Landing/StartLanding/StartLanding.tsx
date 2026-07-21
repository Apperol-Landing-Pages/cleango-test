"use client";

import Link from "next/link";
import { ROUTER_ENDPOINTS } from "@/utils/constants";
import LandingHeader from "../shared/LandingHeader/LandingHeader";
import LandingFooter from "../shared/LandingFooter/LandingFooter";
import { CheckIcon, FEATURES, PhoneMockup } from "../shared/landingContent";
import s from "./StartLanding.module.scss";

const StartLanding = () => {
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
          Your data might be exposed.
          <br />
          Scan your device now to stay
          <br />
          safe from scammers.
        </h1>
        <Link href={ROUTER_ENDPOINTS.LANDING_SCAN} className={s.primaryBtn}>
          Scan Device
        </Link>
        <p className={s.secureBadge}>
          <CheckIcon />
          100% Private &amp; Secure
        </p>
      </section>

      <section className={s.features}>
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

      <LandingFooter contactHref="https://app-support-web.com/" />
    </div>
  );
};

export default StartLanding;
