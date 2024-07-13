import { Footer } from "@/components/footer";
import { SideNavbar } from "@/components/navbar/side-navbar";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SideNavbar className="fixed left-0 top-0 z-20 -translate-x-full transition-transform duration-300 ease-in-out md:translate-x-0" />
      <main className="min-h-[calc(100vh-56px)] transition-[margin-left] duration-300 ease-in-out md:ml-[208px]">
        {children}
      </main>
      <Footer clasName="md:ml-[208px] transition-[margin-left] duration-300 ease-in-out" />
    </>
  );
};

export default AdminLayout;
