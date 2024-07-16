"use client";

import { useImageUploadReducer } from "@/components/image-input/use-image-upload-reducer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FoodSchema } from "../food-schema";
import toast from "react-hot-toast";
import { Food, Image } from "@prisma/client";
import {
  createFoodAction,
  deleteFoodAction,
  editFoodAction,
} from "../food-action";
import { useImageToBeDeletedStore } from "@/components/image-input/use-image-to-be-deleted-store";
import { ImageState } from "@/components/image-input/image-input-type";

export function useFoodForm() {
  const router = useRouter();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addUrl, removeUrl } = useImageToBeDeletedStore();

  const onSubmit = async (
    data: FoodSchema,
    initialData: (Food & { images: Image[] }) | null,
    imageFiles: ImageState,
  ) => {
    //check price
    setLoading(true);

    //check if image is still uploading
    const imageStatus = imageFiles.reduce(
      (acc, file) => {
        const isLoading = file.isLoading || acc.isLoading;
        const isError = file.isError || acc.isError;
        return { isLoading, isError };
      },
      {
        isLoading: false,
        isError: false,
      },
    );

    if (imageStatus.isLoading) {
      toast.error("โปรดรอให้การอัพโหลดรูปภาพเสร็จสิ้น");
      setLoading(false);
      return;
    }

    if (imageStatus.isError) {
      toast.error("โปรดลองอัพโหลดรูปภาพใหม่อีกครั้ง");
      setLoading(false);
      return;
    }

    //create or edit food
    if (!initialData) {
      //create
      const images = imageFiles.map((file) => ({ url: file.getUrl }));
      const { food, error } = await createFoodAction({
        data: { ...data, images },
      });
      if (error) {
        toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
        console.error({ error });
        setLoading(false);
        return;
      }
      //remove image that has been uploaded from the uploadStore
      imageFiles.forEach((file) => {
        removeUrl(file.getUrl);
      });

      router.refresh();
      router.push(`/admin/food/${food.id}`);
      toast.success("เพิ่มรายการอาหารเรียบร้อยแล้ว");
      setLoading(false);
      return;
    }
    //edit food
    const images = imageFiles.map((file) => ({ url: file.getUrl }));
    const { food, error } = await editFoodAction({
      //note that images that is not in the form will be deleted in the database
      //becase image has a food id inside, so when we edit the food,
      //prisma will delete the image that is not included in data.images
      data: { ...data, images },
      id: initialData.id,
    });
    if (error) {
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      console.error({ error });
      setLoading(false);
      return;
    }
    //delete image (in cloudinary) that are not in the form but in the initialData.image
    const toBeDeletedImage = initialData.images.filter(
      (image) => !imageFiles.find((file) => file.name === image.id),
    );
    toBeDeletedImage.forEach((image) => addUrl(image.url));

    router.refresh();
    router.push(`/admin/food/${food.id}`);
    toast.success("แก้ไขอาหารเรียบร้อยแล้ว");
    setLoading(false);
    return;
  };
  const onDelete = async (initialData: (Food & { images: Image[] }) | null) => {
    if (!initialData) {
      toast.error("ไม่พบรายการอาหาร");
      return;
    }
    setLoading(true);
    const { error } = await deleteFoodAction({ id: initialData.id });
    setLoading(false);
    if (error) {
      toast.error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
      console.error({ error });
      setLoading(false);
      return;
    }
    setOpenDeleteConfirm(false);
    //delete image from cloudinary
    initialData.images.forEach((image) => {
      addUrl(image.url);
    });
    router.refresh();
    router.push("/admin/food");
    toast.success("ลบรายการอาหารเรียบร้อยแล้ว");
  };

  return {
    router,
    loading,
    openDeleteConfirm,
    setOpenDeleteConfirm,
    onSubmit,
    onDelete,
  };
}
