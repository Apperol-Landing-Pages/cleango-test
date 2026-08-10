"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTER_ENDPOINTS } from "@/utils/constants";
import BrandLogo from "../BrandLogo";
import s from "./LandingFooter.module.scss";

const PaymentIcons = () => (
  <div className={s.paymentIcons}>
    <span className={s.payCard}>VISA</span>
    <span className={s.payCard}>
      <svg width="36" height="22" viewBox="0 0 32 20" fill="none">
        <circle cx="12" cy="10" r="7" fill="#EB001B" />
        <circle cx="20" cy="10" r="7" fill="#F79E1B" opacity="0.85" />
      </svg>
    </span>
    <span className={s.payCard}>Discover</span>
    <span className={`${s.payCard} ${s.payAmex}`}>AMEX</span>
  </div>
);

interface LandingFooterProps {
  contactHref?: string;
}

const LandingFooter = ({ contactHref = "https://app-support-web.com/" }: LandingFooterProps) => {
  const pathname = usePathname();

  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <Link href={ROUTER_ENDPOINTS.LANDING} className={s.brand}>
          <BrandLogo />
          <span>ShieldX</span>
        </Link>

        <p className={s.company}>Tcops S.R.O.</p>

        <div className={s.info}>
          <span className={s.infoRow}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_249_260)">
            <path fillRule="evenodd" clipRule="evenodd" d="M11 3.055C8.97114 3.28241 7.07978 4.19257 5.63618 5.63618C4.19257 7.07978 3.28241 8.97114 3.055 11H0V13H3.055C3.28241 15.0289 4.19257 16.9202 5.63618 18.3638C7.07978 19.8074 8.97114 20.7176 11 20.945V24H13V20.945C15.0289 20.7176 16.9202 19.8074 18.3638 18.3638C19.8074 16.9202 20.7176 15.0289 20.945 13H24V11H20.945C20.7176 8.97114 19.8074 7.07978 18.3638 5.63618C16.9202 4.19257 15.0289 3.28241 13 3.055V0H11V3.055ZM12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16ZM12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14Z" fill="#FF7138"/>
            </g>
            <defs>
            <clipPath id="clip0_249_260">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            Borová 4, Kostolište, 900 62, Slovenská republika
          </span>

          <div className={s.contactRow}>
            <a href="mailto:support@tcops-sro.com" className={s.infoRow}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4.5C5.20435 4.5 4.44129 4.81607 3.87868 5.37868C3.31607 5.94129 3 6.70435 3 7.5V7.8015L12 12.648L21 7.803V7.5C21 6.70435 20.6839 5.94129 20.1213 5.37868C19.5587 4.81607 18.7956 4.5 18 4.5H6ZM21 9.5055L12.3555 14.16C12.2462 14.2188 12.1241 14.2496 12 14.2496C11.8759 14.2496 11.7538 14.2188 11.6445 14.16L3 9.5055V16.5C3 17.2956 3.31607 18.0587 3.87868 18.6213C4.44129 19.1839 5.20435 19.5 6 19.5H18C18.7956 19.5 19.5587 19.1839 20.1213 18.6213C20.6839 18.0587 21 17.2956 21 16.5V9.5055Z" fill="#FF7138"/>
                </svg>
              support@tcops-sro.com
            </a>
            <a href="tel:+17754388945" className={s.infoRow}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.23 15.26L16.69 14.97C16.3914 14.9349 16.0886 14.968 15.8046 15.0667C15.5206 15.1654 15.2626 15.3273 15.05 15.54L13.21 17.38C10.3714 15.9359 8.0641 13.6286 6.62004 10.79L8.47004 8.94001C8.90004 8.51001 9.11004 7.91001 9.04004 7.30001L8.75004 4.78001C8.69356 4.2921 8.45951 3.84204 8.0925 3.51561C7.7255 3.18918 7.25121 3.00921 6.76004 3.01001H5.03004C3.90004 3.01001 2.96004 3.95001 3.03004 5.08001C3.56004 13.62 10.39 20.44 18.92 20.97C20.05 21.04 20.99 20.1 20.99 18.97V17.24C21 16.23 20.24 15.38 19.23 15.26Z" fill="#FF7138"/>
                </svg>
              +17754388945
            </a>
          </div>
        </div>

        <nav className={s.legalLinks}>
          <Link
            href={ROUTER_ENDPOINTS.LANDING_PRIVACY}
            className={`${s.legalLink} ${pathname === ROUTER_ENDPOINTS.LANDING_PRIVACY ? s.active : ""}`}
          >
            Privacy Policy
          </Link>
          <Link
            href={ROUTER_ENDPOINTS.LANDING_TERMS}
            className={`${s.legalLink} ${pathname === ROUTER_ENDPOINTS.LANDING_TERMS ? s.active : ""}`}
          >
            Terms of Service
          </Link>
          <Link
            href={ROUTER_ENDPOINTS.LANDING_REFUND}
            className={`${s.legalLink} ${pathname === ROUTER_ENDPOINTS.LANDING_REFUND ? s.active : ""}`}
          >
            Refund Policy
          </Link>
        </nav>

        <a href={contactHref} className={s.contactBtn}>
          Contact Us
        </a>

        <PaymentIcons />

        <p className={s.copyright}>© 2026. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default LandingFooter;
