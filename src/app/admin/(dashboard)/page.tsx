import { GetMe } from "@/app/get-me";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";
import { Client } from "./components/client";
import { FoodsMetricCard } from "./components/foods-metric-card";
import { BillMetricCard } from "./components/bill-metric-card";
import { SaleMetricCard } from "./components/sales-metric-card";
import { StaffMetricCard } from "./components/staff-metric-card";

const DashboardPage = () => {
  return (
    <>
      <PageHeader
        title="หน้าหลัก | Dashboard"
        links={[{ href: "/admin", title: "Dashboard" }]}
      />
      <MaxWidthWrapper>
        <div className="flex flex-wrap gap-6">
          <SaleMetricCard />
          <BillMetricCard />
          <FoodsMetricCard />
          <StaffMetricCard />
        </div>
        <Client />
      </MaxWidthWrapper>
    </>
  );
};

export default DashboardPage;
