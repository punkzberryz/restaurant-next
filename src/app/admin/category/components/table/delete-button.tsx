"use client";

import { useState } from "react";
import { DeleteConfirmModal } from "../delete-confirm-modal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Category } from "@prisma/client";
import { deleteCategoryAction } from "../category-action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const DeleteButton = ({ category }: { category: Category }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    const { error } = await deleteCategoryAction({
      categoryId: category.id,
    });
    setLoading(false);
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการลบหมวดหมู่อาหาร");
      toast.error("โปรดลบรายการอาหารในหมวดหมู่นี้ก่อน");
      return;
    }
    router.refresh();
    toast.success("ลบหมวดหมู่อาหารสำเร็จ");
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
        title={`ยืนยันการลบหมวดหมู่ "${category.name}"`}
        description="หมวดหมู่นี้จะถูกลบอย่างถาวร คุณแน่ใจที่จะลบหรือไม่?"
        onDelete={handleDelete}
      />
    </>
  );
};
