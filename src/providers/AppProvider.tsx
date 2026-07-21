"use client";

import { ReactNode, useEffect } from "react";

import { login, registration } from "@/api/auth";
import { DATA_STORAGE } from "@/utils/constants";
import { initIOSMessageReceiver } from "@/utils/webkitBridge";

const APPSFLYER_STORAGE_KEY = "appsflyer_id";

function readCookie(name: string): string | undefined {
  const prefix = `${name}=`;
  const value = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))
    ?.slice(prefix.length);

  return value ? decodeURIComponent(value) : undefined;
}

function getAppsFlyerId(): string | undefined {
  const id =
    new URLSearchParams(window.location.search).get(APPSFLYER_STORAGE_KEY) ||
    localStorage.getItem(APPSFLYER_STORAGE_KEY) ||
    readCookie(APPSFLYER_STORAGE_KEY);

  if (id) localStorage.setItem(APPSFLYER_STORAGE_KEY, id);
  return id || undefined;
}

function AppProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initIOSMessageReceiver();

    const authenticate = async () => {
      if (localStorage.getItem(DATA_STORAGE.TOKEN)) return;

      const account = await registration({ appsflyer_id: getAppsFlyerId() });
      if (!account?.login || !account?.password) return;

      const session = await login({
        login: account.login,
        password: account.password,
      });

      if (session?.access_token) {
        localStorage.setItem(DATA_STORAGE.TOKEN, session.access_token);
      }
    };

    void authenticate();
  }, []);

  return children;
}

export { AppProvider };
