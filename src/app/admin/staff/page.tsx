import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { userColumnDef } from "./components/user-column-def";
import { db } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";
import {
  catchErrorTypeChecker,
  ErrorType,
  UnauthorizedError,
} from "@/lib/error";
import { validateRequest } from "@/lib/auth";
import { Client } from "./components/client";
import { Suspense } from "react";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";

const StaffPage = async () => {
  const users = await db.user.findMany();
  return (
    <>
      <PageHeader
        title="จัดการพนักงาน | Staff"
        links={[
          { href: "/admin", title: "Dashboard" },
          { href: "/admin/staff", title: "Staff" },
        ]}
      />
      <MaxWidthWrapper>
        <Card>
          <CardContent className="flex flex-col space-y-8 p-6">
            <CardTitle>รายชื่อพนักงาน</CardTitle>

            {/* Table */}
            <Suspense fallback={<DataTableSkeleton />}>
              <FetchUsers />
            </Suspense>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

const FetchUsers = async () => {
  noStore();
  try {
    //validate user
    const userReq = validateRequest();
    const usersReq = db.user.findMany({
      take: USERS_LIMIT,
      skip: (USERS_PAGE_ID - 1) * USERS_LIMIT,
      orderBy: {
        id: "desc",
      },
    });
    const [{ user }, users] = await Promise.all([userReq, usersReq]);
    if (!user) {
      throw new UnauthorizedError("ไม่พบผู้ใช้");
    }
    return (
      <Client
        initialData={{ users, hasMore: users.length === USERS_LIMIT }}
        limit={USERS_LIMIT}
      />
    );
  } catch (err) {
    const error = catchErrorTypeChecker(err);
    if (error.type === ErrorType.Unauthorized) {
      throw new UnauthorizedError(error.message);
    }
    throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
};

export default StaffPage;
export const metadata: Metadata = {
  title: "จัดการพนักงาน | Staff",
  description: "จัดการพนักงานในระบบ",
};
const USERS_LIMIT = 100;
const USERS_PAGE_ID = 1;
