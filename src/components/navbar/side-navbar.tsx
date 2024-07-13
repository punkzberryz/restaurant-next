import {
  Banknote,
  CookingPot,
  HomeIcon,
  LucideIcon,
  PaintRoller,
  Users,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SignOutButton } from "./signout-button";
import Image from "next/image";

export const SideNavbar = ({ className }: { className?: string }) => {
  return (
    <nav
      className={cn(
        "flex h-screen flex-col space-y-2 bg-primary text-background",
        className,
      )}
    >
      <Logo />
      <Separator />
      <NavLinks />
    </nav>
  );
};

const Logo = () => {
  return (
    <Link className="flex items-center space-x-1 py-1 pl-2" href="/admin">
      <div className="rounded-full bg-background p-2">
        <Image src="/logo.svg" alt="Logo" height={25} width={25} priority />
      </div>
      <span className="text-lg">RMS</span>
    </Link>
  );
};
const NavLinks = () => {
  return (
    <div className="flex w-52 flex-col space-y-4">
      {links.map((link) => (
        <NavLink key={link.href} {...link} />
      ))}
      <SignOutButton />
    </div>
  );
};

const NavLink = ({
  href,
  title,
  icon: Icon,
}: {
  href: string;
  title: string;
  icon: LucideIcon;
}) => {
  return (
    <Button asChild>
      <Link href={href}>
        <div className="flex w-full items-center">
          <Icon className="mr-3 h-6 w-6" />
          <span>{title}</span>
        </div>
      </Link>
    </Button>
  );
};

const links: {
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
