"use client";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RestaurantFormSchema } from "./restaurant-schema";
interface DescriptionFieldProps {
  form: UseFormReturn<RestaurantFormSchema>;
}
export const DescriptionField = ({ form }: DescriptionFieldProps) => {
  return (
    <FormField
      name="description"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            คำบรรยาย{" "}
            <span className="font-light text-gray-500">(ไม่บังคับ)</span>
          </FormLabel>
          <FormControl>
            <Input {...field} placeholder="คำบรรยาย" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
