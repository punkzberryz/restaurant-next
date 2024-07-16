"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FoodSchema } from "../food-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
interface CategoryFieldProps {
  form: UseFormReturn<FoodSchema>;
  categories: Category[];
}
export const CategoryField = ({ form, categories }: CategoryFieldProps) => {
  return (
    <FormField
      name="categoryId"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>เลือกหมวดหมู่</FormLabel>
          <Select
            onValueChange={(value) => {
              const intVal = parseInt(value);
              if (!isNaN(intVal)) {
                field.onChange(intVal);
              }
            }}
            value={field.value?.toString()}
            defaultValue={field.value?.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  defaultValue={field.value}
                  placeholder="เลือกหมวดหมู่"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
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
