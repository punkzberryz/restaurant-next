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
import { validateRequest } from "@/lib/auth";
import { UnauthorizedError } from "@/lib/error";
import { UnauthorizedMessageCode } from "@/components/error-ui";
import { Client } from "./components/client";

const BillPage = () => {
  return (
    <>
      <PageHeader
        title="จัดการรายการบิล | Bill"
        links={[{ href: "/cashier/bill", title: "Bill" }]}
        role="cashier"
      />
      <MaxWidthWrapper>
        <Card>
          <CardContent className="flex flex-col space-y-8 p-6">
            <div className="flex items-center justify-between">
              <CardTitle>รายการบิล</CardTitle>
              <Link href="/cashier" className={buttonVariants({})}>
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
  const validateReq = validateRequest();
  const odersReq = db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: ORDERS_LIMIT,
    skip: (ORDERS_PAGE_ID - 1) * ORDERS_LIMIT,
  });

  const [{ user }, orders] = await Promise.all([validateReq, odersReq]);
  if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notSignIn);

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
