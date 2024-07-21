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
import { signoutAction } from "./signout-action";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useToggleSideNav } from "./use-toggle-sidenav";

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
          <Button onClick={() => handleSignout(router)}>ออกจากระบบ</Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            ยกเลิก
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export const SignOutDropdownItem = () => {
  const router = useRouter();

  return (
    <DropdownMenuItem
      className="hover:cursor-pointer"
      onClick={() => handleSignout(router)}
    >
      <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
      ออกจากระบบ
    </DropdownMenuItem>
  );
};

async function handleSignout(router: ReturnType<typeof useRouter>) {
  const { error } = await signoutAction();
  if (error) {
    console.error(error.message);
    toast.error("เกิดข้อผิดพลาด");
    return;
  }
  toast.success("ออกจากระบบสำเร็จ");
  router.refresh();
  router.push("/auth/signin");
  // window.location.replace("/auth/signin");
}
