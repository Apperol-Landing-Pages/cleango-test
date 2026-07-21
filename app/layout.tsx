import { ReactNode } from "react";
import type { Viewport } from "next";

import { AppProvider } from "@/providers/AppProvider";
import ViewportHeightSetter from "@/utils/ViewportHeightSetter";

import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#060D28",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <ViewportHeightSetter />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
