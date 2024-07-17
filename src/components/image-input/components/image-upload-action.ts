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
import { cloudinaryFolderName } from "./folder-name";
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

export const deleteImageCloudinaryAction = async ({
  url,
  folder,
}: {
  url: string;
  folder: cloudinaryFolderName;
}) => {
  try {
    //validate request
    if (!url || !folder) {
      throw new BadRequestError();
    }
    const publicId = getCloudinaryPublicId({ url, folder });
    if (!publicId) {
      //corrupted image url, may be due to incorrect folder name
      return {
        invalidUrl: true,
      };
    }
    //validate user
    const { user } = await validateRequest();
    if (!user) {
      throw new UnauthorizedError();
    }
    const resp = await deleteImageCloudinary(publicId);
    if (resp.result !== "ok") {
      if (resp.result === "not found") {
        throw new BadRequestError("Image not found");
      }
      throw new InternalServerError("Failed to delete image");
    }

    return {};
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);

    return { error };
  }
};

const getCloudinaryPublicId = ({
  url,
  folder,
}: {
  url: string;
  folder: cloudinaryFolderName;
}) => {
  const folderProd =
    process.env.NODE_ENV === "development" ? `dev-${folder}` : folder;

  const urlArray = url.split(folderProd + "/");
  if (urlArray.length <= 1) {
    return null;
  }
  const [_, imgNameWithJpeg] = urlArray;
  const nameAndJpeg = imgNameWithJpeg.split(".");
  if (nameAndJpeg.length <= 1) {
    return null;
  }
  //what if image name is xxasd.adsasc.asdasd.jpg ?? we would get [xxxasd, adsasc, asdasd, jpg]
  const imgName = nameAndJpeg.slice(0, nameAndJpeg.length - 1).join(".");
  return folderProd + "/" + imgName;
};

const deleteImageCloudinary = (publicId: string) =>
  new Promise<{ result?: string }>((resolve, reject) => {
    cloudinary.config({
      cloud_name: config.cloudinary.cloudName,
      api_key: config.cloudinary.apiKey,
      api_secret: config.cloudinary.apiSecret,
      secure: true,
    });
    cloudinary.uploader
      .destroy(publicId)
      .then((res) => resolve(res))
      .catch((err) => reject(err?.message));
  });
