"use client";

import {
  SingleImageState,
  useImageToBeDeletedStore,
} from "@/components/image-input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RestaurantFormSchema } from "./restaurant-schema";
import toast from "react-hot-toast";
import { Restaurant } from "@prisma/client";
import {
  createRestaurantAction,
  editRestaurantAction,
} from "./restaurant-action";

export const useRestaurantForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { removeUrl } = useImageToBeDeletedStore();
  const onSubmit = async (
    data: RestaurantFormSchema,
    initialData: Restaurant | null,
    imageState: SingleImageState | null,
  ) => {
    setLoading(true);
    //check if image is still uploading
    if (imageState?.isLoading) {
      toast.error("โปรดรอให้การอัพโหลดรูปภาพเสร็จสิ้น");
      setLoading(false);
      return;
    }
    if (imageState?.isError) {
      toast.error("โปรดลองอัพโหลดรูปภาพใหม่อีกครั้ง");
      setLoading(false);
      return;
    }
    //create or edit restaurant
    if (!initialData) {
      //create
      const { error } = await createRestaurantAction({ data });
      if (error) {
        toast.error("เกิดข้อผิดพลาด โปรดลองอีกครั้ง");
        console.error({ error });
        setLoading(false);
        return;
      }
      //remove image that has been upload from the uploadStore
      if (imageState?.getUrl) {
        removeUrl(imageState.getUrl);
      }
      //success
      router.refresh();
      toast.success("สร้างร้านอาหารสำเร็จ");
      setLoading(false);
      return;
    }
    //edit restaurant
    const { error } = await editRestaurantAction({
      data,
      id: initialData.id,
    });
    if (error) {
      toast.error("เกิดข้อผิดพลาด โปรดลองอีกครั้ง");
      console.error({ error });
      setLoading(false);
      return;
    }
    //remove image that has been upload from the uploadStore
    if (imageState?.getUrl) {
      removeUrl(imageState.getUrl);
    }
    //success
    router.refresh();
    toast.success("แก้ไขร้านอาหารสำเร็จ");
    setLoading(false);
  };

  return { router, loading, onSubmit };
};
