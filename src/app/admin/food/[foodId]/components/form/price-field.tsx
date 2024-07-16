"use client";
import { UseFormReturn } from "react-hook-form";
import { FoodSchema } from "../food-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
interface PriceFieldProps {
  form: UseFormReturn<FoodSchema>;
}
export const PriceField = ({ form }: PriceFieldProps) => {
  const [value, setValue] = useState(form.getValues("price")?.toString() ?? "");
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    form.clearErrors("price");
    const value = e.target.value;
    setValue(value);
    const price = parseFloat(value);
    if (isNaN(price)) {
      form.setError("price", {
        type: "manual",
        message: "ราคาอาหารต้องเป็นตัวเลข",
      });
      return;
    }
    form.setValue("price", price);
  };
  return (
    <FormField
      name="price"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>ราคาอาหาร (บาท / หน่วย)</FormLabel>
          <FormControl>
            <Input
              value={value}
              onChange={onInputChange}
              placeholder="ราคาอาหาร"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
