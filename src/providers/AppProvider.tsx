"use client";

import { ReactNode, useEffect } from "react";

import { ensureAccessToken } from "@/api/session";
import { initIOSMessageReceiver } from "@/utils/webkitBridge";

function AppProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initIOSMessageReceiver();
    void ensureAccessToken();
  }, []);

  return children;
}

export { AppProvider };
