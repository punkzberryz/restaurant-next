import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { unitLabels } from "@/app/admin/food/components/food-schema";
import { formatPrice } from "@/lib/format-price";
import { Bill } from "@/app/admin/bill/components/bill-schema";
interface BillTableProps {
  bill: Bill;
}
export const BillTable = ({
  bill: { foods, totalPrice, date, staff },
}: BillTableProps) => {
  return (
    <>
      <div className="min-h-[149px] rounded-md border">
        <Table>
          <TableHeader className="bg-primary/10">
            <TableRow>
              <TableHead scope="col">#</TableHead>
              <TableHead scope="col" className="md:min-w-[300px]">
                สินค้า
              </TableHead>
              <TableHead scope="col">ราคา/หน่วย</TableHead>
              <TableHead scope="col">จำนวน</TableHead>
              <TableHead scope="col">หน่วย</TableHead>
              <TableHead scope="col">รวม</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {foods.map((food, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{food.name}</TableCell>
                <TableCell>{food.price}</TableCell>
                <TableCell>{food.quantity}</TableCell>
                <TableCell>{unitLabels.get(food.unit)}</TableCell>
                <TableCell>{formatPrice(food.totalPrice, {})}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-secondary">
              <TableCell colSpan={5}>
                <p className="ml-auto w-[100px]">รวมทั้งสิ้น</p>
              </TableCell>
              <TableCell colSpan={2}>{formatPrice(totalPrice)} บาท</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};
