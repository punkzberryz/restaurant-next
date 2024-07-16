"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FoodSchema, unitOptions } from "../food-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UnitFieldProps {
  form: UseFormReturn<FoodSchema>;
}
export const UnitField = ({ form }: UnitFieldProps) => {
  return (
    <FormField
      name="unit"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>หน่วย</FormLabel>
          <Select
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  defaultValue={field.value}
                  placeholder="เลือกหน่วย"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {unitOptions.map((unit) => (
                <SelectItem key={unit.value} value={unit.value}>
                  {unit.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
