"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { SideNavbar } from "./side-navbar";
import { Footer } from "../footer";
import { useToggleSideNav } from "./use-toggle-sidenav";

export const SideNavbarWrapper = ({
  children,
  role,
}: {
  children: ReactNode;
  className?: string;
  role: "cashier" | "admin";
}) => {
  const { isExpanded } = useToggleSideNav();
  return (
    <>
      <SideNavbar
        className={cn(
          "fixed left-0 top-0 z-20 -translate-x-full transition-all duration-300 ease-in-out md:translate-x-0",
          isExpanded ? "w-52" : "w-14",
        )}
        role={role}
      />
      <main
        className={cn(
          "min-h-[calc(100vh-56px)] transition-[margin-left] duration-300 ease-in-out",
          isExpanded ? "md:ml-52" : "md:ml-14",
        )}
      >
        {children}
      </main>
      <Footer
        className={cn(
          "transition-[margin-left] duration-300 ease-in-out",
          isExpanded ? "md:ml-52" : "md:ml-14",
        )}
      />
    </>
  );
};
