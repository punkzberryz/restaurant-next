import { Footer } from "@/components/footer";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ReactNode } from "react";

const AboutLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center">
        <MaxWidthWrapper className="space-y-8 md:px-20">
          {children}
        </MaxWidthWrapper>
      </main>
      <Footer />
    </>
  );
};

export default AboutLayout;
