import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import {
  BadRequestError,
  catchErrorTypeChecker,
  ErrorType,
  UnauthorizedError,
} from "@/lib/error";
import { Suspense } from "react";
import { EditStaffForm } from "./components/form/edit-staff-form";
import { validateRequest } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { UnauthorizedMessageCode } from "@/components/error-ui";

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
        role="admin"
      />
      <MaxWidthWrapper>
        <Card className="mx-auto max-w-4xl">
          <CardContent className="flex flex-col space-y-8 p-6">
            <CardTitle>แก้ไขข้อมูลพนักงาน</CardTitle>
            <Suspense
              fallback={
                <div className="flex flex-col space-y-4">
                  <Skeleton className="h-44" />
                  <Skeleton className="h-44" />
                </div>
              }
            >
              <FetchUserById id={staffId} />
            </Suspense>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

const FetchUserById = async ({ id }: { id: string }) => {
  try {
    const userReq = validateRequest();
    const staffReq = db.user.findUnique({ where: { id } });
    const [staff, { user }] = await Promise.all([staffReq, userReq]);

    if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notSignIn);
    if (!staff) {
      throw new BadRequestError("ไม่พบข้อมูลพนักงาน");
    }
    if (user.role !== "ADMIN" && staff.id !== user.id) {
      throw new UnauthorizedError("คุณไม่มีสิทธิ์ในการเข้าถึงข้อมูลพนักงาน");
    }
    return (
      <div>
        <EditStaffForm initialData={staff} />
      </div>
    );
  } catch (err) {
    const { message, type } = catchErrorTypeChecker(err);
    if (type === ErrorType.Unauthorized) {
      throw err;
    }
    if (type === ErrorType.BadRequest) {
      throw new BadRequestError("ไม่พบข้อมูลพนักงาน");
    }
    console.log({ message, type });
    throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูลพนักงาน");
  }
};

export default StaffByIdPage;
