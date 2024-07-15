"use client";
import { cloudinaryFolderName } from "@/components/image-input/folder-name";
import {
  ImageInputAction,
  ImageState,
} from "@/components/image-input/image-input-type";
import { ImageUploadInput } from "@/components/image-input/image-upload-input";
import { Label } from "@/components/ui/label";

interface ImageFieldProps {
  imageState: ImageState;
  imageDispatch: React.Dispatch<ImageInputAction>;
}
export const ImageField = ({ imageDispatch, imageState }: ImageFieldProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label>Images</Label>
      <ImageUploadInput
        imageDispatch={imageDispatch}
        imageState={imageState}
        folder={cloudinaryFolderName.foods}
      />
    </div>
  );
};
