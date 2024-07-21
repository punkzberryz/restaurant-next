"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signInSchema, SignInSchema } from "./signin-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LoadingBars } from "@/components/ui/loading-bars";
import { EmailField } from "./email-field";
import { PasswordField } from "./password-fields";
import { signinAction } from "../signin-action";
import { SignInErrorResponse } from "../signin-error-response";
import toast from "react-hot-toast";

export const SignInForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = async (data: SignInSchema) => {
    setIsLoading(true);
    const { error, session, user } = await signinAction({ data });

    setIsLoading(false);
    if (error || !session || !user) {
      if (error.message === SignInErrorResponse.passwordOrEmailIsNotMatch) {
        toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        return;
      }
      toast.error("เกิดข้อผิดพลาด");
      return;
    }
    toast.success("เข้าสู่ระบบสำเร็จ");
    if (user.role === "ADMIN") {
      router.push("/admin");
      router.refresh();
      return;
    } else {
      router.push("/cashier");
      router.refresh();
      return;
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
        className="flex flex-col space-y-4"
      >
        <EmailField form={form} />
        <PasswordField form={form} />
        <div className="flex flex-col pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <LoadingBars /> : "เข้าสู่ระบบ"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
const handleFormError = (error: FieldErrors<SignInSchema>) => {};
