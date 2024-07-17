"use client";

import { useCallback } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import {
  SingleImageInputAction,
  SingleImageState,
} from "./components/image-input-type";
import { cloudinaryFolderName } from "./components/folder-name";
import { useImageToBeDeletedStore } from "./components/use-image-to-be-deleted-store";
import { SingleImageInput } from "./components/image-input-ui";
import { getCloudinaryUploadSignatureAction } from "./components/image-upload-action";
import { uploadImageCloudinary } from "./components/image-upload-query";
import { useImageUploadHooks } from "./components/use-image-upload-hooks";

interface ImageUploadInputProps {
  folder: cloudinaryFolderName;
  onUpload: (url: string) => void;
  imageDispatch: React.Dispatch<SingleImageInputAction>;
  imageState: SingleImageState | null;
  id: string;
}
export const ImageUploadInput = ({
  folder,
  onUpload,
  imageState,
  imageDispatch,
  id,
}: ImageUploadInputProps) => {
  const { addUrl } = useImageToBeDeletedStore();

  const handleUploadFile = useCallback(
    (files: FileList) => {
      // validate file type and size
      const validFile = validateFileTypeAndSize(files[0]);
      if (!validFile) {
        toast.error(
          "Invalid file type or size. Please upload only PNG or JPEG files and size within 5MB.",
        );
        return;
      }

      imageDispatch({
        type: "ADD_FILE_BEFORE_UPLOAD",
        payload: { file: files[0] },
      });
      //upload file

      uploadImage(files[0], folder).then((result) => {
        if (result.url) {
          addUrl(result.url);
          onUpload(result.url);
          imageDispatch({
            type: "UPDATE_FILE_STATE_AFTER_UPLOAD",
            payload: {
              file: {
                getUrl: result.url,
                name: files[0].name,
                isError: false,
                isLoading: false,
              },
            },
          });
          return;
        }
        //error
        imageDispatch({
          type: "UPDATE_FILE_STATE_AFTER_UPLOAD",
          payload: {
            file: {
              getUrl: "",
              name: files[0].name,
              isError: true,
              isLoading: false,
            },
          },
        });
      });
    },
    [folder, addUrl, onUpload, imageDispatch],
  );

  const { dragActive, handleChange, handleDrag, handleDrop } =
    useImageUploadHooks(handleUploadFile);
  const noInput = imageState === null;

  return (
    <div
      onDragEnter={handleDrag}
      className="flex h-full w-full max-w-4xl items-center"
    >
      <label
        htmlFor={id}
        className={cn(
          "group relative flex aspect-video h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 transition dark:border-gray-600",
          { "dark:border-slate-400 dark:bg-slate-800": dragActive },
          { "aspect-auto h-fit": !noInput },
          { "items-start justify-start": !noInput },
          { "dark:hover:border-gray-500 dark:hover:bg-slate-800": noInput },
        )}
      >
        <div
          className={cn(
            "relative flex h-full w-full flex-col items-center justify-center",
            {
              "item-start": !noInput,
            },
          )}
        >
          <SingleImageInput
            id={id}
            imageState={imageState}
            handleChange={handleChange}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            maxFileSize={MAX_FILE_SIZE}
          />
        </div>
      </label>
    </div>
  );
};

function validateFileTypeAndSize(file: File) {
  let valid = ALLOWED_FILE_TYPES.includes(file.type);
  valid = valid && file.size <= MAX_FILE_SIZE;
  return valid;
}
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/webp"];
const uploadImage = async (
  file: File,
  folder: cloudinaryFolderName,
): Promise<{ url?: string }> => {
  //get presigned url
  try {
    const { error, data: signData } = await getCloudinaryUploadSignatureAction({
      folder,
    });
    if (error) {
      throw new Error(error.message);
    }
    // //upload image
    const resp = await uploadImageCloudinary({
      image: file,
      signData,
    });

    return resp;
  } catch (err) {
    return {};
  }
};
