"use client";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { StaffFormSchema } from "../staff-schema";
import { Input } from "@/components/ui/input";

export const DisplayNameAndEmailFields = ({
  form,
}: {
  form: UseFormReturn<StaffFormSchema>;
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="displayName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ชื่อแสดง (Display name)</FormLabel>
            <FormControl>
              <Input {...field} type="text" placeholder="Username" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>อีเมล</FormLabel>
            <FormControl>
              <Input {...field} type="email" placeholder="Email" />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};
