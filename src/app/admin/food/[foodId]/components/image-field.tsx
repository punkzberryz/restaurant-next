"use client";

import {
  cloudinaryFolderName,
  MultipleImagesInputAction,
  MultipleImagesState,
} from "@/components/image-input";
import { MultipleImagesUploadInput } from "@/components/image-input/multiple-images-upload-input";
import { Label } from "@/components/ui/label";

interface ImageFieldProps {
  imageState: MultipleImagesState;
  imageDispatch: React.Dispatch<MultipleImagesInputAction>;
}
export const ImageField = ({ imageDispatch, imageState }: ImageFieldProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label>Images</Label>
      <MultipleImagesUploadInput
        imageDispatch={imageDispatch}
        imageState={imageState}
        folder={cloudinaryFolderName.foods}
      />
    </div>
  );
};
