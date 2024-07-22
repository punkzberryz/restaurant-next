import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ReactNode } from "react";

export const AdsInfo = () => {
  return (
    <HoverInfo>
      <div className="rounded-md border p-4 shadow">
        <p>Demo:</p>
        <p className="flex space-x-4">
          <span>admin: admin@admin.com</span>
          <span>password: admin1234</span>
        </p>
        <p className="flex space-x-4">
          <span>cashier: cashier@cashier.com</span>
          <span>password: cashier1234</span>
        </p>
      </div>
    </HoverInfo>
  );
};

const HoverInfo = ({ children }: { children: ReactNode }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent align="center" className="w-full p-6">
        <div className="flex flex-col space-y-4">
          <p className="text-lg font-semibold">
            Demo ระบบจัดการร้านอาหารเพื่อรับออร์เดอร์ลูกค้า
          </p>
          <p>สามารถใช้ข้อมูลด้านบนเพื่อล็อคอินเข้าสู่ระบบเพื่อทดสอบ</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
