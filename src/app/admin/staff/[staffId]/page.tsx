import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/db";
import { delay } from "@/lib/delay";
import { BadRequestError } from "@/lib/error";
import { Suspense } from "react";

const StaffByIdPage = ({
  params: { staffId },
}: {
  params: { staffId: string };
}) => {
  return (
    <>
      <PageHeader
        title={`Staff by id ${staffId}`}
        links={[
          { href: "/admin", title: "Admin" },
          { href: "/admin/staff", title: "Staff" },
          { href: "#", title: `Staff id: ${staffId}` },
        ]}
      />
      <MaxWidthWrapper className="flex flex-col">
        <Card className="mx-auto">
          <CardContent className="flex flex-col space-y-8 p-6">
            <Suspense fallback={<div>Loading...</div>}>
              <FetchUserById id={staffId} />
            </Suspense>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

const FetchUserById = async ({ id }: { id: string }) => {
  await delay(1000);
  try {
    const user = await db.user.findUnique({ where: { id } });
    if (!user) throw new BadRequestError(" id พนักงานไม่ถูกต้อง");
    return (
      <div>
        {user.displayName} - {user.email}
      </div>
    );
  } catch (err) {
    throw err;
  }
};

export default StaffByIdPage;
