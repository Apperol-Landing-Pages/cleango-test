import { NextRequest, NextResponse } from "next/server";
import { isBlockedIp, BLOCK_REDIRECT_PATH } from "@/config/blockedIps";

const APPSFLYER_COOKIE = "appsflyer_id";
// 1 year
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// Local dev escape hatch: when the app is built for a local stack we skip the
// SafeHub cloak entirely so http://localhost:3000 opens the app directly, with
// no appsflyer_id / blocked-IP redirect. Baked in at build time (see Dockerfile
// + docker-compose.local.yml). Empty in prod → full cloak stays active.
const CLOAK_DISABLED = process.env.NEXT_PUBLIC_DISABLE_CLOAK === "true";

export function middleware(req: NextRequest) {
  if (CLOAK_DISABLED) {
    return NextResponse.next();
  }

  const { pathname, searchParams } = req.nextUrl;

  // Real client IP behind the reverse proxy (Traefik) — first X-Forwarded-For entry.
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? null;

  // Blocked (attacking/abusive) IPs are denied internal routes and confined to the
  // landing page. Any attempt to reach a deeper path is bounced back to it.
  if (isBlockedIp(clientIp)) {
    // Already on the destination → pass through (avoids a redirect loop).
    if (pathname === BLOCK_REDIRECT_PATH) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(BLOCK_REDIRECT_PATH, req.url));
  }

  const idFromQuery = searchParams.get("appsflyer_id");
  const idFromCookie = req.cookies.get(APPSFLYER_COOKIE)?.value;
  const appsflyerId = idFromQuery || idFromCookie;

  // No appsflyer_id anywhere and not on root or landing funnel → redirect to root.
  if (!appsflyerId && pathname !== "/" && !pathname.startsWith("/scan")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const res = NextResponse.next();

  // Persist a freshly-arrived appsflyer_id so internal navigation keeps working.
  if (idFromQuery && idFromQuery !== idFromCookie) {
    res.cookies.set(APPSFLYER_COOKIE, idFromQuery, {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
    });
  }

  return res;
}

export const config = {
  // Run on all routes except Next.js internals and static files.
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
