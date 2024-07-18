import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { validateRequest } from "@/lib/auth";
import {
  catchErrorTypeChecker,
  ErrorType,
  UnauthorizedError,
} from "@/lib/error";
import { db } from "@/lib/db";
import { OrderForm } from "./components/order-form";
import { Food } from "@prisma/client";

//For now it will be staff who creates Order for customer
//So we will need to validate user before creating order
const OrderPage = () => {
  return (
    <>
      <PageHeader
        title="จัดการออเดอร์ลูกค้า | Order"
        links={[
          {
            href: "/admin",
            title: "Dashboard",
          },
          { href: "/admin/bill", title: "Bill" },
          { href: "#", title: "Order" },
        ]}
      />
      <MaxWidthWrapper>
        <Card className="mx-auto max-w-4xl">
          <CardContent className="flex flex-col space-y-8 p-6">
            <CardTitle>จัดการออเดอร์ลูกค้า</CardTitle>
            <Suspense fallback={<div>Loading...</div>}>
              <FetchMenu />
            </Suspense>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

const FetchMenu = async () => {
  noStore();
  try {
    //validate user
    const { user } = await validateRequest();
    if (!user) throw new UnauthorizedError("ไม่พบผู้ใช้");
    //fetch data
    const categoriesAndFoods = await db.category.findMany({
      include: {
        foods: {
          orderBy: {
            id: "desc",
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    const foods: (Food & { category: string })[] = [];
    categoriesAndFoods.forEach((category) => {
      category.foods.forEach((food) => {
        foods.push({ ...food, category: category.name });
      });
    });
    return <OrderForm menu={foods} />;
  } catch (err) {
    const error = catchErrorTypeChecker(err);
    if (error.type === ErrorType.Unauthorized) {
      throw new UnauthorizedError(error.message);
    }
    throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
};

export default OrderPage;
export const metadata: Metadata = {
  title: "จัดการออเดอร์ลูกค้า | Order",
  description: "จัดการออเดอร์ลูกค้า",
};
