import { UnauthorizedError } from "@/lib/error";
import Image from "next/image";

//We create a dictionary of messages for unauthorized users
//Make sure to match key of UnauthorizedMessage with UnauthorizedMessageCode
const UnauthorizedMessage: {
  [key: string]: string;
} = {
  notSignIn: "[Unauth] คุณยังไม่ได้เข้าสู่ระบบ",
  notFeeder: "[Unauth] คุณไม่ใช่ผู้ป้อนงาน",
  invalidQuery: "[Unauth] คุณส่งคำสั่งไม่ถูกต้อง",
  notAuthorized: "[Unauth] คุณไม่มีสิทธิ์เข้าถึงหน้านี้",
  notOwner: "[Unauth] คุณไม่ใช่เจ้าของงาน",
};

export enum UnauthorizedMessageCode {
  notSignIn = "notSignIn",
  notFeeder = "notFeeder",
  invalidQuery = "invalidQuery",
  notAuthorized = "notAuthorized",
  notOwner = "notOwner",
}

//We use this function to redirect unauthorized users to unauthorized page
export const unauthorizedRedirect = (messageCode: UnauthorizedMessageCode) => {
  throw new UnauthorizedError(UnauthorizedMessage[messageCode]);
};

export const getMessageIfUnauthorized = (message?: string) => {
  if (!message) return;
  return message.split("[Unauth] ")[1] as string | undefined;
};

interface ErrorUiProps {
  title: string;
  children: React.ReactNode;
}

export const ErrorUi = ({ title, children }: ErrorUiProps) => {
  return (
    <main className="h-screen px-10">
      <div className="flex flex-col items-center justify-center pt-10 md:grid md:grid-flow-col md:grid-rows-3">
        <header className="md:order-2 lg:col-span-2">
          <h1 className="text-3xl font-semibold tracking-wide md:text-4xl">
            {title}
          </h1>
        </header>
        <div className="relative m-10 h-[200px] w-[200px] md:order-1 md:row-span-3">
          <Image
            className="rounded-3xl"
            alt="sad panda"
            src="/img/error/sadPanda.jpg"
            sizes="200px"
            priority
            fill
          />
        </div>
        <div className="max-w-[350px] md:order-3 md:col-span-2">{children}</div>
      </div>
    </main>
  );
};
