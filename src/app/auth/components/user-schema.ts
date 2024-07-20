import { UserRole } from "@prisma/client";

export const userRoleOptions: { value: UserRole; label: string }[] = [
  {
    value: UserRole["ADMIN"],
    label: "แอดมิน",
  },
  {
    value: UserRole["USER"],
    label: "แคชเชียร์",
  },
] as const;

export const userRoleLabels = new Map(
  userRoleOptions.map((u) => [u.value, u.label]),
);
type UserRoleOption = (typeof userRoleOptions)[number]["value"];
export const userRoleSchema: [UserRoleOption, ...UserRoleOption[]] = [
  userRoleOptions[0].value,
  ...userRoleOptions.slice(1).map((u) => u.value),
];
