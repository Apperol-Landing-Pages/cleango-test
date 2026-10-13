import { redirect } from "next/navigation";

export default function LegacySharedWebsiteDataPage() {
  redirect("/quiz/private-mode-sign-in");
}
