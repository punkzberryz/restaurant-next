import { Skeleton } from "@/components/ui/skeleton";
import { validateRequest } from "@/lib/auth";
import { delay } from "@/lib/delay";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const FetchUserOnAuth = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Suspense
        fallback={
          <>
            <Skeleton className="h-40" />
            <Skeleton className="h-14" />
          </>
        }
      >
        <FetchUserAsync>{children}</FetchUserAsync>
      </Suspense>
    </>
  );
};
const FetchUserAsync = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await validateRequest();
  if (user?.role === "ADMIN") {
    return redirect("/admin");
  }
  if (user?.role === "USER") {
    return redirect("/cashier");
  }
  if (user) {
    return <p className="text-center">คุณได้เข้าสู่ระบบแล้ว</p>;
  }
  return <>{children}</>;
};
