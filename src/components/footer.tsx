import { cn } from "@/lib/utils";
import { MaxWidthWrapper } from "./max-width-wrapper";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={cn(className, "border-t")}>
      <MaxWidthWrapper className="pt-2">
        <p>Open source project by Kang T Lee</p>
      </MaxWidthWrapper>
    </footer>
  );
};
