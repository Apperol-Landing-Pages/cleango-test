export const privacyPlans = [
  {
    id: "essential",
    name: "Essential",
    price: 4.99,
    description: "Your priorities, with clear next steps",
  },
  {
    id: "plus",
    name: "Plus",
    price: 9.99,
    description: "Your plan, plus practical checklists",
    recommended: true,
  },
  {
    id: "complete",
    name: "Complete",
    price: 19.99,
    description: "All guides, plus deeper walkthroughs",
  },
] as const;

export type PrivacyPlanId = (typeof privacyPlans)[number]["id"];

type StorageReader = Pick<Storage, "getItem">;
type StorageWriter = Pick<Storage, "setItem">;

const selectedPlanKey = "security-white.checkout.selected-plan";

export function getPrivacyPlan(planId: PrivacyPlanId) {
  return privacyPlans.find((plan) => plan.id === planId) ?? privacyPlans[1];
}

export function saveSelectedPlan(storage: StorageWriter, planId: PrivacyPlanId) {
  storage.setItem(selectedPlanKey, planId);
}

export function readSelectedPlan(storage: StorageReader): PrivacyPlanId {
  const storedPlan = storage.getItem(selectedPlanKey);

  if (privacyPlans.some((plan) => plan.id === storedPlan)) {
    return storedPlan as PrivacyPlanId;
  }

  return "plus";
}
