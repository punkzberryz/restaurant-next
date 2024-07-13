import { UseFormReturn } from "react-hook-form";
import { SignUpSchema } from "./signup-schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const EmailField = ({ form }: { form: UseFormReturn<SignUpSchema> }) => {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel className="absolute left-2.5 top-5 font-semibold text-gray-800 dark:text-gray-200">
            Email
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              type="email"
              placeholder="Email"
              className="pb-4 pt-12"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
