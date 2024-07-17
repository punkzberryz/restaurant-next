"use client";

import { Loader2, PlusIcon, UploadCloud, XCircleIcon } from "lucide-react";
import {
  MultipleImagesInputAction,
  FileWithUrl,
  MultipleImagesState,
} from "./image-input-type";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImageActionButtons } from "./image-action-buttons";

export const SingleImageInput = ({
  imageState: input,
  handleDrag,
  handleChange,
  handleDrop,
  maxFileSize,
  id,
}: {
  imageState: FileWithUrl | null;
  handleDrag: (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxFileSize: number;
  id: string;
}) => {
  return (
    <>
      <div
        className="flex h-full w-full cursor-pointer flex-col items-center justify-center p-10"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          onChange={handleChange}
          accept="image/jpeg, image/jpg, image/png, image/webp"
          id={id}
          type="file"
          className="hidden"
        />
        {input ? (
          <div className="relative flex h-96 w-96 cursor-pointer">
            {input.isLoading && (
              <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center">
                <UploadCloud className="h-10 w-10 animate-bounce text-black" />
                <p className="text-lg font-semibold">กำลังอัพโหลด...</p>
              </div>
            )}
            {input.isError ? (
              <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center">
                <XCircleIcon className="h-10 w-10 text-red-500" />
                <p className="text-lg font-semibold">
                  เกิดข้อผิดพลาดในการอัพโหลด...
                </p>
              </div>
            ) : (
              <Image
                style={{ objectFit: "contain" }}
                src={input.getUrl}
                fill
                alt={input.name}
                className={input.isLoading ? "opacity-40" : ""}
              />
            )}
          </div>
        ) : (
          <>
            <UploadCloud className="mb-3 h-10 w-10 text-gray-400 dark:text-gray-600" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">คลิกเพื่ออัพโหลดรูป</span>{" "}
              หรือลากรูปมาวางในกล่อง
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              อัพโหลดได้สูงสุด 1 รูป ขนาดไม่เกิน{" "}
              {(maxFileSize / 1000000).toFixed(0)}MB ต่อรูป
            </p>
          </>
        )}
      </div>
    </>
  );
};

export const MultipleImagesInput = ({
  handleDrag,
  handleChange,
  handleDrop,
  maxFileSize,
  id,
}: {
  handleDrag: (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxFileSize: number;
  id: string;
}) => {
  return (
    <>
      <div
        className="absolute inset-0 cursor-pointer"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      ></div>
      <UploadCloud className="mb-3 h-10 w-10 text-gray-400 dark:text-gray-600" />
      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">คลิกเพื่ออัพโหลดรูป</span>{" "}
        หรือลากรูปมาวางในกล่อง
      </p>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        อัพโหลดได้สูงสุด 5 รูป ขนาดไม่เกิน {(maxFileSize / 1000000).toFixed(0)}
        MB ต่อรูป
      </p>

      <input
        multiple
        onChange={handleChange}
        accept="image/jpeg, image/jpg, image/png, image/webp"
        id={id}
        type="file"
        className="hidden"
      />
    </>
  );
};

export const MultipleImagesInputWithImageFiles = ({
  imageState: input,
  handleDrag,
  handleChange,
  handleDrop,
  imageDispatch,
}: {
  imageState: MultipleImagesState;
  handleDrag: (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageDispatch: React.Dispatch<MultipleImagesInputAction>;
}) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow sm:rounded-lg">
            <table className="min-w-full divide-y dark:divide-slate-600">
              <thead className="bg-slate-200 dark:bg-slate-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300"
                  >
                    Preview
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300"
                  ></th>
                </tr>
              </thead>
              <tbody className="relative divide-y divide-slate-400 dark:divide-slate-600">
                {input.map((file, index) => (
                  <ImageUploadDisplayItem
                    key={index}
                    file={file}
                    imageDispatch={imageDispatch}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
            <label
              htmlFor="dropzone-file-images-present"
              className="group relative flex cursor-pointer justify-center border-t border-slate-400 py-4 transition hover:border-gray-500 hover:bg-slate-200 dark:border-slate-600 hover:dark:bg-slate-800"
            >
              <PlusIcon className="h-12 w-12 stroke-1 text-slate-500 transition group-hover:text-slate-600 group-hover:dark:text-slate-400" />
              <input
                multiple
                onChange={handleChange}
                accept="image/jpeg, image/jpg, image/png"
                type="file"
                id="dropzone-file-images-present"
                className="relative z-20 hidden"
              />
              <div
                className="absolute inset-0"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageUploadDisplayItem = ({
  file: { name, isError, getUrl, isLoading },
  imageDispatch,
  index,
}: {
  file: FileWithUrl;
  imageDispatch: React.Dispatch<MultipleImagesInputAction>;
  index: number;
}) => {
  return (
    <tr>
      {/* PREVIEW */}
      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
        <div className="relative flex h-12 w-20">
          {isError ? (
            <div className="flex w-full items-center justify-center">
              <XCircleIcon className="h-6 w-6 text-red-500" />
            </div>
          ) : (
            <Image
              style={{ objectFit: "contain" }}
              src={getUrl}
              fill
              alt={name}
              sizes="100px"
            />
          )}
        </div>
      </td>
      {/* NAME */}
      <td className="truncate whitespace-normal px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">
        <div className="max-w-20">
          <p
            className={cn("dark:text-slate-300", {
              "dark:text-red-500": isError,
            })}
          >
            {name}
          </p>
        </div>
      </td>
      {/* ACTION BUTTONS */}
      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <ImageActionButtons imageDispatch={imageDispatch} index={index} />
        )}
      </td>
    </tr>
  );
};
