import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

const AboutMePage = () => {
  return (
    <Card>
      <CardHeader className="flex flex-col items-center">
        <Logo />
        <h1 className="text-primary">ระบบ Restaurant Management System</h1>
        <CardDescription>
          ระบบ Restaurant Management System หรือ RMS
          คือระบบที่ช่วยจัดการร้านอาหาร
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <h2 className="text-primary">ฟีเจอร์</h2>
        <p className="text-gray-700 dark:text-gray-300">
          ช่วยให้คุณไม่ต้องสร้างตาราง excel ด้วยตนเอง
          และไม่ต้องคอยจดมบันทึกข้อมูลซ้ำซ้อนหลังจบวัน
          การรับออร์เดอร์จากลูกค้าสามารถทำผ่านมือถือที่ต่อกับ internet
          เพื่อบันทึกเข้าระบบได้โดยตรง
        </p>
        <ul className="space-y-4 pl-4">
          {features.map((f, i) => (
            <ListItem key={i} label={f} />
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <div>
          สามารถทดลอง Demo ได้โดยการล็อคอิน
          <ArrowRight className="mx-1 inline h-4 w-4 text-primary/50" />
          <Button asChild variant="link">
            <Link href="/auth/signin">ล็อคอิน</Link>
          </Button>
        </div>
        <div>
          หรือ ติดต่อผู้ออกแบบได้ที่
          <Button asChild variant="link">
            <Link href="/about/me">ลิงค์</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const features = [
  "จัดการพนักงานร้านอาหาร",
  "จัดการหมวดหมู่อาหาร",
  "จัดการเมนูอาหาร",
  "จัดการบิล ออเดอร์ลูกค้า",
  "รวมสถิติยอดขายต่อเดือน / ปี",
];
const ListItem = ({ label }: { label: string }) => {
  return (
    <li>
      <CheckCircle2 className="mr-2 inline text-green-400" />
      {label}
    </li>
  );
};
export default AboutMePage;
export const metadata: Metadata = {
  title: "เกี่ยวกับระบบ",
  description: "เรียนรู้เกี่ยวกับตัว Restaurant Management System",
};
