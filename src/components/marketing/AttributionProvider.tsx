"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { captureMarketingAttribution } from "@/lib/marketing/attribution";

export function AttributionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    captureMarketingAttribution();
  }, [pathname]);

  return null;
}
