"use client";

import {
  cloudinaryFolderName,
  deleteImageCloudinaryAction,
  useImageToBeDeletedStore,
} from "@/components/image-input";
import { useEffect } from "react";

export const Client = () => {
  const { removeUrl, urls } = useImageToBeDeletedStore();
  useEffect(() => {
    if (urls.length === 0) return;
    urls.forEach((url) => {
      deleteImageCloudinaryAction({
        url,
        folder: cloudinaryFolderName.restaurant,
      }).then(({ error, invalidUrl }) => {
        if (error) {
          console.error(error.message);
          return;
        }
        if (invalidUrl) {
          console.error(invalidUrl);
          return;
        }
        removeUrl(url);
      });
    });
  }, [urls, removeUrl]);
  return null;
};
