"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/* This store is used for storing upload image url

    we firstly upload image, then we store the url in the store
    then we update database with the url
    then we delete url from the store

    if url is not updated in the database, we delete the url from the store and delete from Image Cloudinary

    by doing this, user can upload image individually before updating the database
    this will relax the need to uploading huge data at once
*/
interface useImageToBeDeletedStore {
  urls: string[];
  addUrl: (url: string) => void;
  removeUrl: (url: string) => void;
}
export const useImageToBeDeletedStore = create<useImageToBeDeletedStore>()(
  persist(
    (set) => ({
      urls: [],
      addUrl: (url) => {
        set((state) => ({ urls: [...state.urls, url] }));
      },
      removeUrl: (url) => {
        set((state) => ({ urls: state.urls.filter((u) => u !== url) }));
      },
    }),
    {
      name: "image-upload-store",
    },
  ),
);
