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

export const NavLinks = () => {
  const { isExpanded } = useToggleSideNav();
  return (
    <div className="flex flex-col space-y-4">
      {links.map((link) => (
        <NavLink key={link.href} {...link} isExpanded={isExpanded} />
      ))}
      <SignOutButton isExpanded={isExpanded} />
    </div>
  );
};

export const NavLinksForSheet = () => {
  return (
    <div className="flex flex-col space-y-4">
      {links.map((link) => (
        <NavLink key={link.href} {...link} isExpanded />
      ))}
      <SignOutButton isExpanded />
    </div>
  );
};

export const NavLink = ({
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

export const links: {
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
