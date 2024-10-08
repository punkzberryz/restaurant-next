import { unstable_noStore as noStore } from "next/cache";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { validateRequest } from "@/lib/auth";
import {
  catchErrorTypeChecker,
  ErrorType,
  UnauthorizedError,
} from "@/lib/error";
import { Client } from "./components/client";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { UnauthorizedMessageCode } from "@/components/error-ui";

const CategoryPage = () => {
  return (
    <>
      <PageHeader
        title="จัดการหมวดหมู่อาหาร | Category"
        links={[
          { href: "/admin", title: "Dashboard" },
          { href: "#", title: "Category" },
        ]}
        role="admin"
      />
      <MaxWidthWrapper>
        <Card>
          <CardContent className="flex flex-col space-y-8 p-6">
            <div className="flex items-center justify-between">
              <CardTitle>รายการหมวดหมู่อาหาร</CardTitle>
              <Link href="/admin/category/new" className={buttonVariants({})}>
                <Plus className="h-4 w-4 md:mr-2" />
                <span className="hidden md:block">สร้างใหม่</span>
              </Link>
            </div>
            {/* Table */}
            <Suspense fallback={<DataTableSkeleton />}>
              <FetchCategories />
            </Suspense>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

const FetchCategories = async () => {
  noStore();
  // await delay(1000);
  try {
    //validate user
    const { user } = await validateRequest();

    if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notSignIn);
    if (user?.role !== "ADMIN")
      throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);

    const categories = await db.category.findMany({
      take: CATEGORIES_LIMIT,
      skip: (CATEGORIES_PAGE_ID - 1) * CATEGORIES_LIMIT,
    });
    return (
      <Client
        initialData={{ categories, hasMore: categories.length > 0 }}
        limit={CATEGORIES_LIMIT}
      />
    );
  } catch (err) {
    const error = catchErrorTypeChecker(err);
    if (error.type === ErrorType.Unauthorized) {
      throw new UnauthorizedError(error.message);
    }
    throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่อาหาร");
  }
};

const CATEGORIES_LIMIT = 100;
const CATEGORIES_PAGE_ID = 1;

export default CategoryPage;
export const metadata: Metadata = {
  title: "จัดการหมวดหมู่อาหาร | Category",
  description: "จัดการหมวดหมู่อาหาร",
};
