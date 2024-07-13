import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { SignUpForm } from "./components/form/signup-form";
import { Metadata } from "next";

const SignUpPage = () => {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-center">Restaurant Management System</h1>
      <Card className="md:w-[500px]">
        <CardHeader className="text-center">
          <CardTitle>สมัครสมาชิก</CardTitle>
          <CardDescription>
            สมัครสมาชิกเพื่อใช้งานระบบจัดการร้านอาหาร
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <SignUpForm />
          <Link
            className="text-center text-indigo-600 hover:text-indigo-400 hover:underline"
            href="/auth/signin"
          >
            ล็อคอินเข้าสู่ระบบ
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;

export const metadata: Metadata = {
  title: "สมัครสมาชิก",
  description: "สมัครสมาชิกเพื่อใช้งานระบบจัดการร้านอาหาร",
};
