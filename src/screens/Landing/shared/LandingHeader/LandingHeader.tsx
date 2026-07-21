"use client";

import s from "./LandingHeader.module.scss";

const LogoIcon = () => (
  <svg width="69" height="68" viewBox="0 0 69 68" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M43.0902 60.6311L34.1012 68L26.4655 62.2292C12.6854 51.8148 3.58999 36.3675 1.16819 19.2653L0 11.0158L34.2961 0L68.2414 11.0158L65.6072 23.5454C62.5448 38.1113 54.601 51.1949 43.0902 60.6311Z" fill="#FF5E00" fill-opacity="0.1"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M47.5283 32.1148L20.2793 51.1797C22.8416 54.2976 30.4565 60.718 33.8529 62.3669C51.3676 51.387 56.0244 29.8509 47.5593 26.4757C48.3829 27.0541 48.8792 27.8922 48.9517 29.0608C49.0247 30.2293 48.5089 31.4285 47.5283 32.1148Z" fill="url(#paint0_linear_245_8545)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M47.6038 26.3635C54.9094 31.1644 50.133 50.7458 33.8794 62.3669C48.9756 53.1263 60.0156 35.4123 62.8498 14.3099L49.6604 9.9787L40.0492 22.4549L47.2054 26.1228C47.3455 26.1944 47.4784 26.2749 47.6038 26.3635Z" fill="url(#paint1_linear_245_8545)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.2445 47.8012L32.109 32.5992L24.6271 29.0402C23.5478 28.5268 22.8557 27.3751 22.7669 26.2221C22.6782 25.0694 22.9859 24.1929 23.647 23.4982C15.2435 27.6499 13.2302 39.8618 18.2445 47.8012Z" fill="url(#paint2_linear_245_8545)"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18.1632 47.8012C14.3229 39.2616 16.5022 28.4549 24.1454 23.0836L44.9847 8.43983C41.2747 7.23616 37.5647 6.0323 33.8547 4.82841L4.90894 14.3338C6.62455 27.109 11.3502 38.6419 18.1632 47.8012Z" fill="url(#paint3_linear_245_8545)"/>
<defs>
<linearGradient id="paint0_linear_245_8545" x1="36.0105" y1="33.4956" x2="74.7258" y2="38.4505" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF7138"/>
<stop offset="1" stop-color="#034391"/>
</linearGradient>
<linearGradient id="paint1_linear_245_8545" x1="48.4005" y1="20.2252" x2="84.4867" y2="23.1459" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF7138"/>
<stop offset="1" stop-color="#034391"/>
</linearGradient>
<linearGradient id="paint2_linear_245_8545" x1="23.8408" y1="28.2516" x2="-5.33057" y2="38.2632" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF7138"/>
<stop offset="1" stop-color="#034391"/>
</linearGradient>
<linearGradient id="paint3_linear_245_8545" x1="24.9965" y1="13.2334" x2="74.3237" y2="19.9662" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF7138"/>
<stop offset="1" stop-color="#034391"/>
</linearGradient>
</defs>
</svg>
);

interface LandingHeaderProps {
  logoHref?: string;
  onLogoClick?: React.MouseEventHandler<HTMLAnchorElement>;
  contactHref?: string;
}

const LandingHeader = ({
  logoHref = "/scan",
  onLogoClick,
  contactHref = "https://app-support-web.com/",
}: LandingHeaderProps) => {
  return (
    <header className={s.header}>
      <div className={s.inner}>
        <a href={logoHref} className={s.brand} onClick={onLogoClick}>
          <LogoIcon />
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
