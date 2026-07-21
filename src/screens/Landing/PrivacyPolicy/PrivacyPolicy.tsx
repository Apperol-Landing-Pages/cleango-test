"use client";

import LegalPage, { s } from "../shared/LegalPage/LegalPage";

const PrivacyPolicy = () => {
  return (
    <LegalPage title="PRIVACY POLICY">
      <p className={s.intro}>
        Welcome to SecurityHub! This Privacy Policy outlines how we collect, use, and protect your
        personal information. It&rsquo;s designed to ensure a secure, transparent, and smooth
        experience. Please read it carefully before using SecurityHub.
      </p>

      <section className={s.section}>
        <h2 className={s.h2}>1. Information We Collect</h2>

        <h3 className={s.h3}>Information Provided Directly by You</h3>
        <p className={s.body}>Depending on the services you use, we may collect:</p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>Full name</li>
          <li className={s.listItemHighlight}>Email address</li>
          <li className={s.listItemHighlight}>Account credentials</li>
          <li className={s.listItemHighlight}>Device preferences</li>
          <li className={s.listItemHighlight}>Support requests and communications</li>
          <li className={s.listItemHighlight}>User-submitted information</li>
        </ul>
        <p className={s.body}>
          Certain information may be optional and can be skipped where permitted.
        </p>

        <h3 className={s.h3}>Automatically Collected Information</h3>
        <p className={s.body}>
          When you interact with SecurityHub services, certain technical and usage information may be
          collected automatically, including:
        </p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>IP address</li>
          <li className={s.listItemHighlight}>Device model and operating system</li>
          <li className={s.listItemHighlight}>Browser type and language settings</li>
          <li className={s.listItemHighlight}>App usage statistics</li>
          <li className={s.listItemHighlight}>Crash reports and diagnostics</li>
          <li className={s.listItemHighlight}>Approximate location information (if enabled)</li>
        </ul>
        <p className={s.body}>
          This information helps improve functionality, performance, and security.
        </p>

        <h3 className={s.h3}>Information from Third Parties</h3>
        <p className={s.body}>
          We may receive limited information from third-party services when you connect accounts or
          use integrations such as Apple Sign-In or other supported platforms.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>2. How We Use Information</h2>
        <p className={s.body}>Collected data may be used to:</p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>Provide and maintain services</li>
          <li className={s.listItemHighlight}>Improve functionality and user experience</li>
          <li className={s.listItemHighlight}>Deliver customer support</li>
          <li className={s.listItemHighlight}>Send important notifications</li>
          <li className={s.listItemHighlight}>Prevent fraud and unauthorized activity</li>
          <li className={s.listItemHighlight}>Analyze usage and performance</li>
          <li className={s.listItemHighlight}>Comply with legal obligations</li>
          <li className={s.listItemHighlight}>Deliver relevant marketing or advertising where permitted</li>
        </ul>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>3. Data Sharing</h2>
        <p className={s.body}>
          We may share limited information with trusted service providers involved in:
        </p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>Cloud hosting</li>
          <li className={s.listItemHighlight}>Payment processing</li>
          <li className={s.listItemHighlight}>Analytics</li>
          <li className={s.listItemHighlight}>Technical infrastructure</li>
          <li className={s.listItemHighlight}>Advertising and marketing</li>
          <li className={s.listItemHighlight}>Customer support</li>
        </ul>
        <p className={s.body}>
          These providers are permitted to process data only as necessary to perform services on our
          behalf.
        </p>
        <p className={s.body}>
          We do not sell personal information to unrelated third parties.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>4. Cookies &amp; Tracking Technologies</h2>
        <p className={s.body}>SecurityHub may use cookies, SDKs, and similar technologies to:</p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>Remember preferences</li>
          <li className={s.listItemHighlight}>Improve performance</li>
          <li className={s.listItemHighlight}>Analyze traffic</li>
          <li className={s.listItemHighlight}>Personalize content</li>
          <li className={s.listItemHighlight}>Support advertising functionality</li>
        </ul>
        <p className={s.body}>
          You may manage tracking and cookie preferences through device, browser, or application
          settings.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>5. International Transfers</h2>
        <p className={s.body}>
          Your information may be processed outside your country of residence. Appropriate
          safeguards are implemented where required under applicable data protection laws.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>6. Data Retention</h2>
        <p className={s.body}>
          Personal information is retained only for as long as reasonably necessary to:
        </p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>Provide services</li>
          <li className={s.listItemHighlight}>Fulfil legal obligations</li>
          <li className={s.listItemHighlight}>Resolve disputes</li>
          <li className={s.listItemHighlight}>Enforce agreements</li>
        </ul>
        <p className={s.body}>
          When no longer needed, data may be securely deleted or anonymized.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>7. Your Rights</h2>
        <p className={s.body}>
          Depending on your jurisdiction, you may have rights to:
        </p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>Access your information</li>
          <li className={s.listItemHighlight}>Correct inaccurate data</li>
          <li className={s.listItemHighlight}>Request deletion</li>
          <li className={s.listItemHighlight}>Restrict processing</li>
          <li className={s.listItemHighlight}>Withdraw consent</li>
          <li className={s.listItemHighlight}>Opt out of marketing communications</li>
        </ul>
        <p className={s.body}>Requests may be submitted using the contact details below.</p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>8. Contact Information</h2>
        <div className={s.contactBlock}>
          <p>Tcops S.R.O.</p>
          <p>Borová 4, Kostolište, 900 62</p>
          <p>Slovenská republika</p>
          <a href="mailto:support@tcops-sro.com">support@tcops-sro.com</a>
          <br />
          <a href="tel:+17754388945">+17754388945</a>
        </div>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>9. Official Language</h2>
        <p className={s.body}>
          The English-language version of this Privacy Policy shall prevail in the event of any
          inconsistency with translated versions.
        </p>
      </section>
    </LegalPage>
  );
};

export default PrivacyPolicy;
