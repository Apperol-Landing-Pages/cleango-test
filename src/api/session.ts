import { login, registration } from "@/api/auth";
import { DATA_STORAGE } from "@/utils/constants";

const APPSFLYER_STORAGE_KEY = "appsflyer_id";

let authenticationInFlight: Promise<string | null> | null = null;

function readCookie(name: string): string | undefined {
  const prefix = `${name}=`;
  const value = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))
    ?.slice(prefix.length);

  if (!value) return undefined;

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function getAppsFlyerId(): string | undefined {
  const id =
    new URLSearchParams(window.location.search).get(APPSFLYER_STORAGE_KEY) ||
    localStorage.getItem(APPSFLYER_STORAGE_KEY) ||
    readCookie(APPSFLYER_STORAGE_KEY);

  if (id) localStorage.setItem(APPSFLYER_STORAGE_KEY, id);
  return id || undefined;
}

async function authenticate(): Promise<string | null> {
  try {
    const account = await registration({ appsflyer_id: getAppsFlyerId() });
    if (!account?.login || !account?.password) return null;

    const session = await login({
      login: account.login,
      password: account.password,
    });
    const accessToken = session?.access_token;

    if (!accessToken) return null;

    localStorage.setItem(DATA_STORAGE.TOKEN, accessToken);
    return accessToken;
  } catch {
    return null;
  }
}

export async function ensureAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;

  const existingToken = localStorage.getItem(DATA_STORAGE.TOKEN);
  if (existingToken) return existingToken;

  authenticationInFlight ??= authenticate();

  try {
    return await authenticationInFlight;
  } finally {
    authenticationInFlight = null;
  }
}
