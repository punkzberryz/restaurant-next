"use client";

import { Form } from "@/components/ui/form";
import { Restaurant } from "@prisma/client";
import { FieldErrors, useForm } from "react-hook-form";
import {
  restaurantFormSchema,
  RestaurantFormSchema,
} from "./restaurant-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { NamePhoneAddressFields } from "./name-phone-address-fields";
import { Button } from "@/components/ui/button";
import { LoadingBars } from "@/components/ui/loading-bars";
import { DescriptionField } from "./description-field";
import { LogoImageField } from "./logo-image-field";
import { useSingleImageUploadReducer } from "@/components/image-input";
import { useEffect } from "react";
import { useRestaurantForm } from "./use-restaurant-form";

interface RestaurantFormProps {
  restaurant: Restaurant | null;
}
export const RestaurantForm = ({ restaurant }: RestaurantFormProps) => {
  const [imageFile, imageDispatch] = useSingleImageUploadReducer();
  const { loading, onSubmit, router } = useRestaurantForm();
  const form = useForm<RestaurantFormSchema>({
    resolver: zodResolver(restaurantFormSchema),
    defaultValues: {
      name: restaurant?.name ?? "",
      description: restaurant?.description ?? "",
      address: restaurant?.address ?? "",
      phone: restaurant?.phone ?? "",
      logoImageUrl: restaurant?.logoImageUrl ?? "",
    },
  });

  //update image state if exist
  useEffect(() => {
    if (restaurant?.logoImageUrl) {
      imageDispatch({
        type: "SET_FILE",
        payload: {
          file: {
            getUrl: restaurant.logoImageUrl,
            name: "Logo",
            isError: false,
            isLoading: false,
          },
        },
      });
    }
  }, [imageDispatch, restaurant?.logoImageUrl]);
  //TODO: find a way to delete image from cloudinary
  //we can't do it here because it will be deleted immediately when user add new image

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-6"
        onSubmit={form.handleSubmit(
          (data) => onSubmit(data, restaurant, imageFile),
          onSubmitError,
        )}
      >
        <NamePhoneAddressFields form={form} />
        <DescriptionField form={form} />
        <LogoImageField
          form={form}
          imageDispatch={imageDispatch}
          imageState={imageFile}
        />
        {/* Buttons */}
        <div className="flex flex-col gap-4 md:flex-row-reverse">
          <Button type="submit" className="min-w-[150px]" disabled={loading}>
            {loading ? <LoadingBars /> : restaurant?.id ? "บันทึก" : "สร้าง"}
          </Button>
          <Button
            className="min-w-[150px]"
            variant="secondary"
            disabled={loading}
            type="button"
            onClick={() => {
              form.reset();
              if (restaurant?.logoImageUrl)
                imageDispatch({
                  type: "SET_FILE",
                  payload: {
                    file: {
                      getUrl: restaurant.logoImageUrl,
                      name: "Logo",
                      isError: false,
                      isLoading: false,
                    },
                  },
                });
            }}
          >
            ยกเลิก
          </Button>
        </div>
      </form>
    </Form>
  );
};
const onSubmitError = (err: FieldErrors<RestaurantFormSchema>) => {};
