export function getInitials(fullName: string) {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function getFirstName(fullName: string) {
  return fullName.trim().split(" ")[0] || "User";
}

export function formatPlan(plan: string) {
  return `${plan.charAt(0).toUpperCase()}${plan.slice(1)} Plan`;
}
