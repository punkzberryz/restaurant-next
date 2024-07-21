"use client";

import { Form } from "@/components/ui/form";
import { FieldErrors, useForm } from "react-hook-form";
import { signUpSchema, SignUpSchema } from "./signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailField } from "./email-field";
import { UsernameField } from "./username-field";
import { PasswordFields } from "./password-fields";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupAction } from "../signup-action";
import toast from "react-hot-toast";
import { SignUpErrorResponse } from "../signup-error-response";
import { LoadingBars } from "@/components/ui/loading-bars";

export const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      displayName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = async (data: SignUpSchema) => {
    if (data.confirmPassword !== data.password) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Password and confirm password do not match",
      });
      return;
    }
    setIsLoading(true);
    const { error, session, user } = await signupAction({ data });
    setIsLoading(false);
    if (error || !session || !user) {
      if (error.message === SignUpErrorResponse.emailAlreadyExists) {
        toast.error("อีเมลนี้มีผู้ใช้งานแล้ว");
        return;
      }
      toast.error("เกิดข้อผิดพลาด");
      return;
    }

    toast.success("สมัครสมาชิกสำเร็จ");
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
        <UsernameField form={form} />
        <PasswordFields form={form} />
        <div className="flex flex-col pt-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <LoadingBars /> : "สมัครสมาชิก"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
const handleFormError = (error: FieldErrors<SignUpSchema>) => {};
