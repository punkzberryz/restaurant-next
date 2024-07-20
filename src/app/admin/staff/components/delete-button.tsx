"use client";

import { DeleteConfirmModal } from "@/components/delete-confirm-modal";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteStaffAction } from "./delete-staff-action";
import { DeleteStaffErrorResponse } from "./delete-staff-error-response";

export const DeleteButton = ({ staff }: { staff: User }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);

    const { error } = await deleteStaffAction({ staffId: staff.id });
    setLoading(false);
    if (error) {
      if (error.message === DeleteStaffErrorResponse.deleteSelfNotAllowed) {
        toast.error("ไม่สามารถลบตัวเองได้");
        return;
      }
      toast.error("เกิดข้อผิดพลาดในการลบพนักงาน");
      return;
    }
    router.refresh();
    toast.success("ลบพนักงานสำเร็จ");
    setOpen(false);
  };
  return (
    <>
      <Button
        className="-my-2 h-8 rounded-md px-2"
        onClick={() => setOpen(true)}
        variant="destructive"
        disabled={loading}
      >
        <Trash className="h-3 w-3" />
      </Button>
      <DeleteConfirmModal
        loading={loading}
        open={open}
        setOpen={setOpen}
        title={`ยืนยันการลบพนักงาน "${staff.displayName}"`}
        description="ข้อมูลพนักงานนี้จะถูกลบอย่างถาวร คุณแน่ใจที่จะลบหรือไม่?"
        onDelete={handleDelete}
      />
    </>
  );
};
