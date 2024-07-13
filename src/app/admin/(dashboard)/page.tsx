import { GetMe } from "@/app/get-me";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";

const DashboardPage = () => {
  return (
    <>
      <PageHeader
        title="หน้าหลัก | Dashboard"
        links={[{ href: "/admin", title: "Dashboard" }]}
      />
      <MaxWidthWrapper>
        <div>dashboard</div>

        <GetMe />
      </MaxWidthWrapper>
    </>
  );
};

export default DashboardPage;
