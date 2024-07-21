import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { BadRequestError, UnauthorizedError } from "@/lib/error";
import { FoodForm } from "./form/food-form";
import { UnauthorizedMessageCode } from "@/components/error-ui";

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
  const validateReq = validateRequest();
  const foodReq = db.food.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
    },
  });
  const [{ user }, food] = await Promise.all([validateReq, foodReq]);
  if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notSignIn);
  if (user?.role !== "ADMIN")
    throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);

  if (!food) {
    throw new BadRequestError("ไม่พบข้อมูลอาหาร");
  }
  return food;
};
