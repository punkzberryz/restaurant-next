import { UnauthorizedMessageCode } from "@/components/error-ui";
import { Skeleton } from "@/components/ui/skeleton";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { UnauthorizedError } from "@/lib/error";
import { ArrowRight, List } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export const FoodsMetricCard = () => {
  return (
    <FoodMetricUi>
      <Suspense fallback={<FoodMetricFetch.Skeleton />}>
        <FoodMetricFetch />
      </Suspense>
    </FoodMetricUi>
  );
};

const FoodMetricFetch = async () => {
  const userReq = validateRequest();
  const foodCountReq = db.food.count();
  const [{ user }, foodCount] = await Promise.all([userReq, foodCountReq]);
  if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notSignIn);
  if (user?.role !== "ADMIN")
    throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
  return <p>{foodCount} รายการ</p>;
};

FoodMetricFetch.Skeleton = function FoodMetricSkeleton() {
  return (
    <Skeleton className="rounded-md bg-white/50">
      <p className="text-transparent">0 รายการ</p>
    </Skeleton>
  );
};

const FoodMetricUi = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-[100px] w-[300px] flex-col justify-between rounded-md bg-red-500">
      <div className="absolute right-5 top-0">
        <List className="h-auto w-20 text-red-700/50" />
      </div>
      <div className="p-4 text-2xl text-white">
        <p>จำนวนสินค้า</p>
        {children}
      </div>
      <Link href="/admin/food">
        <div className="flex items-center justify-center space-x-2 rounded-b-md bg-red-700 py-2">
          <p className="text-white">รายละเอียดเพิ่มเติม</p>
          <ArrowRight className="h-4 w-4 rounded-full bg-white text-red-500" />
        </div>
      </Link>
    </div>
  );
};
