import { Restaurant } from "@prisma/client";
import { BillTable } from "./bill-table";
import { formatDateToThaiDate } from "@/lib/format-date";
import { formatPhoneNumber } from "@/lib/format-phone";
import { orderStatusLabels } from "@/app/admin/order/components/order-schema";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Bill } from "@/app/admin/bill/components/bill-schema";

interface BillCardProps {
  bill: Bill;
  restaurant: Restaurant;
}
export const BillCard = ({ bill, restaurant }: BillCardProps) => {
  return (
    <>
      <h1 className="text-nowrap text-center font-semibold md:text-3xl">
        {restaurant.name}
      </h1>
      <div className="mx-auto flex w-fit flex-col space-y-2 md:ml-0 md:w-full md:flex-row md:justify-between md:space-y-0">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <p className="w-[100px] md:w-fit">โทร.</p>
            <p>{formatPhoneNumber(restaurant.phone)}</p>
          </div>
          <div className="flex space-x-2">
            <p className="w-[100px] md:w-fit">วันที่</p>
            <p>{formatDateToThaiDate(bill.date.toDateString())}</p>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <p className="w-[100px]">รหัสบิล</p>
            <p>{bill.id}</p>
          </div>
          <div className="flex space-x-2">
            <p className="w-[100px]">สถานะ</p>
            <p
              className={cn(
                "mx-1",
                bill.status === "DELIVERED" ? "text-green-500" : "",
              )}
            >
              {orderStatusLabels.get(bill.status)}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <p className="w-[100px]">รับออเดอร์โดย</p>
            <Link
              href={`#`}
              className="text-primary underline-offset-4 hover:underline"
            >
              {bill.staff.displayName}
            </Link>
          </div>
        </div>
      </div>
      <BillTable bill={bill} />
    </>
  );
};
