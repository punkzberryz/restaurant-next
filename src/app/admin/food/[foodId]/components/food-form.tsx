"use client";

import { Food } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FoodSchema } from "./food-schema";
import { FieldErrors, useForm } from "react-hook-form";
import { categorySchema } from "@/app/admin/category/[categoryId]/components/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DeleteConfirmModal } from "@/app/admin/category/components/delete-confirm-modal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingBars } from "@/components/ui/loading-bars";
import { ImageField } from "./image-field";
import { useImageUploadReducer } from "@/components/image-input/use-image-upload-reducer";

interface FoodFormProps {
  initialData: Food | null;
  title: string;
  isNew: boolean;
}
export const FoodForm = ({ initialData, title, isNew }: FoodFormProps) => {
  const router = useRouter();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageFiles, imageDispatch] = useImageUploadReducer();

  const onSubmit = async (data: FoodSchema) => {};
  const form = useForm<FoodSchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name ?? "",
    },
  });
  const onDelete = async () => {};
  return (
    <>
      {/* Delete Modal */}
      <DeleteConfirmModal
        open={openDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        onDelete={onDelete}
        title="ยืนยันการลบอาหาร"
        loading={loading}
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
          <ImageField imageState={imageFiles} imageDispatch={imageDispatch} />
          {/* Buttons */}
          <Button type="submit" disabled={loading}>
            {loading ? <LoadingBars /> : isNew ? "สร้าง" : "บันทึก"}
          </Button>
          <Button
            variant="secondary"
            onClick={router.back}
            disabled={loading}
            type="button"
          >
            ยกเลิก
          </Button>
        </form>
      </Form>
    </>
  );
};
const onSubmitError = (err: FieldErrors<FoodSchema>) => {};
