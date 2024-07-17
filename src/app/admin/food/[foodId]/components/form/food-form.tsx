"use client";

import { Category, Food, Image } from "@prisma/client";
import { useEffect, useState } from "react";
import { foodSchema, FoodSchema } from "../../../components/food-schema";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Form } from "@/components/ui/form";
import { LoadingBars } from "@/components/ui/loading-bars";
import { ImageField } from "../image-field";
import { CategoryField } from "./category-field";
import { NameField } from "./name-field";
import { PriceField } from "./price-field";
import { UnitField } from "./unit-field";
import { useFoodForm } from "./use-food-form";
import { DeleteConfirmModal } from "@/components/delete-confirm-modal";
import { useMultipleImagesUploadReducer } from "@/components/image-input";

interface FoodFormProps {
  initialData: (Food & { images: Image[] }) | null;
  title: string;
  isNew: boolean;
  categories: Category[];
}

export const FoodForm = ({
  initialData,
  title,
  isNew,
  categories,
}: FoodFormProps) => {
  const [imageFiles, imageDispatch] = useMultipleImagesUploadReducer();
  const {
    loading,
    onDelete,
    onSubmit,
    openDeleteConfirm,
    router,
    setOpenDeleteConfirm,
  } = useFoodForm();

  const form = useForm<FoodSchema>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      price: initialData?.price,
      description: initialData?.description ?? "",
      categoryId: initialData?.categoryId,
      unit: initialData?.unit,
      images: initialData?.images ?? [],
    },
  });

  useEffect(() => {
    const initState = initialData?.images.map((image) => ({
      getUrl: image.url,
      name: image.id,
      isError: false,
      isLoading: false,
    }));
    if (initState) {
      imageDispatch({ type: "SET_FILES", payload: { files: initState } });
    }
  }, [imageDispatch, initialData?.images]);

  return (
    <>
      {/* Delete Modal */}
      <DeleteConfirmModal
        open={openDeleteConfirm}
        setOpen={setOpenDeleteConfirm}
        onDelete={() => onDelete(initialData)}
        title={`ยืนยันการลบ ${initialData?.name}`}
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
          onSubmit={form.handleSubmit(
            (data) => onSubmit(data, initialData, imageFiles),
            onSubmitError,
          )}
          className="flex flex-col space-y-6"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <CategoryField categories={categories} form={form} />
            <NameField form={form} />
            <PriceField form={form} />
            <UnitField form={form} />
          </div>
          <ImageField imageState={imageFiles} imageDispatch={imageDispatch} />

          {/* Buttons */}
          <div className="flex flex-col gap-4 md:flex-row-reverse">
            <Button type="submit" className="min-w-[150px]" disabled={loading}>
              {loading ? <LoadingBars /> : isNew ? "สร้าง" : "บันทึก"}
            </Button>
            <Button
              className="min-w-[150px]"
              variant="secondary"
              onClick={() => router.push("/admin/food")}
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
const onSubmitError = (err: FieldErrors<FoodSchema>) => {};
