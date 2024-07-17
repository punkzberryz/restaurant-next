import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  catchErrorTypeChecker,
  ErrorType,
  UnauthorizedError,
} from "@/lib/error";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";
import { RestaurantForm } from "./components/restaurant-form";
import { Skeleton } from "@/components/ui/skeleton";
const RestaurantPage = () => {
  noStore();

  return (
    <>
      <PageHeader
        title="จัดการข้อมูลร้านอาหาร | Restaurant"
        links={[
          { href: "/admin", title: "Dashboard" },
          { href: "#", title: "Restaurant" },
        ]}
      />
      <MaxWidthWrapper>
        <Card className="mx-auto max-w-4xl">
          <CardContent className="flex flex-col space-y-8 p-6">
            <div className="flex items-center justify-between">
              <CardTitle>จัดการข้อมูลร้านอาหาร</CardTitle>
            </div>
            {/* Table */}
            <Suspense
              fallback={
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2"></div>
                  <Skeleton className="h-20" />
                  <Skeleton className="h-44" />
                </div>
              }
            >
              <FetchRestaurant />
            </Suspense>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

const FetchRestaurant = async () => {
  noStore();

  try {
    //validate user
    const { user } = await validateRequest();
    if (!user) {
      throw new UnauthorizedError("ไม่พบผู้ใช้");
    }
    //fetch restaurant info
    const restaurant = await db.restaurant.findFirst();

    return <RestaurantForm restaurant={restaurant} />;
  } catch (err) {
    const error = catchErrorTypeChecker(err);
    if (error.type === ErrorType.Unauthorized) {
      throw new UnauthorizedError(error.message);
    }
    throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูลอาหาร");
  }
};

export default RestaurantPage;
export const metadata: Metadata = {
  title: "จัดการข้อมูลร้านอาหาร | Restaurant",
  description: "จัดการข้อมูลร้านอาหาร",
};
