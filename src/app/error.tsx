"use client";

import {
  getMessageIfUnauthorized,
  ErrorUi,
  UnauthorizedMessageCode,
} from "@/components/error-ui";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const errMessage = getMessageIfUnauthorized(error.message);

  if (errMessage) {
    return (
      <ErrorUi title="401 ไม่ได้รับอนุญาต">
        <p className="pb-5 text-base font-light md:text-lg">
          <span>คุณไม่ได้รับอนุญาตให้เข้าถึงหน้านี้เนื่องจาก...</span>
          <span>{errMessage}</span>
        </p>
        <div className="grid grid-cols-1 gap-y-4">
          {errMessage ===
          getMessageIfUnauthorized(UnauthorizedMessageCode.notSignIn) ? (
            <Button className="w-full" asChild>
              <Link href="/auth/signin">เข้าสู่ระบบ</Link>
            </Button>
          ) : (
            <Button className="w-full" asChild>
              <Link href="/">กลับไปยังหน้าหลัก</Link>
            </Button>
          )}
        </div>
      </ErrorUi>
    );
  }
  return (
    <ErrorUi title="อุ๊ปปปซ์">
      <p className="pb-5 text-base font-light md:text-lg">
        <span>เกิดข้อมูลผิดในการดึงข้อมูล</span>
      </p>
      <div className="grid grid-cols-1 gap-y-4">
        <Button
          className="w-full"
          onClick={() => {
            startTransition(() => {
              router.refresh();
              reset();
            });
          }}
        >
          กดปุ่มเพื่อลองอีกครั้ง
        </Button>
      </div>
    </ErrorUi>
  );
}
