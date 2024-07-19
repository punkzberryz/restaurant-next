"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import {
  changePasswordSchema,
  ChangePasswordSchema,
} from "./change-password-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoadingBars } from "@/components/ui/loading-bars";
import { changeUserPasswordAction } from "./change-password-action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ChangePasswordFormProps {
  staff: User;
}
export const ChangePasswordForm = ({ staff }: ChangePasswordFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const handleFormSubmit = async (data: ChangePasswordSchema) => {
    if (data.confirmPassword !== data.password) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "รหัสผ่านไม่ตรงกัน",
      });
      return;
    }
    setLoading(true);
    const { error, staff: user } = await changeUserPasswordAction({
      data,
      staffId: staff.id,
    });
    if (error) {
      toast.error("เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน");
      console.error({ error });
      setLoading(false);
      return;
    }
    toast.success("แก้ไขรหัสผ่านสำเร็จ");
    router.refresh();
    router.push("/admin/staff");
    setLoading(false);
  };
  return (
    <>
      <div className="flex flex-col space-y-4 rounded-md border p-6">
        <h2 className="pb-4 text-lg font-semibold">ข้อมูลพนักงาน</h2>
        <div className="flex items-center space-x-2">
          <Label className="w-[100px]">Display name</Label>
          <div>
            <p>{staff.displayName}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Label className="w-[100px]">Email</Label>
          <div>
            <p>{staff.email}</p>
          </div>
        </div>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col space-y-4 rounded-md border p-6"
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <h2 className="pb-4 text-lg font-semibold">แบบฟอร์มแก้ไขรหัสผ่าน</h2>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password (ยืนยันรหัส)</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Buttons */}
          <div className="flex flex-col gap-4 md:flex-row-reverse">
            <Button type="submit" className="min-w-[150px]" disabled={loading}>
              {loading ? <LoadingBars /> : "บันทึก"}
            </Button>
            <Button
              className="min-w-[150px]"
              variant="secondary"
              onClick={() => form.reset()}
              disabled={loading}
              type="button"
            >
              ยกเลิก
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
