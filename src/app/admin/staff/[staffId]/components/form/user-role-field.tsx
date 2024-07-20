"use client";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { StaffFormSchema } from "../staff-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  userRoleLabels,
  userRoleOptions,
} from "@/app/auth/components/user-schema";

export const UserRoleField = ({
  form,
}: {
  form: UseFormReturn<StaffFormSchema>;
}) => {
  return (
    <FormField
      control={form.control}
      name="role"
      render={({ field }) => (
        <FormItem>
          <FormLabel>ระดับผู้ใช้งาน</FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>{userRoleLabels.get(field.value)}</SelectTrigger>
            </FormControl>
            <SelectContent>
              {userRoleOptions.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
