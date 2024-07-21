import { validateRequest } from "@/lib/auth";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { UnauthorizedMessageCode } from "@/components/error-ui";
import { UnauthorizedError } from "@/lib/error";

export const StaffMetricCard = () => {
  return (
    <StaffMetricUi>
      <Suspense fallback={<StaffMetricFetch.Skeleton />}>
        <StaffMetricFetch />
      </Suspense>
    </StaffMetricUi>
  );
};

const StaffMetricFetch = async () => {
  const userReq = validateRequest();
  const staffReq = db.user.findMany({ select: { id: true } });
  const [{ user }, staffs] = await Promise.all([userReq, staffReq]);
  if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notSignIn);
  if (user?.role !== "ADMIN")
    throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);
  return <p>{staffs.length} คน</p>;
};

StaffMetricFetch.Skeleton = function StaffMetricSkeleton() {
  return (
    <Skeleton className="rounded-md bg-white/50">
      <p className="text-transparent">0 คน</p>
    </Skeleton>
  );
};

const StaffMetricUi = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-[100px] w-[300px] flex-col justify-between rounded-md bg-teal-500">
      <div className="absolute right-5 top-0">
        <Users className="h-auto w-20 text-teal-700/50" />
      </div>
      <div className="p-4 text-2xl text-white">
        <p>พนักงาน</p>
        {children}
      </div>
      <Link href="/admin/staff">
        <div className="flex items-center justify-center space-x-2 rounded-b-md bg-teal-700 py-2">
          <p className="text-white">รายละเอียดเพิ่มเติม</p>
          <ArrowRight className="h-4 w-4 rounded-full bg-white text-teal-500" />
        </div>
      </Link>
    </div>
  );
};
