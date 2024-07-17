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
interface NamePhoneAddressFieldsProps {
  form: UseFormReturn<RestaurantFormSchema>;
}
export const NamePhoneAddressFields = ({
  form,
}: NamePhoneAddressFieldsProps) => {
  return (
    <>
      <FormField
        name="name"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>ชื่อร้าน</FormLabel>
            <FormControl>
              <Input {...field} placeholder="ชื่อร้าน" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="phone"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>เบอร์โทร</FormLabel>
            <FormControl>
              <Input type="tel" {...field} placeholder="เบอร์โทร" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="address"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>ที่อยู่</FormLabel>
            <FormControl>
              <Input {...field} placeholder="ที่อยู่" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
