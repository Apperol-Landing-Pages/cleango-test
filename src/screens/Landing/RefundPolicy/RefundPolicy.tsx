"use client";

import LegalPage, { s } from "../shared/LegalPage/LegalPage";

const RefundPolicy = () => {
  return (
    <LegalPage title="REFUND & CANCELLATION POLICY">
      <p className={s.label}>Effective Date: July 13, 2026</p>

      <p className={s.intro}>
        This Refund &amp; Cancellation Policy explains how subscription
        cancellations and refund requests are handled for purchases made through
        our website using Stripe.
      </p>

      <section className={s.section}>
        <h2 className={s.h2}>1. Company Information</h2>
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

      <section className={s.section}>
        <h2 className={s.h2}>2. Subscription Plans</h2>
        <p className={s.body}>
          Our application offers subscription-based access.
        </p>
        <p className={s.label}>Introductory Offer</p>
        <p className={s.body}>
          New users may be eligible for an introductory offer:
        </p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>First 7 days: USD $0.99</li>
        </ul>
        <p className={s.body}>
          After the trial period ends, the subscription automatically renews at
          USD $39.99 per month unless canceled before the renewal date.
        </p>
        <p className={s.body}>
          By purchasing the introductory offer, you authorize future recurring
          monthly payments until you cancel your subscription.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>3. One-Time Access Purchases</h2>
        <p className={s.body}>
          We also offer one-time purchases that provide access for a fixed
          period:
        </p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>USD $4.99 — 7 days</li>
          <li className={s.listItemHighlight}>USD $19.99 — 1 month</li>
          <li className={s.listItemHighlight}>USD $49.99 — 3 months</li>
          <li className={s.listItemHighlight}>USD $99.99 — 6 months</li>
        </ul>
        <p className={s.body}>These purchases do not renew automatically.</p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>4. Subscription Cancellation</h2>
        <p className={s.body}>You may cancel your subscription at any time.</p>
        <p className={s.body}>Cancellation prevents future renewals only.</p>
        <p className={s.body}>After cancellation:</p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>
            your subscription remains active until the end of the already-paid
            billing period;
          </li>
          <li className={s.listItemHighlight}>
            no additional charges will be made;
          </li>
          <li className={s.listItemHighlight}>
            cancellation does not automatically generate a refund.
          </li>
        </ul>
        <p className={s.body}>
          You are responsible for canceling your subscription before the next
          billing date if you do not wish to continue your subscription.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>5. Refund Policy</h2>
        <p className={s.body}>
          Because our services provide immediate access to digital content and
          security features, payments are generally non-refundable after access
          has been granted.
        </p>
        <p className={s.body}>
          However, we may issue refunds at our sole discretion in situations
          including, but not limited to:
        </p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>accidental duplicate payments;</li>
          <li className={s.listItemHighlight}>
            multiple charges for the same purchase;
          </li>
          <li className={s.listItemHighlight}>
            unauthorized transactions confirmed after investigation;
          </li>
          <li className={s.listItemHighlight}>
            technical issues that permanently prevented access to the purchased
            service and could not be resolved;
          </li>
          <li className={s.listItemHighlight}>
            billing errors caused by our system.
          </li>
        </ul>
        <p className={s.body}>Refund requests are reviewed individually.</p>
        <p className={s.body}>
          Submitting a refund request does not guarantee that a refund will be
          approved.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>6. Non-Refundable Situations</h2>
        <p className={s.body}>
          Refunds are generally not provided in the following situations:
        </p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>
            forgetting to cancel a subscription before renewal;
          </li>
          <li className={s.listItemHighlight}>
            dissatisfaction after using the service;
          </li>
          <li className={s.listItemHighlight}>
            failure to use the purchased subscription or access period;
          </li>
          <li className={s.listItemHighlight}>
            accidental purchases after substantial use of the service;
          </li>
          <li className={s.listItemHighlight}>
            requests made after a significant portion of the purchased access
            period has already been used;
          </li>
          <li className={s.listItemHighlight}>
            violations of our Terms of Service.
          </li>
        </ul>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>7. Introductory Trial Charges</h2>
        <p className={s.body}>
          The USD $0.99 introductory offer automatically converts into the
          monthly subscription unless canceled before the end of the trial
          period.
        </p>
        <p className={s.body}>
          Failure to cancel before the renewal date does not automatically
          qualify for a refund.
        </p>
        <p className={s.body}>
          In exceptional circumstances, first renewal charges may be reviewed
          individually if the request is submitted promptly after the renewal
          and the service has not been materially used.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>8. How to Request a Refund</h2>
        <p className={s.body}>To request a refund, please contact us with:</p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>your full name;</li>
          <li className={s.listItemHighlight}>
            the email address used during purchase;
          </li>
          <li className={s.listItemHighlight}>the date of purchase;</li>
          <li className={s.listItemHighlight}>the payment amount;</li>
          <li className={s.listItemHighlight}>the reason for your request.</li>
        </ul>
        <div className={s.contactBlock}>
          <a href="mailto:support@tcops-sro.com">support@tcops-sro.com</a>
          <br />
          <a
            href="https://app-support-web.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://app-support-web.com/
          </a>
        </div>
        <p className={s.body}>We aim to respond within 2 business days.</p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>9. Refund Processing</h2>
        <p className={s.body}>If a refund is approved:</p>
        <ul className={s.list}>
          <li className={s.listItemHighlight}>
            the refund will be issued through the original payment method;
          </li>
          <li className={s.listItemHighlight}>
            depending on your bank or card issuer, funds typically appear within
            5–10 business days after processing.
          </li>
        </ul>
        <p className={s.body}>
          Processing times may vary depending on your financial institution.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>10. Chargebacks</h2>
        <p className={s.body}>
          Before initiating a chargeback with your bank or card issuer, we
          encourage you to contact our support team.
        </p>
        <p className={s.body}>
          Most billing issues can be resolved quickly through our customer
          support.
        </p>
        <p className={s.body}>
          Fraudulent or abusive chargeback activity may result in suspension or
          termination of your account where permitted by applicable law.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>11. Changes to this Policy</h2>
        <p className={s.body}>
          We reserve the right to update this Refund &amp; Cancellation Policy at
          any time.
        </p>
        <p className={s.body}>
          The version published on our website at the time of purchase will apply
          to that purchase unless otherwise required by applicable law.
        </p>
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>Contact Us</h2>
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

export default RefundPolicy;
