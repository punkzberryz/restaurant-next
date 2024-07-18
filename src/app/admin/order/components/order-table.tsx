"use client";
import { UseFormReturn } from "react-hook-form";
import { OrderFormSchema } from "./order-schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { unitLabels } from "../../food/components/food-schema";
import { formatPrice } from "@/lib/format-price";

interface OrderTableProps {
  form: UseFormReturn<OrderFormSchema>;
}
export const OrderTable = ({ form }: OrderTableProps) => {
  const [foods, totalPrice, date] = form.watch(["foods", "totalPrice", "date"]);

  const handleRemoveFood = (index: number) => {
    const foods = form.getValues("foods");
    foods.splice(index, 1);
    form.setValue("foods", foods);
    const totalPrice = foods.reduce((acc, food) => acc + food.totalPrice, 0);
    form.setValue("totalPrice", totalPrice);
  };

  return (
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
            <TableHead scope="col">...</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {foods.length === 0 ? (
            <EmptyFoods />
          ) : (
            foods.map((food, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{food.name}</TableCell>
                <TableCell>{food.price}</TableCell>
                <TableCell>{food.quantity}</TableCell>
                <TableCell>{unitLabels.get(food.unit)}</TableCell>
                <TableCell>{formatPrice(food.totalPrice, {})}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    className=""
                    size="sm"
                    onClick={() => handleRemoveFood(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
          {foods.length === 0 ? null : (
            <SummaryRow totalPrice={totalPrice} date={date} />
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const EmptyFoods = () => {
  return (
    <TableRow>
      <TableCell colSpan={7} className="py-10 text-center">
        โปรดเพิ่มรายการอาหาร
      </TableCell>
    </TableRow>
  );
};

const SummaryRow = ({
  totalPrice,
  date,
}: {
  totalPrice: number;
  date: string;
}) => {
  return (
    <>
      <TableRow className="bg-secondary">
        <TableCell colSpan={5}>
          <p className="ml-auto w-[100px]">รวมทั้งสิ้น</p>
        </TableCell>
        <TableCell colSpan={2}>{formatPrice(totalPrice)} บาท</TableCell>
      </TableRow>
      <TableRow className="bg-secondary">
        <TableCell colSpan={5}>
          <p className="ml-auto w-[100px]">วันที่</p>
        </TableCell>
        <TableCell colSpan={2}>{date}</TableCell>
      </TableRow>
    </>
  );
};
