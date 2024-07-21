import { SideNavbarWrapper } from "@/components/navbar/side-navbar-wrapper";
import { ReactNode } from "react";

const CashierLayout = ({ children }: { children: ReactNode }) => {
  return <SideNavbarWrapper role="cashier">{children}</SideNavbarWrapper>;
};

export default CashierLayout;
