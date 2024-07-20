import { OrderFormSchema } from "@/app/admin/order/components/order-schema";
import { calculateTotalPrice } from "@/lib/calculate-price";
import { Food, FoodUnit, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const initialUsers: User[] = [
  {
    id: "w8e7qh2k101dfw4",
    role: "ADMIN",
    displayName: "kang",
    email: "kanggive@gmail.com",
    hashedPassword:
      "$argon2id$v=19$m=19456,t=2,p=1$QbbhOC234hdjKeC2bl4VrQ$NJcbej1DKPdmPm4zsHU5SWO4lQbF+AZ5HIJX0xYr6Nc",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "x0v1hs2a365qbg1",
    role: "USER",
    displayName: "john",
    email: "john@doe.com",
    hashedPassword: "not hashed password",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "a3b2c4d5e6f7g8h9",
    role: "USER",
    displayName: "alice",
    email: "alice@example.com",
    hashedPassword:
      "$argon2id$v=19$m=19456,t=2,p=1$QbbhOC234hdjKeC2bl4VrQ$NJcbej1DKPdmPm4zsHU5SWO4lQbF+AZ5HIJX0xYr6Nc",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "i9j8k7l6m5n4o3p2",
    role: "USER",
    displayName: "bob",
    email: "bob@example.com",
    hashedPassword:
      "$argon2id$v=19$m=19456,t=2,p=1$QbbhOC234hdjKeC2bl4VrQ$NJcbej1DKPdmPm4zsHU5SWO4lQbF+AZ5HIJX0xYr6Nc",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "q1r2s3t4u5v6w7x8",
    role: "ADMIN",
    displayName: "charlie",
    email: "charlie@example.com",
    hashedPassword:
      "$argon2id$v=19$m=19456,t=2,p=1$QbbhOC234hdjKeC2bl4VrQ$NJcbej1DKPdmPm4zsHU5SWO4lQbF+AZ5HIJX0xYr6Nc",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const seed = async () => {
  // USERS
  //   await prisma.user.deleteMany();
  //   await prisma.user.createMany({
  //     data: initialUsers,
  //   });
  //   RESTAURANT
  //   await prisma.restaurant.deleteMany();
  //   await prisma.restaurant.create({
  //     data: {
  //       address: "ติดเมกะ บางนา",
  //       id: 1,
  //       name: "แซนวิชเนื้อไทยวากิว",
  //       description: "อร่อย มัน เคี้ยวง่าย ละลายในปาก",
  //       phone: "0932231211",
  //       logoImageUrl:
  //         "https://res.cloudinary.com/djcbkikuf/image/upload/v1721395570/dev-restaurant-next/foods/imbjfozwtvqfv2v2x6ax.jpg",
  //     },
  //   });
  //   //   CATEGORIES
  //   await prisma.food.deleteMany();
  //   await prisma.category.deleteMany();
  //   await prisma.category.createMany({
  //     data: [
  //       { id: 1, name: "Sea food" },
  //       { id: 2, name: "ชุดผัก" },
  //       { id: 3, name: "น้ำจิ้ม" },
  //       { id: 4, name: "เครื่องดื่ม" },
  //       { id: 5, name: "อาหารทานเล่น" },
  //       { id: 6, name: "เนื้อชั่งกิโล" },
  //       { id: 7, name: "เนื้อย่างชุด" },
  //     ],
  //   });
  //   // FOODS
  //   const foodPromises: Promise<any>[] = [];
  //   for (const food of initialFoods) {
  //     foodPromises.push(
  //       prisma.food.create({
  //         data: {
  //           name: food.name,
  //           price: food.price,
  //           unit: food.unit,
  //           images: {
  //             createMany: {
  //               data: food.images.map((image: { url: string }) => image),
  //             },
  //           },
  //           categoryId: food.categoryId,
  //         },
  //       }),
  //     );
  //   }
  //   await Promise.all(foodPromises);
  // BILL
  const users = await prisma.user.findMany();
  const foods = await prisma.food.findMany();
  const promises: Promise<any>[] = [];
  for (let i = 0; i < 100; i++) {
    const randomStaff = users[randomIntFromInterval(0, users.length - 1)];
    generateRandomOrder(foods, randomStaff.id);
    promises.push(generateRandomOrder(foods, randomStaff.id));
  }
  await Promise.all(promises);
};
function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}
const generateRandomOrder = async (foods: Food[], staffId: string) => {
  const popFoods3 = foods.filter(() => Math.random() > 0.5);
  const popFoods = popFoods3.filter(() => Math.random() > 0.5);

  if (popFoods.length === 0) {
    console.log("no food");
    return;
  }
  const foodsWithQuantityAndPrice: OrderFormSchema["foods"] = popFoods.map(
    (food) => {
      const quantity = randomIntFromInterval(1, 5);
      return {
        id: food.id,
        name: food.name,
        price: food.price,
        quantity: quantity,
        totalPrice: calculateTotalPrice(food.price, quantity),
        unit: food.unit,
      };
    },
  );

  const order = await prisma.order.create({
    data: {
      date: randomDate(new Date(2022, 0, 1), new Date()),
      foods: JSON.stringify(foodsWithQuantityAndPrice),
      foodQuantity: foodsWithQuantityAndPrice.length,
      totalPrice: foodsWithQuantityAndPrice.reduce(
        (acc, food) => acc + food.totalPrice,
        0,
      ),
      staffId,
      status: "DELIVERED",
    },
  });
  console.log("order created");
  return order;
};

const initialFoods = [
  {
    name: "ผักสด",
    unit: FoodUnit.PLATE,
    price: 50,
    categoryId: 2,
    images: [
      {
        url: "https://res.cloudinary.com/djcbkikuf/image/upload/v1721100867/dev-restaurant-next/foods/nevjimbkoklp54xstzsn.jpg",
      },
    ],
  },
  {
    name: "น้ำจิ้มไก่",
    unit: FoodUnit.BOWL,
    price: 10,
    categoryId: 3,
    images: [
      {
        url: "https://res.cloudinary.com/djcbkikuf/image/upload/v1721121903/dev-restaurant-next/foods/vhniqgg6xlxdtdmauyi9.webp",
      },
      {
        url: "https://res.cloudinary.com/djcbkikuf/image/upload/v1721121903/dev-restaurant-next/foods/oivn7elhticf4z3mlepj.jpg",
      },
    ],
  },
  {
    name: "เนื้อไทย-วากิว",
    unit: FoodUnit.KG,
    price: 2000,
    categoryId: 6,
    images: [
      {
        url: "https://res.cloudinary.com/djcbkikuf/image/upload/v1721190460/dev-restaurant-next/foods/lsbqxuufvc83xeloxllw.jpg",
      },
      {
        url: "https://res.cloudinary.com/djcbkikuf/image/upload/v1721190492/dev-restaurant-next/foods/agjpiv32izxtc1p3ej7r.png",
      },
    ],
  },
];

seed();
