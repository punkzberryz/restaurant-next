import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";
import { userColumnDef } from "./components/user-column-def";
import { db } from "@/lib/db";

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
          <CardContent className="p-6">
            <DataTable columns={userColumnDef} data={users} />
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

export default StaffPage;
export const metadata: Metadata = {
  title: "จัดการพนักงาน | Staff",
  description: "จัดการพนักงานในระบบ",
};
