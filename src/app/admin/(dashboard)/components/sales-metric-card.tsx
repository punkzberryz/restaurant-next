import { validateRequest } from "@/lib/auth";
import { fetchOrders } from "./fetch-orders";
import { ArrowRight, Banknote } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/format-price";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { UnauthorizedMessageCode } from "@/components/error-ui";
import { UnauthorizedError } from "@/lib/error";

export const SaleMetricCard = () => {
  return (
    <SaleMetricUi>
      <Suspense fallback={<SaleMetricFetch.Skeleton />}>
        <SaleMetricFetch />
      </Suspense>
    </SaleMetricUi>
  );
};

const SaleMetricFetch = async () => {
  const userReq = validateRequest();
  const ordersReq = fetchOrders();
  const [{ user }, orders] = await Promise.all([userReq, ordersReq]);
  if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notSignIn);
  if (user?.role !== "ADMIN")
    throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
  const sales = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  return <p>{formatPrice(sales)} บาท</p>;
};

SaleMetricFetch.Skeleton = function SaleMetricSkeleton() {
  return (
    <Skeleton className="rounded-md bg-white/50">
      <p className="text-transparent">- บาท</p>
    </Skeleton>
  );
};

const SaleMetricUi = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-[100px] w-[300px] flex-col justify-between rounded-md bg-blue-500">
      <div className="absolute right-5 top-0">
        <Banknote className="h-auto w-20 text-blue-700/50" />
      </div>
      <div className="p-4 text-2xl text-white">
        <p>ยอดขายทั้งหมด</p>
        {children}
      </div>
      <Link href="/admin/bill">
        <div className="flex items-center justify-center space-x-2 rounded-b-md bg-blue-700 py-2">
          <p className="text-white">รายละเอียดเพิ่มเติม</p>
          <ArrowRight className="h-4 w-4 rounded-full bg-white text-blue-500" />
        </div>
      </Link>
    </div>
  );
};
