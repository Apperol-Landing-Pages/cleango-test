import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { AmplitudeProvider } from "@/components/analytics/AmplitudeProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Security White",
    template: "%s | Security White",
  },
  description: "A mobile-first privacy habits funnel.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AmplitudeProvider />
        {children}
      </body>
    </html>
  );
}
