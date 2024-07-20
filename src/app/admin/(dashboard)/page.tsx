import { GetMe } from "@/app/get-me";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";
import { Client } from "./components/client";
import { FoodsMetricCard } from "./components/foods-metric-card";
import { BillMetricCard } from "./components/bill-metric-card";
import { SaleMetricCard } from "./components/sales-metric-card";
import { StaffMetricCard } from "./components/staff-metric-card";
import { FetchSalesData } from "./components/chart/fetch-sale-data";

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
      </MaxWidthWrapper>
    </>
  );
};

export default DashboardPage;
