"use client";

import LandingHeader from "../shared/LandingHeader/LandingHeader";
import LandingFooter from "../shared/LandingFooter/LandingFooter";
import { CheckIcon, FEATURES, PhoneMockup } from "../shared/landingContent";
import s from "../StartLanding/StartLanding.module.scss";

const APP_STORE_URL =
  "https://apps.apple.com/pl/app/aurex-security-app/id6761459801";

const DownloadApp = () => {
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
        contactHref="#support"
      />

      <section className={s.hero}>
        <PhoneMockup />
        <h1 className={s.heroTitle}>
          Download the app
          <br />
          to continue
        </h1>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={s.primaryBtn}
        >
          Download
        </a>
        <p className={s.secureBadge}>
          <CheckIcon />
          100% Private &amp; Secure
        </p>
      </section>

      <section className={s.features}>
        <p className={s.eyebrow}>Features</p>
        <h2 className={s.sectionTitle}>What will you get?</h2>
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

        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${s.primaryBtn} ${s.primaryBtnTight}`}
        >
          Download
        </a>
        <p className={s.secureBadge}>
          <CheckIcon />
          100% Private &amp; Secure
        </p>
      </section>

      <LandingFooter contactHref="#support" />
    </div>
  );
};

export default DownloadApp;
