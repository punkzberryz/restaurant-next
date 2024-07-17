"use server";

import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import {
  restaurantFormSchema,
  RestaurantFormSchema,
} from "./restaurant-schema";
import { BadRequestError, UnauthorizedError } from "@/lib/error";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";

export const createRestaurantAction = async ({
  data,
}: {
  data: RestaurantFormSchema;
}) => {
  try {
    //validate data
    const results = restaurantFormSchema.safeParse(data);
    if (!results.success) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (!user || user.role !== "ADMIN") {
      throw new UnauthorizedError();
    }
    //check if restarant already exist
    const existedRestaurant = await db.restaurant.findFirst();
    if (existedRestaurant) {
      throw new BadRequestError("ร้านอาหารถูกสร้างไปแล้ว");
    }
    //create restaurant
    const restaurant = await db.restaurant.create({
      data,
    });
    return { restaurant };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const editRestaurantAction = async ({
  data,
  id,
}: {
  data: RestaurantFormSchema;
  id: number;
}) => {
  try {
    //validate data
    const results = restaurantFormSchema.safeParse(data);
    if (!results.success) {
      throw new BadRequestError();
    }
    if (!id) {
      throw new BadRequestError();
    }
    //validate user
    const { user } = await validateRequest();
    if (!user || user.role !== "ADMIN") {
      throw new UnauthorizedError();
    }
    //check if restarant exists
    const existedRestaurant = await db.restaurant.findFirst();
    if (!existedRestaurant) {
      throw new BadRequestError("ไม่พบร้านอาหาร");
    }
    const restaurant = await db.restaurant.update({
      where: { id },
      data,
    });
    return { restaurant };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
