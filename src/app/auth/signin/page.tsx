import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { SignInForm } from "./components/form/signin-form";
const SignInPage = () => {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-center">Restaurant Management System</h1>
      <Card className="md:w-[500px]">
        <CardHeader className="text-center">
          <CardTitle>ล็อคอินเข้าสู่ระบบ</CardTitle>
          <CardDescription>
            ล็อคอินพื่อใช้งานระบบจัดการร้านอาหาร
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <SignInForm />
          <Link
            className="text-center text-indigo-600 hover:text-indigo-400 hover:underline"
            href="/auth/signup"
          >
            สมัครสมาชิก
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
export const metadata: Metadata = {
  title: "ล็อคอินเข้าสู่ระบบ",
  description: "ล็อคอินพื่อใช้งานระบบจัดการร้านอาหาร",
};
