import { SideNavbarWrapper } from "@/components/navbar/side-navbar-wrapper";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return <SideNavbarWrapper role="admin">{children}</SideNavbarWrapper>;
};

export default AdminLayout;
