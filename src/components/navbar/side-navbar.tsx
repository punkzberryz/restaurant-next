import { Separator } from "../ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavLinks } from "./navbar-links";
import { SideNavbarLogo } from "./side-navbar-logo";

export const SideNavbar = ({
  className,
  role,
}: {
  className?: string;
  role: "cashier" | "admin";
}) => {
  return (
    <nav
      className={cn(
        "flex h-screen flex-col space-y-2 bg-primary text-background",
        className,
      )}
    >
      {role === "cashier" ? <SideNavbarForCashier /> : <SideNavbarForAdmin />}
    </nav>
  );
};
const SideNavbarForCashier = ({ className }: { className?: string }) => {
  return (
    <>
      <Link href="/cashier">
        <SideNavbarLogo />
      </Link>
      <Separator />
      <NavLinks role="cashier" />
    </>
  );
};

const SideNavbarForAdmin = ({ className }: { className?: string }) => {
  return (
    <>
      <Link href="/admin">
        <SideNavbarLogo />
      </Link>
      <Separator />
      <NavLinks role="admin" />
    </>
  );
};
