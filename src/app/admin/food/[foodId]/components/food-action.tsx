"use server";
import { BadRequestError, UnauthorizedError } from "@/lib/error";
import { foodSchema, FoodSchema } from "./food-schema";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";

export const createFoodAction = async ({ data }: { data: FoodSchema }) => {
  try {
    //validate data
    const result = foodSchema.safeParse(data);
    if (!result.success) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (!user || user.role !== "ADMIN") {
      throw new UnauthorizedError();
    }
    //create food
    const food = await db.food.create({
      data: {
        ...data,
        images: {
          createMany: {
            data: [...data.images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return { food };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const editFoodAction = async ({
  data,
  id,
}: {
  data: FoodSchema;
  id: number;
}) => {
  try {
    //validate body
    const result = foodSchema.safeParse(data);
    if (!result.success || !id) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (!user || user.role !== "ADMIN") {
      throw new UnauthorizedError();
    }
    //We firstly update food with empty image, then we add new images later.
    //Because if we only add images directly, prisma will only append new images to the existing images
    //this will cause duplicate images

    //first delete all images
    await db.food.update({
      where: { id },
      data: { ...data, images: { deleteMany: {} } },
    });
    //then add new images
    //TODO: consider doing transaction ??
    const food = await db.food.update({
      where: { id },
      data: {
        ...data,
        images: {
          createMany: {
            data: [...data.images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return { food };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const deleteFoodAction = async ({ id }: { id: number }) => {
  try {
    //validate body
    if (!id) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (!user || user.role !== "ADMIN") {
      throw new UnauthorizedError();
    }
    //delete food
    const food = await db.food.findFirst({
      where: {
        id,
      },
    });
    if (!food) {
      throw new BadRequestError("ไม่พบข้อมูลอาหาร");
    }
    await db.food.delete({
      where: {
        id,
      },
    });
    return {};
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
