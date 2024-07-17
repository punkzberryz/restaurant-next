"use client";

import { UseFormReturn } from "react-hook-form";
import { RestaurantFormSchema } from "./restaurant-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUploadInput } from "@/components/image-input/image-upload-input";
import {
  cloudinaryFolderName,
  SingleImageInputAction,
  SingleImageState,
  useSingleImageUploadReducer,
} from "@/components/image-input";

interface LogoImageFieldProps {
  form: UseFormReturn<RestaurantFormSchema>;
  imageState: SingleImageState | null;
  imageDispatch: React.Dispatch<SingleImageInputAction>;
}
export const LogoImageField = ({
  form,
  imageDispatch,
  imageState,
}: LogoImageFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="logoImageUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="dropzone-file">โลโก้ร้าน</FormLabel>
          <FormControl>
            <ImageUploadInput
              folder={cloudinaryFolderName.foods}
              imageState={imageState}
              onUpload={field.onChange}
              imageDispatch={imageDispatch}
              id="dropzone-file"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
