"use client";

import { config } from "@/lib/config";
import { catchErrorHelper } from "@/lib/error";

export const uploadImageCloudinary = async ({
  image,
  signData,
}: {
  image: File;
  signData: {
    signature: string;
    timestamp: number;
    apiKey: string;
    folder: string;
  };
}) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("api_key", signData.apiKey);
  formData.append("timestamp", signData.timestamp.toString());
  formData.append("folder", signData.folder);
  formData.append("signature", signData.signature);
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${config.cloudinary.cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );
    if (!response.ok) {
      console.log(response.status);
      console.log(response.statusText);
      const data = await response.json();
      console.log(data);
      throw new Error("Error uploading image: ", data);
    }
    const data: CloudinaryUploadResponse = await response.json();
    return { url: data.secure_url };
  } catch (err) {
    return catchErrorHelper("uploadImageCloudinary", err);
  }
};

type CloudinaryUploadResponse = {
  public_id: string;
  version: number;
  version_id: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  // tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  original_filename: string;
  original_extension: string;
};
