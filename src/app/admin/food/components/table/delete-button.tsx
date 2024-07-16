"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Food } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DeleteConfirmModal } from "@/components/delete-confirm-modal";
import { deleteFoodAction } from "../food-action";

export const DeleteButton = ({ food }: { food: Food }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    const { error } = await deleteFoodAction({
      id: food.id,
    });
    setLoading(false);
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการลบอาหาร");
      return;
    }
    router.refresh();
    toast.success("ลบอาหารสำเร็จ");
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
        title={`ยืนยันการลบ "${food.name}"`}
        description="อาหารรายการนี้จะถูกลบอย่างถาวร คุณแน่ใจที่จะลบหรือไม่?"
        onDelete={handleDelete}
      />
    </>
  );
};
