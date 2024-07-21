import { validateRequest } from "@/lib/auth";
import { fetchOrders } from "./fetch-orders";
import { ArrowRight, List } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { UnauthorizedMessageCode } from "@/components/error-ui";
import { UnauthorizedError } from "@/lib/error";

export const BillMetricCard = () => {
  return (
    <BillMetricUi>
      <Suspense fallback={<BillMetricFetch.Skeleton />}>
        <BillMetricFetch />
      </Suspense>
    </BillMetricUi>
  );
};

const BillMetricFetch = async () => {
  const userReq = validateRequest();
  const ordersReq = fetchOrders();
  const [{ user }, orders] = await Promise.all([userReq, ordersReq]);
  if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notSignIn);
  if (user?.role !== "ADMIN")
    throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
  return <p>{orders.length} รายการ</p>;
};

BillMetricFetch.Skeleton = function BillMetricSkeleton() {
  return (
    <Skeleton className="rounded-md bg-white/50">
      <p className="text-transparent">0 รายการ</p>
    </Skeleton>
  );
};

const BillMetricUi = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-[100px] w-[300px] flex-col justify-between rounded-md bg-green-500">
      <div className="absolute right-5 top-0">
        <List className="h-auto w-20 text-green-700/50" />
      </div>
      <div className="p-4 text-2xl text-white">
        <p>จำนวนบิล</p>
        {children}
      </div>
      <Link href="/admin/bill">
        <div className="flex items-center justify-center space-x-2 rounded-b-md bg-green-700 py-2">
          <p className="text-white">รายละเอียดเพิ่มเติม</p>
          <ArrowRight className="h-4 w-4 rounded-full bg-white text-green-500" />
        </div>
      </Link>
    </div>
  );
};
