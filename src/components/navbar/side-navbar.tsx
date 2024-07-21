import { Separator } from "../ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavLinks } from "./navbar-links";
import { SideNavbarLogo } from "./side-navbar-logo";

export const SideNavbar = ({ className }: { className?: string }) => {
  return (
    <nav
      className={cn(
        "flex h-screen flex-col space-y-2 bg-primary text-background",
        className,
      )}
    >
      <Link href="/admin">
        <SideNavbarLogo />
      </Link>
      <Separator />
      <NavLinks />
    </nav>
  );
};
