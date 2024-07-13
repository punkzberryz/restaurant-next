import { cn } from "@/lib/utils";
import { MaxWidthWrapper } from "./max-width-wrapper";

export const Footer = ({ clasName }: { clasName?: string }) => {
  return (
    <footer className={cn(clasName, "border-t")}>
      <MaxWidthWrapper className="pt-2">
        <p>Open source project by Kang T Lee</p>
      </MaxWidthWrapper>
    </footer>
  );
};
