import { UserRole } from "@prisma/client";

export const UserRoleOptions: { value: UserRole; label: string }[] = [
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
  UserRoleOptions.map((u) => [u.value, u.label]),
);
