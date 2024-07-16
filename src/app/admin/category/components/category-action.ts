"use server";

import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import {
  categorySchema,
  CategorySchema,
} from "../[categoryId]/components/category-schema";
import { BadRequestError, UnauthorizedError } from "@/lib/error";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";

export const createCategoryAction = async ({
  data,
}: {
  data: CategorySchema;
}) => {
  try {
    //Validate data
    const result = categorySchema.safeParse(data);
    if (!result.success) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (!user || user.role !== "ADMIN") {
      throw new UnauthorizedError();
    }
    const category = await db.category.create({
      data,
    });

    return { category };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    console.log({ error });
    return { error };
  }
};

export const editCategoryAction = async ({
  data,
  categoryId,
}: {
  data: CategorySchema;
  categoryId: number;
}) => {
  try {
    //validate data
    const result = categorySchema.safeParse(data);
    if (!result.success || !categoryId) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (!user) {
      throw new UnauthorizedError();
    }
    //edit category
    const category = await db.category.update({
      where: {
        id: categoryId,
      },
      data,
    });
    return { category };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const deleteCategoryAction = async ({
  categoryId,
}: {
  categoryId: number;
}) => {
  try {
    //validate body
    if (!categoryId) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (!user || user.role !== "ADMIN") {
      throw new UnauthorizedError();
    }
    //delete category
    await db.category.delete({
      where: {
        id: categoryId,
      },
    });
    return {};
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const getManyCategoriesAction = async ({
  pageId,
  limit,
}: {
  limit: number;
  pageId: number;
}) => {
  try {
    //validate body
    if (!pageId || !limit) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (!user || user.role !== "ADMIN") {
      throw new UnauthorizedError();
    }
    const categories = await db.category.findMany({
      take: limit,
      skip: (pageId - 1) * limit,
    });
    return { categories };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
