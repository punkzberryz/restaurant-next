"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { staffFormSchema, StaffFormSchema } from "../staff-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { DisplayNameAndEmailFields } from "./displayname-and-email-fields";
import { UserRoleField } from "./user-role-field";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingBars } from "@/components/ui/loading-bars";
import { editStaffAction } from "../edit-staff-action";
import { EditStaffErrorResponse } from "../edit-staff-error-response";
import toast from "react-hot-toast";

interface EditStaffFormProps {
  initialData: User;
}
export const EditStaffForm = ({ initialData }: EditStaffFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<StaffFormSchema>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      displayName: initialData.displayName,
      email: initialData.email ?? "",
      role: initialData.role,
    },
  });
  const handleFormSubmit = async (data: StaffFormSchema) => {
    setLoading(true);
    const { error, staff } = await editStaffAction({
      data,
      staffId: initialData.id,
    });
    if (error) {
      if (error.message === EditStaffErrorResponse.emailAlreadyExists) {
        toast.error("อีเมลนี้มีผู้ใช้งานแล้ว");
        return;
      }
      toast.error("เกิดข้อผิดพลาด");
      console.error({ error });
      return;
    }
    toast.success("แก้ไขข้อมูลพนักงานสำเร็จ");
    router.push(`/admin/staff/${staff.id}`);
    router.refresh();
    setLoading(false);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex flex-col space-y-6"
      >
        <DisplayNameAndEmailFields form={form} />
        <UserRoleField form={form} />
        {/* Buttons */}
        <div className="flex flex-col gap-4 md:flex-row-reverse">
          <Button type="submit" className="min-w-[150px]" disabled={loading}>
            {loading ? <LoadingBars /> : "บันทึก"}
          </Button>
          <Button
            className="min-w-[150px]"
            variant="secondary"
            onClick={() => router.push("/admin/staff")}
            disabled={loading}
            type="button"
          >
            ยกเลิก
          </Button>
        </div>
      </form>
    </Form>
  );
};
