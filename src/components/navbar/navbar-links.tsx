"use client";
import {
  HomeIcon,
  LucideIcon,
  Users,
  CookingPot,
  Salad,
  PaintRoller,
  Banknote,
} from "lucide-react";
import { SignOutButton } from "./signout-button";
import { useToggleSideNav } from "./use-toggle-sidenav";
import Link from "next/link";

export const NavLinks = ({ role }: { role: "cashier" | "admin" }) => {
  const { isExpanded } = useToggleSideNav();
  return (
    <div className="flex flex-col space-y-4">
      {role === "admin"
        ? adminLinks.map((link) => (
            <NavLink key={link.href} {...link} isExpanded={isExpanded} />
          ))
        : cashierLinks.map((link) => (
            <NavLink key={link.href} {...link} isExpanded={isExpanded} />
          ))}
      <SignOutButton isExpanded={isExpanded} />
    </div>
  );
};

export const NavLinksForSheet = ({ role }: { role: "cashier" | "admin" }) => {
  return (
    <div className="flex flex-col space-y-4">
      {role === "admin"
        ? adminLinks.map((link) => (
            <NavLink key={link.href} {...link} isExpanded />
          ))
        : cashierLinks.map((link) => (
            <NavLink key={link.href} {...link} isExpanded />
          ))}
      <SignOutButton isExpanded />
    </div>
  );
};

const NavLink = ({
  href,
  title,
  icon: Icon,
  isExpanded,
}: {
  href: string;
  title: string;
  icon: LucideIcon;
  isExpanded: boolean;
}) => {
  return (
    <Link href={href}>
      <div className="mx-4 flex w-full items-center">
        <Icon className="mr-3 h-6 w-6" />
        <span hidden={!isExpanded}>{title}</span>
      </div>
    </Link>
  );
};

const adminLinks: {
  href: string;
  title: string;
  icon: LucideIcon;
}[] = [
  {
    href: "/admin",
    title: "หน้าหลัก Dashboard",
    icon: HomeIcon,
  },
  {
    href: "/admin/staff",
    title: "จัดการพนักงาน",
    icon: Users,
  },
  {
    href: "/admin/category",
    title: "จัดการหมวดหมู่อาหาร",
    icon: CookingPot,
  },
  {
    href: "/admin/food",
    title: "จัดการอาหาร",
    icon: Salad,
  },
  {
    href: "/admin/restaurant",
    title: "จัดการร้านอาหาร",
    icon: PaintRoller,
  },
  {
    href: "/admin/bill",
    title: "รายการบิล",
    icon: Banknote,
  },
];

const cashierLinks: {
  href: string;
  title: string;
  icon: LucideIcon;
}[] = [
  {
    href: "/cashier",
    title: "หน้าหลัก/สั่งอาหาร",
    icon: HomeIcon,
  },

  {
    href: "/cashier/bill",
    title: "รายการบิล",
    icon: Banknote,
  },
];
