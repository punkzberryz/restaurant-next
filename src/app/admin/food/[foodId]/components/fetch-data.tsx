import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { BadRequestError, UnauthorizedError } from "@/lib/error";
import { FoodForm } from "./form/food-form";

interface FetchDataProps {
  foodId: string;
  isNew: boolean;
  title: string;
}

export async function FetchData({ foodId, isNew, title }: FetchDataProps) {
  //validate user and get categories

  const [categories, { user }, food] = await Promise.all([
    db.category.findMany({
      orderBy: { id: "asc" },
    }),
    validateRequest(),
    fetchFood(foodId, isNew),
  ]);

  if (user?.role !== "ADMIN") {
    throw new UnauthorizedError("ไม่อนุญาตให้เข้าถึง");
  }

  if (isNew) {
    return (
      <FoodForm
        categories={categories}
        initialData={null}
        isNew
        title={title}
      />
    );
  }
  //fetch food data
  return (
    <FoodForm
      isNew={isNew}
      title={title}
      categories={categories}
      initialData={food}
    />
  );
}

const fetchFood = async (foodId: string, isNew: boolean) => {
  if (isNew) return null;
  const id = parseInt(foodId);
  if (isNaN(id)) {
    throw new BadRequestError("รหัส id ไม่ถูกต้อง");
  }
  const food = await db.food.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
    },
  });
  if (!food) {
    throw new BadRequestError("ไม่พบข้อมูลอาหาร");
  }
  return food;
};
