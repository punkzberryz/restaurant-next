"use client";

import { Form } from "@/components/ui/form";
import { Food } from "@prisma/client";
import { FieldErrors, useForm } from "react-hook-form";
import { OrderFormSchema, orderFormSchema } from "./order-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddFoodField } from "./add-food-field";
import { OrderTable } from "./order-table";
import { Button } from "@/components/ui/button";
import { LoadingBars } from "@/components/ui/loading-bars";
import { useState } from "react";
import { createOrderAction } from "./order-action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { formatDateToString } from "@/lib/format-date";

interface OrderFormProps {
  menu: (Food & { category: string })[];
}
export const OrderForm = ({ menu }: OrderFormProps) => {
  const form = useForm<OrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      foods: [],
      date: new Date().toISOString(),
      status: "DELIVERED",
    },
  });
  const { loading, handleFormSubmit } = useOrderForm();
  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-8"
        onSubmit={form.handleSubmit(handleFormSubmit, onSubmitError)}
      >
        <AddFoodField form={form} menu={menu} />
        <OrderTable form={form} />

        <div className="flex flex-col gap-4 md:flex-row-reverse">
          <Button type="submit" className="min-w-[150px]" disabled={loading}>
            {loading ? <LoadingBars /> : "สร้างออเดอร์"}
          </Button>
          <Button
            className="min-w-[150px]"
            variant="secondary"
            onClick={() => form.reset()}
            disabled={loading}
            type="button"
          >
            ลบ
          </Button>
        </div>
      </form>
    </Form>
  );
};

const useOrderForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleFormSubmit = async (data: OrderFormSchema) => {
    setLoading(true);
    const { error, order } = await createOrderAction({ data });
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการสร้างออเดอร์");
      console.error({ error });
      setLoading(false);
      return;
    }
    toast.success("สร้างออเดอร์สำเร็จ");
    setLoading(false);
    router.refresh();
    router.push("/admin/bill");
  };
  return { loading, handleFormSubmit };
};

const onSubmitError = (err: FieldErrors<OrderFormSchema>) => {
  console.log(err);
};
