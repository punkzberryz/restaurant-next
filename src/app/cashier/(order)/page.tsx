import { UnauthorizedMessageCode } from "@/components/error-ui";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  catchErrorTypeChecker,
  ErrorType,
  UnauthorizedError,
} from "@/lib/error";
import { Food } from "@prisma/client";
import { Metadata } from "next";
import { unstable_noStore } from "next/cache";
import React, { Suspense } from "react";
import { OrderForm } from "./components/order-form";

//For now it will be staff who creates Order for customer
//So we will need to validate user before creating order
const OrderPage = () => {
  return (
    <>
      <PageHeader
        title="จัดการออเดอร์ลูกค้า | Order"
        links={[]}
        role="cashier"
      />
      <MaxWidthWrapper>
        <Card className="mx-auto max-w-4xl">
          <CardContent className="flex flex-col space-y-8 p-6">
            <CardTitle>จัดการออเดอร์ลูกค้า</CardTitle>
            <Suspense fallback={<OrderFormSkeleton />}>
              <FetchMenu />
            </Suspense>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

const OrderFormSkeleton = () => {
  return (
    <div className="flex flex-col space-y-2">
      <Skeleton className="font-semibold text-transparent md:text-3xl">
        Order Form
      </Skeleton>
      <Skeleton className="h-44" />
      <Skeleton className="h-44" />
      <DataTableSkeleton />
    </div>
  );
};

const FetchMenu = async () => {
  unstable_noStore();

  try {
    //validate user
    const validateReq = validateRequest();

    //fetch data
    const categoriesAndFoodsReq = db.category.findMany({
      include: {
        foods: {
          include: {
            images: {
              take: 1,
              select: {
                url: true,
              },
            },
          },
          orderBy: {
            id: "desc",
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    const [categoriesAndFoods, { user }] = await Promise.all([
      categoriesAndFoodsReq,
      validateReq,
    ]);

    if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notSignIn);
    if (user?.role !== "ADMIN" && user?.role !== "USER")
      throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);

    const foods: (Food & { category: string } & { image: { url?: string } })[] =
      [];
    categoriesAndFoods.forEach((category) => {
      category.foods.forEach((food) => {
        foods.push({
          ...food,
          category: category.name,
          image: {
            url: food.images[0]?.url,
          },
        });
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
