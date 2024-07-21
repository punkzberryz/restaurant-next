import { SideNavbarWrapper } from "@/components/navbar/side-navbar-wrapper";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return <SideNavbarWrapper>{children}</SideNavbarWrapper>;
};

export default AdminLayout;
