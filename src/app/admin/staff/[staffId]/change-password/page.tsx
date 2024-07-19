import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  BadRequestError,
  catchErrorTypeChecker,
  ErrorType,
  UnauthorizedError,
} from "@/lib/error";
import { Metadata } from "next";
import { Suspense } from "react";
import { ChangePasswordForm } from "./components/change-password-form";
import { Skeleton } from "@/components/ui/skeleton";

interface ChangePasswordPageProps {
  params: { staffId: string };
}
const ChangePasswordPage = ({ params }: ChangePasswordPageProps) => {
  return (
    <>
      <PageHeader
        title="แก้ไขรหัสผ่าน | Change Password For Staff"
        links={[
          { href: "/admin", title: "Dashboard" },
          { href: "/admin/staff", title: "Staff" },
          { href: `/admin/staff/${params.staffId}`, title: "Staff Detail" },
          {
            href: "#",
            title: "Change password",
          },
        ]}
      />
      <MaxWidthWrapper>
        <Card className="mx-auto max-w-4xl">
          <CardContent className="flex flex-col space-y-8 p-6">
            <CardTitle>แก้ไขรหัสผ่าน</CardTitle>
            <Suspense
              fallback={
                <div className="flex flex-col space-y-4">
                  <Skeleton className="h-44" />
                  <Skeleton className="h-44" />
                </div>
              }
            >
              <FetchStaff id={params.staffId} />
            </Suspense>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

const FetchStaff = async ({ id }: { id: string }) => {
  try {
    const userRequest = validateRequest();
    const staffRequest = db.user.findUnique({ where: { id } });
    const [{ user }, staff] = await Promise.all([userRequest, staffRequest]);
    if (!user) {
      throw new UnauthorizedError();
    }
    if (!staff) {
      throw new BadRequestError();
    }
    if (user.role !== "ADMIN" || staff.id !== user.id) {
      throw new UnauthorizedError();
    }
    //If staff is admin, only allow that admin to change password
    // if (staff.role === "ADMIN" && staff.id !== user.id) {
    //   throw new UnauthorizedError();
    // }
    return <ChangePasswordForm staff={staff} />;
  } catch (err) {
    const { message, type } = catchErrorTypeChecker(err);
    if (type === ErrorType.Unauthorized) {
      throw new UnauthorizedError("ไม่มีสิทธิ์ในการเข้าถึงข้อมูล");
    }
    if (type === ErrorType.BadRequest) {
      throw new BadRequestError("ไม่พบข้อมูลพนักงาน");
    }
    console.log({ message, type });
    throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูลพนักงาน");
  }
  return null;
};

export default ChangePasswordPage;
export const metadata: Metadata = {
  title: "แก้ไขรหัสผ่าน | Change Password For Staff",
  description: "แก้ไขรหัสผ่าน",
};
