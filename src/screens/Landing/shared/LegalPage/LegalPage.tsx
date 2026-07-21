"use client";

import { ReactNode } from "react";
import LandingHeader from "../LandingHeader/LandingHeader";
import LandingFooter from "../LandingFooter/LandingFooter";
import s from "./LegalPage.module.scss";

interface LegalPageProps {
  title: string;
  children: ReactNode;
}

const LegalPage = ({ title, children }: LegalPageProps) => {
  return (
    <div className={s.page}>
      <LandingHeader />
      <main className={s.main}>
        <article className={s.article}>
          <h1 className={s.pageTitle}>{title}</h1>
          {children}
        </article>
      </main>
      <LandingFooter />
    </div>
  );
};

export { s };
export default LegalPage;
