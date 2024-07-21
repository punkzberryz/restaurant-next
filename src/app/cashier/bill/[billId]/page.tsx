import { PageHeader } from "@/components/navbar/page-header";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  BadRequestError,
  catchErrorTypeChecker,
  ErrorType,
  UnauthorizedError,
} from "@/lib/error";
import { Metadata } from "next";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import { BillCard } from "./components/bill-card";
import { UnauthorizedMessageCode } from "@/components/error-ui";
import { Bill } from "@/app/admin/bill/components/bill-schema";
interface BillByIdPageProps {
  params: { billId: string };
}
const BillByIdPage = ({ params }: BillByIdPageProps) => {
  return (
    <>
      <PageHeader
        title="รายละเอียดการขาย | Bill Details"
        links={[
          { href: "/cashier/bill", title: "Bill" },
          { href: "#", title: "Bill Details" },
        ]}
        role="cashier"
      />
      <MaxWidthWrapper>
        <Card className="mx-auto max-w-4xl">
          <CardContent className="flex flex-col space-y-8 p-6">
            <Suspense fallback={null}>
              <FetchBill id={params.billId} />
            </Suspense>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

const FetchBill = async ({ id }: { id: string }) => {
  try {
    //fetch data
    const orderReq = db.order.findUnique({
      where: { id },
      include: {
        staff: {
          select: {
            displayName: true,
            id: true,
          },
        },
      },
    });
    const validateReq = validateRequest();
    const restaurantReq = db.restaurant.findFirst();
    const [order, { user }, restaurant] = await Promise.all([
      orderReq,
      validateReq,
      restaurantReq,
    ]);
    //validate data
    if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notSignIn);

    if (!order || !restaurant) throw new BadRequestError();

    const foods: Bill["foods"] = JSON.parse(order.foods);
    return <BillCard bill={{ ...order, foods }} restaurant={restaurant} />;
  } catch (e) {
    const { message, type } = catchErrorTypeChecker(e);
    if (type === ErrorType.Unauthorized) {
      throw new UnauthorizedError("คุณไม่มีสิทธิ์ในการดูข้อมูลนี้");
    }
    if (type === ErrorType.BadRequest) {
      throw new BadRequestError("ไม่พบข้อมูลที่ค้นหา");
    }
    console.error({ message, type });
    throw new Error("เกิดข้อผิดพลาดในการค้นหาข้อมูล");
  }
};

export default BillByIdPage;
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "รายละเอียดการขาย | Bill Details",
  description: "รายละเอียดการขาย",
};
