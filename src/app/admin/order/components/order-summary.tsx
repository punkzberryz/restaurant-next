"use client";

import { UseFormReturn } from "react-hook-form";
import { OrderFormSchema } from "./order-schema";

interface OrderSummaryProps {
  form: UseFormReturn<OrderFormSchema>;
}
export const OrderSummary = ({ form }: OrderSummaryProps) => {
  const foods = form.watch("foods");
  //calculate total price

  return <div></div>;
};
