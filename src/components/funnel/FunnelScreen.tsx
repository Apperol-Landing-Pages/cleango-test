import type { ReactNode } from "react";

import styles from "./FunnelScreen.module.css";

type FunnelScreenProps = Readonly<{
  children: ReactNode;
  screenId: string;
}>;

export function FunnelScreen({ children, screenId }: FunnelScreenProps) {
  return (
    <main className={styles.page} data-funnel="security-white" data-screen={screenId}>
      <div className={styles.screen}>{children}</div>
    </main>
  );
}
