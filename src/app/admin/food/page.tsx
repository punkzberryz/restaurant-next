import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { delay } from "@/lib/delay";
import {
  catchErrorTypeChecker,
  ErrorType,
  UnauthorizedError,
} from "@/lib/error";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { Client } from "./components/client";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";

const FoodPage = () => {
  return (
    <>
      <PageHeader
        title="จัดการอาหาร | Food"
        links={[
          { href: "/admin", title: "Dashboard" },
          { href: "#", title: "Food" },
        ]}
      />
      <MaxWidthWrapper>
        <Card>
          <CardContent className="flex flex-col space-y-8 p-6">
            <div className="flex items-center justify-between">
              <CardTitle>รายการอาหาร</CardTitle>
              <Link href="/admin/food/new" className={buttonVariants({})}>
                <Plus className="h-4 w-4 md:mr-2" />
                <span className="hidden md:block">สร้างใหม่</span>
              </Link>
            </div>
            {/* Table */}
            <Suspense fallback={<DataTableSkeleton />}>
              <FetchFoods />
            </Suspense>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

const FetchFoods = async () => {
  noStore();
  await delay(1000);
  try {
    //validate user
    const { user } = await validateRequest();
    if (!user) {
      throw new UnauthorizedError("ไม่พบผู้ใช้");
    }
    const foods = await db.food.findMany({
      take: FOODS_LIMIT,
      skip: (FOODS_PAGE_ID - 1) * FOODS_LIMIT,
      include: {
        images: {
          take: 1,
        },
        category: true,
      },
    });

    return (
      <Client
        initialData={{ foods, hasMore: foods.length === FOODS_LIMIT }}
        limit={FOODS_LIMIT}
      />
    );
  } catch (err) {
    const error = catchErrorTypeChecker(err);
    if (error.type === ErrorType.Unauthorized) {
      throw new UnauthorizedError(error.message);
    }
    throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูลอาหาร");
  }
};

export default FoodPage;
const FOODS_LIMIT = 100;
const FOODS_PAGE_ID = 1;
export const metadata: Metadata = {
  title: "จัดการอาหาร | Food",
  description: "จัดการอาหาร",
};
