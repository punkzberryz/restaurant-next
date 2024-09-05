import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const AboutMePage = () => {
  return (
    <div>
      <section id="me">
        <Card>
          <CardHeader>
            <CardTitle>เกี่ยวกับผู้เขียน</CardTitle>
            <CardDescription>
              ผมรับจ้างเขียน App แบบ Customize
              สร้างระบบช่วยให้คุณจัดการธุรกิจได้ง่ายขึ้น
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mx-auto mb-4 h-[100px] w-[100px] overflow-clip rounded-full">
              <Image
                src="/img/me.webp"
                alt="kangtlee"
                className="object-contain"
                fill
                sizes="100px"
                priority
              />
            </div>
            <p>
              สวัสดีครับ ผม
              <Link
                className="mx-1 text-primary underline-offset-4 hover:text-primary/50 hover:underline"
                href="https://www.kangtlee.com"
              >
                Kang T Lee
              </Link>
              ผมรับจ้างเขียน App แบบ Customize ได้
              เพื่อช่วยสร้างระบบจัดการธุรกิจของคุณให้ดำเนินได้อย่างสะดวก
              และมีประสิทธิภาพมากขึ้น
            </p>
            <p>
              หากคุณมีธุรกิจร้านอาหารขนาดเล็ก
              หรือธุรกิจอื่นๆที่สนใจจะใช้ระบบเข้ามาช่วยจัดการ
              แทนการบันทึกข้อมูลด้วยตนเองลงกระดาษ สามารถติดต่อผมได้ที่
              <Button asChild variant="link">
                <Link href="https://www.kangtlee.com/contact">
                  kangtlee.com
                </Link>
              </Button>
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AboutMePage;
export const metadata: Metadata = {
  title: "เกี่ยวกับผู้เขียน | Kang T Lee",
  description:
    "เรียนรู้เกี่ยวกับตัวผู้ออกแบบระบบจัดการร้านอาหารโดย Kang T Lee ที่มีประสบการณ์ในวงการเทคโนโลยีมากว่า 10 ปี และมีความเชี่ยวชาญในการเขียนเว็บไซท์ระบบจัดการธุรกิจขนาดเล็ก",
};
