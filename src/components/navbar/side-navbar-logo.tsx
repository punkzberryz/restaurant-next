"use client";

import { Logo } from "../icons";
import { useToggleSideNav } from "./use-toggle-sidenav";

export const SideNavbarLogo = () => {
  const { isExpanded } = useToggleSideNav();
  return (
    <div className="flex items-center space-x-1 py-1 pl-2">
      <Logo />
      <span className="text-lg" hidden={!isExpanded}>
        RMS
      </span>
    </div>
  );
};
