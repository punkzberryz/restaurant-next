"use client";
import { UseFormReturn } from "react-hook-form";
import { FoodSchema } from "../../../components/food-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
interface NameFieldProps {
  form: UseFormReturn<FoodSchema>;
}
export const NameField = ({ form }: NameFieldProps) => {
  return (
    <FormField
      name="name"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>ชื่ออาหาร</FormLabel>
          <FormControl>
            <Input {...field} placeholder="ชื่ออาหาร" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
