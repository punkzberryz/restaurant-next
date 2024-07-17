"use client";

import { useCallback } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import {
  MultipleImagesInputAction,
  MultipleImagesState,
  namingFile,
} from "./components/image-input-type";
import { cloudinaryFolderName } from "./components/folder-name";
import { useImageToBeDeletedStore } from "./components/use-image-to-be-deleted-store";
import {
  MultipleImagesInput,
  MultipleImagesInputWithImageFiles,
} from "./components/image-input-ui";
import { getCloudinaryUploadSignatureAction } from "./components/image-upload-action";
import { uploadImageCloudinary } from "./components/image-upload-query";
import { useImageUploadHooks } from "./components/use-image-upload-hooks";

interface MultipleImagesUploadInputProps {
  imageState: MultipleImagesState;
  imageDispatch: React.Dispatch<MultipleImagesInputAction>;
  folder: cloudinaryFolderName;
  id?: string;
}

export const MultipleImagesUploadInput = ({
  folder,
  imageDispatch,
  imageState: input,
  id = "dropzone-file",
}: MultipleImagesUploadInputProps) => {
  const { addUrl } = useImageToBeDeletedStore();
  const handleUploadFiles = useCallback(
    (files: FileList, stateLength: number) => {
      const { validFiles, error: errorMessage } = validateAndReturnFiles(
        files,
        stateLength,
      );
      if (!validFiles) {
        toast.error(errorMessage);
        return;
      }
      imageDispatch({
        type: "ADD_FILES_BEFORE_UPLOAD",
        payload: { files: validFiles },
      });
      // upload files and update state
      validFiles.forEach((file, index) => {
        uploadImage(file, folder).then((result) => {
          //update file state after upload
          imageDispatch({
            type: "UPADTE_FILE_STATE_AFTER_UPLOAD",
            payload: {
              file: {
                getUrl: result.url ?? "",
                name: namingFile(file.name, index),
                isError: result.url === undefined,
                isLoading: false,
              },
            },
          });
          if (result.url) {
            addUrl(result.url);
          }
        });
      });
    },
    [folder, imageDispatch, addUrl],
  );

  const { dragActive, handleChange, handleDrag, handleDrop } =
    useImageUploadHooks((files) => handleUploadFiles(files, input.length));
  const noInput = input.length === 0;

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
          {noInput ? (
            <MultipleImagesInput
              id={id}
              maxFileSize={MAX_FILE_SIZE}
              handleChange={handleChange}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
            />
          ) : (
            <MultipleImagesInputWithImageFiles
              imageState={input}
              handleChange={handleChange}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              imageDispatch={imageDispatch}
            />
          )}
        </div>
      </label>
    </div>
  );
};

function validateAndReturnFiles(files: FileList, stateLength: number) {
  const fileArray = Array.from(files);
  // validate file type and size
  const validFiles = fileArray.filter((file) => validateFileTypeAndSize(file));
  if (fileArray.length !== validFiles.length) {
    return {
      error:
        "Invalid file type or size. Please upload only PNG or JPEG files and size within 5MB.",
    };
  }
  if (stateLength + validFiles.length > 5) {
    return { error: "You can only upload a maximum of 5 files at a time." };
  }
  return { validFiles };
}

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
function validateFileTypeAndSize(file: File) {
  let valid = ALLOWED_FILE_TYPES.includes(file.type);
  valid = valid && file.size <= MAX_FILE_SIZE;
  return valid;
}
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/webp"];
