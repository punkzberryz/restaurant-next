import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Client } from "./components/client";
import { Bill } from "./components/bill-schema";

const BillPage = () => {
  return (
    <>
      <PageHeader
        title="จัดการรายการบิล | Bill"
        links={[
          {
            href: "/admin",
            title: "Dashboard",
          },
          { href: "#", title: "Bill" },
        ]}
      />
      <MaxWidthWrapper>
        <Card>
          <CardContent className="flex flex-col space-y-8 p-6">
            <div className="flex items-center justify-between">
              <CardTitle>รายการบิล</CardTitle>
              <Link href="/admin/order" className={buttonVariants({})}>
                <Plus className="h-4 w-4 md:mr-2" />
                <span className="hidden md:block">สร้างออเดอร์อาหาร</span>
              </Link>
            </div>
            {/* Table */}
            <Suspense fallback={<DataTableSkeleton />}>
              <FetchOrders />
            </Suspense>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

const FetchOrders = async () => {
  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: ORDERS_LIMIT,
    skip: (ORDERS_PAGE_ID - 1) * ORDERS_LIMIT,
  });

  return (
    <Client
      initialData={{ orders, hasMore: orders.length === ORDERS_LIMIT }}
      limit={ORDERS_LIMIT}
    />
  );
};

export default BillPage;
const ORDERS_LIMIT = 100;
const ORDERS_PAGE_ID = 1;
export const metadata: Metadata = {
  title: "จัดการรายการบิล | Bill",
  description: "จัดการบิล",
};
