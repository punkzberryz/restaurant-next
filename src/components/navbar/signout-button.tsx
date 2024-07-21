"use client";
import { LogOut } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import React, { useState } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { config } from "@/lib/config";
import { LoadingBars } from "../ui/loading-bars";

export const SignOutButton = ({
  variant,
  className,
  isExpanded,
}: {
  className?: string;
  variant?: ButtonProps["variant"];
  isExpanded: boolean;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={
            className ?? "mx-4 flex w-full cursor-pointer items-center"
          }
        >
          <LogOut className="mr-3 h-6 w-6" />
          <span hidden={!isExpanded}>ออกจากระบบ</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ออกจากระบบ</DialogTitle>
          <DialogDescription>คุณต้องการออกจากระบบใช่หรือไม่?</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 pt-4 md:flex-row-reverse">
          <Button
            disabled={loading}
            onClick={() => handleSignout(router, setLoading)}
          >
            {loading ? (
              <LoadingBars className="h-6 w-6" />
            ) : (
              <span>ออกจากระบบ</span>
            )}
          </Button>
          <Button
            disabled={loading}
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            ยกเลิก
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const SignOutDropdownItem = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <DropdownMenuItem
      disabled={loading}
      className="hover:cursor-pointer"
      onClick={() => handleSignout(router, setLoading)}
    >
      <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
      {loading ? <LoadingBars className="h-6 w-6" /> : <span>ออกจากระบบ</span>}
    </DropdownMenuItem>
  );
};

async function handleSignout(
  router: ReturnType<typeof useRouter>,
  setLoading: (loading: boolean) => void,
) {
  setLoading(true);
  const resp = await fetch(`${config.baseUrl}/auth/signout`, {
    method: "GET",
    cache: "no-store",
  });
  setLoading(false);
  if (!resp.ok) {
    console.error({
      status: resp.status,
      text: resp.statusText,
      data: await resp.json(),
    });
    toast.error("เกิดข้อผิดพลาดในการออกจากระบบ");
    return;
  }
  toast.success("ออกจากระบบสำเร็จ");
  router.push("/auth/signin");
  router.refresh();
  return;
}
