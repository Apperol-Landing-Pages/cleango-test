export type FunnelStepId =
  | "intro"
  | "questions"
  | "progress"
  | "result"
  | "checkout"
  | "confirmation";

export type FunnelStep = Readonly<{
  id: FunnelStepId;
  pathname: string;
}>;

export const funnelSteps = [
  { id: "intro", pathname: "/" },
  { id: "questions", pathname: "/quiz/browsing-habits" },
  { id: "questions", pathname: "/quiz/network-privacy" },
  { id: "questions", pathname: "/quiz/shared-website-data" },
  { id: "questions", pathname: "/quiz/private-mode-sign-in" },
  { id: "questions", pathname: "/quiz/account-security" },
  { id: "questions", pathname: "/quiz/two-factor-auth" },
  { id: "questions", pathname: "/quiz/app-permissions" },
  { id: "questions", pathname: "/quiz/device-security" },
  { id: "progress", pathname: "/quiz/progress" },
  { id: "result", pathname: "/results" },
  { id: "result", pathname: "/results/lite" },
  { id: "result", pathname: "/results/snapshot" },
  { id: "result", pathname: "/results/snapshot/lite" },
  { id: "result", pathname: "/results/snapshot/medium" },
  { id: "result", pathname: "/results/snapshot/red" },
  { id: "checkout", pathname: "/plans" },
  { id: "confirmation", pathname: "/confirmation" },
] as const satisfies readonly FunnelStep[];
