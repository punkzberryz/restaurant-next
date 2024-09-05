import { cn } from "@/lib/utils";
import { MaxWidthWrapper } from "./max-width-wrapper";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={cn(className, "border-t")}>
      <MaxWidthWrapper className="flex items-center space-x-4 pt-2">
        <p>
          Open source project by
          <Button asChild variant="link">
            <Link href="/about/me">Kang T Lee</Link>
          </Button>
        </p>
        <p>
          เรียนรู้เกี่ยวกับระบบ
          <Button asChild variant="link">
            <Link href="/about">
              RMS <ArrowRight className="ml-2 inline h-4 w-4" />
            </Link>
          </Button>
        </p>
      </MaxWidthWrapper>
    </footer>
  );
};
