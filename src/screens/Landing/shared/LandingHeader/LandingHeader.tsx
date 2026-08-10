"use client";

import BrandLogo from "../BrandLogo";
import s from "./LandingHeader.module.scss";

interface LandingHeaderProps {
  logoHref?: string;
  onLogoClick?: React.MouseEventHandler<HTMLAnchorElement>;
  contactHref?: string;
}

const LandingHeader = ({
  logoHref = "/",
  onLogoClick,
  contactHref = "https://app-support-web.com/",
}: LandingHeaderProps) => {
  return (
    <header className={s.header}>
      <div className={s.inner}>
        <a href={logoHref} className={s.brand} onClick={onLogoClick}>
          <BrandLogo />
          <span>ShieldX</span>
        </a>
        <a href={contactHref} className={s.contactBtn}>
          Contact Us
        </a>
      </div>
    </header>
  );
};

export default LandingHeader;
