import { validateRequest } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/error";
import { formatDateToThaiDate } from "@/lib/format-date";
import { Suspense } from "react";
import { SaleChart } from "./sales-chart";
import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import { subMonths } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SalesGroupbyButtons } from "./sales-groupby-buttons";
import { delay } from "@/lib/delay";
interface FetchSalesDataProps {
  salesXAxis?: "month" | "year";
}
export const FetchSalesData = ({ salesXAxis }: FetchSalesDataProps) => {
  let title = "ยอดขายรายวัน (30 วันล่าสุด)";
  if (salesXAxis === "month") {
    title = "ยอดขายรายเดือน";
  }
  if (salesXAxis === "year") {
    title = "ยอดขายรายปี";
  }

  return (
    <Card className="flex flex-col space-y-4 shadow-lg">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <SalesGroupbyButtons salesXAxis={salesXAxis} />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Suspense
          key={salesXAxis ?? "day"}
          fallback={
            <Skeleton className="max-h-[500px] min-h-[200px] w-full"></Skeleton>
          }
        >
          <FetchSalesDataAsync salesXAxis={salesXAxis} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

const FetchSalesDataAsync = async ({ salesXAxis }: FetchSalesDataProps) => {
  await delay(1000);
  const validateReq = validateRequest();
  const ordersReq = fetchOrders({ salesXAxis });
  const [{ user }, salesPerDay] = await Promise.all([validateReq, ordersReq]);
  if (!user) throw new UnauthorizedError();

  return (
    <div>
      <SaleChart salesData={salesPerDay} />
    </div>
  );
};

const fetchOrders = async ({
  salesXAxis,
}: {
  salesXAxis?: "month" | "year";
}) => {
  let subMonth = 1;

  if (salesXAxis === "month") {
    subMonth = 12;
  }
  if (salesXAxis === "year") {
    subMonth = 12 * 5;
  }

  noStore();
  const today = new Date();
  const orders = await db.order.findMany({
    select: {
      totalPrice: true,
      date: true,
    },
    orderBy: {
      date: "desc",
    },
    where: {
      date: {
        lte: today,
        gte: subMonths(today, subMonth),
      },
    },
  });

  //groupBy sales
  const salesGroup = salesGroupBy(orders, salesXAxis);
  return Object.entries(salesGroup).map(([date, sales]) => ({
    date,
    sales,
  }));
};

//Group sales by date, month, or year
function salesGroupBy(
  orders: {
    date: Date;
    totalPrice: number;
  }[],
  salesXAxis?: "month" | "year",
) {
  switch (salesXAxis) {
    case "year": {
      return orders.reduce(
        (acc, order) => {
          const date = formatDateToThaiDate(order.date.toDateString(), {
            onlyYear: true,
          });
          acc[date] = acc[date]
            ? acc[date] + order.totalPrice
            : order.totalPrice;
          return acc;
        },
        {} as Record<string, number>,
      );
    }
    case "month": {
      return orders.reduce(
        (acc, order) => {
          const date = formatDateToThaiDate(order.date.toDateString(), {
            excludeDay: true,
            shortDate: true,
          });
          acc[date] = acc[date]
            ? acc[date] + order.totalPrice
            : order.totalPrice;
          return acc;
        },
        {} as Record<string, number>,
      );
    }
    default: {
      return orders.reduce(
        (acc, order) => {
          const date = formatDateToThaiDate(order.date.toDateString(), {
            excludeYear: true,
            shortDate: true,
          });
          acc[date] = acc[date]
            ? acc[date] + order.totalPrice
            : order.totalPrice;
          return acc;
        },
        {} as Record<string, number>,
      );
    }
  }
}
