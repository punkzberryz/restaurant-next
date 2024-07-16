"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { categorySchema, CategorySchema } from "./category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  createCategoryAction,
  deleteCategoryAction,
  editCategoryAction,
} from "../../components/category-action";
import toast from "react-hot-toast";
import { LoadingBars } from "@/components/ui/loading-bars";
import { DeleteConfirmModal } from "../../../../../components/delete-confirm-modal";

interface CategoryFormProps {
  initialData: Category | null;
  title: string;
  isNew: boolean;
}
export const CategoryForm = ({
  initialData,
  title,
  isNew,
}: CategoryFormProps) => {
  const router = useRouter();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: CategorySchema) => {
    setLoading(true);
    let categoryId: number;
    if (isNew || !initialData) {
      const { error, category } = await createCategoryAction({ data });
      setLoading(false);
      if (error) {
        toast.error("เกิดข้อผิดพลาดในการสร้างหมวดหมู่อาหาร");
        return;
      }
      categoryId = category.id;
    } else {
      const { category, error } = await editCategoryAction({
        data,
        categoryId: initialData.id,
      });
      setLoading(false);
      if (error) {
        toast.error("เกิดข้อผิดพลาดในการแก้ไขหมวดหมู่อาหาร");
        return;
      }
      categoryId = category.id;
    }
    router.refresh();
    router.push(`/admin/category/${categoryId}`);
    toast.success("บันทึกข้อมูลหมวดหมู่อาหารสำเร็จ");
  };
  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: initialData?.name ?? "" },
  });
  const onDelete = async () => {
    if (!initialData) return;
    setLoading(true);
    const { error } = await deleteCategoryAction({
      categoryId: initialData.id,
    });
    setLoading(false);
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการลบหมวดหมู่อาหาร");
      toast.error("โปรดลบรายการอาหารในหมวดหมู่นี้ก่อน");
      return;
    }
    router.refresh();
    router.push("/admin/category");
    toast.success("ลบหมวดหมู่อาหารสำเร็จ");
  };
  return (
    <>
      {/* Delete Modal */}
      <DeleteConfirmModal
        open={openDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        title="ยืนยันการลบหมวดหมู่"
        loading={loading}
        onDelete={onDelete}
      />
      {/* Title */}
      <div className="flex items-center space-x-4">
        <h1 className="font-semibold md:text-3xl">{title}</h1>
        {isNew ? null : (
          <Button
            size="sm"
            onClick={() => setOpenDeleteConfirm(true)}
            variant="destructive"
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onSubmitError)}
          className="flex flex-col space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อหมวดหมู่อาหาร</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4 md:flex-row-reverse">
            <Button className="min-w-[150px]" type="submit" disabled={loading}>
              {loading ? <LoadingBars /> : isNew ? "สร้าง" : "บันทึก"}
            </Button>
            <Button
              className="min-w-[150px]"
              variant="secondary"
              onClick={() => router.push("/admin/category")}
              disabled={loading}
              type="button"
            >
              ยกเลิก
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

const onSubmitError = (error: FieldErrors<CategorySchema>) => {};
