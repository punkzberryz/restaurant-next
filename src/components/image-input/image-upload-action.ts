"use server";
import { validateRequest } from "@/lib/auth";
import { config } from "@/lib/config";
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from "@/lib/error";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { v2 as cloudinary } from "cloudinary";
export const getCloudinaryUploadSignatureAction = async ({
  folder,
  publicId,
}: {
  publicId?: string;
  folder: string;
}) => {
  try {
    //validate data
    if (!folder) {
      throw new BadRequestError();
    }

    const folderName =
      process.env.NODE_ENV === "development" ? `dev-${folder}` : folder;
    //validate user
    const { user } = await validateRequest();
    if (!user) {
      throw new UnauthorizedError();
    }

    const { apiKey, apiSecret, cloudName } = config.cloudinary;
    if (!apiKey || !apiSecret || !cloudName) {
      throw new InternalServerError();
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
    });
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder: folderName,
        public_id: publicId,
      },
      apiSecret,
    );
    const data = {
      signature,
      timestamp,
      apiKey,
      folder: folderName,
      publicId,
    };
    return { data };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
