import { Footer } from "@/components/footer";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
