"use client";

import LegalPage, { s } from "../shared/LegalPage/LegalPage";

const TermsOfService = () => {
  return (
    <LegalPage title="TERMS OF USE">
      <p className={s.label}>Effective Date: July 13, 2026</p>

      <p className={s.intro}>
        These Terms of Use (&quot;Terms&quot;) govern your access to and use of
        all AureX applications, software, websites, tools, and related services
        (&quot;Services&quot;) provided by Tcops S.R.O.
      </p>
      <p className={s.intro}>
        By accessing or using the Services, you agree to be bound by these
        Terms. If you do not agree, please do not use the Services.
      </p>

      <section className={s.section}>
        <h2 className={s.h2}>1. Eligibility</h2>
        <p className={s.body}>
          You must be at least 18 years old to use the Services.
        </p>
        <p className={s.body}>
          You agree to provide accurate, complete, and current information when
          creating or maintaining your account.
        </p>
        <p className={s.body}>
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activities that occur under your
          account.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>2. Subscription Plans</h2>
        <p className={s.body}>
          AureX offers subscription-based access to its Services.
        </p>
        <p className={s.label}>Introductory Offer</p>
        <p className={s.body}>
          Eligible new users may purchase an introductory subscription for:
        </p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>
            7-day introductory period — USD $0.99
          </li>
        </ul>
        <p className={s.body}>
          Unless canceled before the end of the introductory period, the
          subscription will automatically renew as follows:
        </p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>
            Monthly Subscription — USD $39.99 per month
          </li>
        </ul>
        <p className={s.body}>
          By purchasing the introductory offer, you authorize recurring monthly
          charges until your subscription is canceled.
        </p>
        <p className={s.body}>
          Subscriptions automatically renew unless canceled before the next
          billing date.
        </p>
        <p className={s.body}>
          Canceling a subscription prevents future renewals only. Access
          continues until the end of the current paid billing period.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>3. One-Time Access Purchases</h2>
        <p className={s.body}>
          AureX also offers one-time digital purchases that provide access to
          the Services for a fixed period.
        </p>
        <p className={s.label}>Available options include:</p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>USD $4.99 — 7 days of access</li>
          <li className={s.listItemHighlight}>USD $19.99 — 1 month of access</li>
          <li className={s.listItemHighlight}>
            USD $49.99 — 3 months of access
          </li>
          <li className={s.listItemHighlight}>
            USD $99.99 — 6 months of access
          </li>
        </ul>
        <p className={s.body}>These purchases do not renew automatically.</p>
        <p className={s.body}>
          Purchased access is personal, non-transferable, and expires
          automatically at the end of the purchased period.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>4. Billing and Payments</h2>
        <p className={s.body}>
          Payments are securely processed through authorized payment providers,
          including Stripe.
        </p>
        <p className={s.body}>
          By completing a purchase, you authorize the applicable payment method
          to be charged for all fees associated with your selected plan.
        </p>
        <p className={s.body}>
          You are responsible for ensuring that your payment information remains
          accurate and up to date.
        </p>
        <p className={s.body}>
          If a payment cannot be processed, we may suspend or terminate access
          until payment is successfully completed.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>5. Cancellation and Refunds</h2>
        <p className={s.body}>
          Subscriptions may be canceled at any time through your account or by
          contacting our support team.
        </p>
        <p className={s.body}>
          Cancellation becomes effective at the end of the current billing
          period and does not automatically result in a refund.
        </p>
        <p className={s.body}>
          Refund requests are handled in accordance with our Refund &amp;
          Cancellation Policy.
        </p>
        <p className={s.body}>
          Except where required by applicable law, payments for subscriptions
          and one-time digital purchases are generally non-refundable after
          access to the Services has been granted.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>6. Services Disclaimer</h2>
        <p className={s.body}>
          AureX provides privacy, productivity, security, monitoring, and
          digital protection tools for informational and personal use only.
        </p>
        <p className={s.body}>The Services do not constitute:</p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>legal advice;</li>
          <li className={s.listItemHighlight}>medical advice;</li>
          <li className={s.listItemHighlight}>
            professional cybersecurity consulting;
          </li>
          <li className={s.listItemHighlight}>technical certification;</li>
          <li className={s.listItemHighlight}>law enforcement services;</li>
          <li className={s.listItemHighlight}>
            guarantees of protection against cyber threats.
          </li>
        </ul>
        <p className={s.body}>
          Performance and results may vary depending on device compatibility,
          internet connectivity, software configuration, and user behavior.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>7. User Conduct</h2>
        <p className={s.body}>You agree not to:</p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>violate any applicable laws;</li>
          <li className={s.listItemHighlight}>
            misuse or interfere with the Services;
          </li>
          <li className={s.listItemHighlight}>
            attempt unauthorized access to our systems;
          </li>
          <li className={s.listItemHighlight}>
            distribute malware or malicious software;
          </li>
          <li className={s.listItemHighlight}>
            reverse engineer or exploit the Services;
          </li>
          <li className={s.listItemHighlight}>
            harass, threaten, or abuse our employees or other users;
          </li>
          <li className={s.listItemHighlight}>
            use the Services for fraudulent or illegal purposes.
          </li>
        </ul>
        <p className={s.body}>
          Violation of these Terms may result in immediate suspension or
          permanent termination of your account without prior notice.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>8. Intellectual Property</h2>
        <p className={s.body}>
          All software, trademarks, logos, designs, text, graphics, technology,
          and content provided through AureX are owned by or licensed to Tcops
          S.R.O.
        </p>
        <p className={s.body}>
          No rights are granted except the limited right to use the Services in
          accordance with these Terms.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>9. Arbitration Agreement</h2>
        <p className={s.body}>
          To the maximum extent permitted by applicable law, any dispute arising
          out of or relating to these Terms or the Services shall be resolved
          through binding arbitration rather than court proceedings.
        </p>
        <p className={s.body}>You waive the right to:</p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>a jury trial;</li>
          <li className={s.listItemHighlight}>
            participate in class-action lawsuits;
          </li>
          <li className={s.listItemHighlight}>
            participate in representative proceedings.
          </li>
        </ul>
        <p className={s.body}>
          You may opt out of this arbitration agreement within 30 days of your
          first purchase by contacting:{" "}
          <a href="mailto:support@tcops-sro.com" style={{ color: "#7ba1ff" }}>
            support@tcops-sro.com
          </a>
        </p>
        <p className={s.body}>
          This arbitration provision does not affect any mandatory consumer
          rights that cannot legally be waived.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>10. Limitation of Liability</h2>
        <p className={s.body}>
          To the fullest extent permitted by law, Tcops S.R.O. and AureX shall
          not be liable for any:
        </p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>
            indirect or consequential damages;
          </li>
          <li className={s.listItemHighlight}>loss of data;</li>
          <li className={s.listItemHighlight}>financial losses;</li>
          <li className={s.listItemHighlight}>business interruption;</li>
          <li className={s.listItemHighlight}>loss of profits;</li>
          <li className={s.listItemHighlight}>service interruptions;</li>
          <li className={s.listItemHighlight}>device malfunction;</li>
          <li className={s.listItemHighlight}>
            cybersecurity incidents beyond our reasonable control;
          </li>
          <li className={s.listItemHighlight}>
            reliance on monitoring or security results.
          </li>
        </ul>
        <p className={s.body}>
          The Services are provided &quot;AS IS&quot; and &quot;AS
          AVAILABLE&quot; without warranties of any kind except as required by
          applicable law.
        </p>
        <p className={s.body}>
          Your use of the Services is entirely at your own risk.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>11. Changes to the Services and Terms</h2>
        <p className={s.body}>
          We may modify, suspend, or discontinue any part of the Services at any
          time.
        </p>
        <p className={s.body}>We may also update these Terms periodically.</p>
        <p className={s.body}>
          Continued use of the Services after revised Terms become effective
          constitutes your acceptance of the updated Terms.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>12. Governing Law</h2>
        <p className={s.body}>
          These Terms shall be governed by and interpreted in accordance with
          the laws of the Slovak Republic, except where mandatory consumer
          protection laws of your country of residence provide otherwise.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>13. Contact Information</h2>
        <div className={s.contactBlock}>
          <p>Tcops S.R.O.</p>
          <p>Borová-4, Kostolište, 900 62</p>
          <p>Slovenská republika</p>
          <a href="mailto:support@tcops-sro.com">support@tcops-sro.com</a>
          <br />
          <a href="tel:+17754388945">+1 (775) 438-8945</a>
          <br />
          <a
            href="https://app-support-web.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://app-support-web.com/
          </a>
        </div>
      </section>
    </LegalPage>
  );
};

export default TermsOfService;
