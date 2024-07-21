import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";
import { Client } from "./components/client";
import { FoodsMetricCard } from "./components/foods-metric-card";
import { BillMetricCard } from "./components/bill-metric-card";
import { SaleMetricCard } from "./components/sales-metric-card";
import { StaffMetricCard } from "./components/staff-metric-card";
import { FetchSalesData } from "./components/chart/fetch-sale-data";
import { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import { validateRequest } from "@/lib/auth";
import { UnauthorizedMessageCode } from "@/components/error-ui";
import { UnauthorizedError } from "@/lib/error";

interface DashboardPageProps {
  searchParams: {
    salesXAxis?: string | "month" | "year";
  };
}
const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  let salesXAxis: "month" | "year" | undefined = undefined;
  if (
    searchParams.salesXAxis === "month" ||
    searchParams.salesXAxis === "year"
  ) {
    salesXAxis = searchParams.salesXAxis;
  }

  return (
    <>
      <PageHeader
        title="หน้าหลัก | Dashboard"
        links={[{ href: "/admin", title: "Dashboard" }]}
        role="admin"
      />
      <MaxWidthWrapper className="flex flex-col space-y-8">
        <div className="flex flex-wrap gap-6">
          <SaleMetricCard />
          <BillMetricCard />
          <FoodsMetricCard />
          <StaffMetricCard />
        </div>
        <FetchSalesData salesXAxis={salesXAxis} />
        <Client />
        {/* <ProtectedAdminRoute /> */}
      </MaxWidthWrapper>
    </>
  );
};

const ProtectedAdminRoute = async ({ children }: { children?: ReactNode }) => {
  const { user } = await validateRequest();
  if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notSignIn);
  if (user?.role !== "ADMIN")
    throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);

  return <Suspense>{children}</Suspense>;
};

export default DashboardPage;
export const metadata: Metadata = {
  title: "รายงาน | Dashboard",
  description: "รายงานข้อมูลทั้งหมดของร้านค้า",
};
