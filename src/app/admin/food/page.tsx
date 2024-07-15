import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

const FoodPage = () => {
  return (
    <>
      <PageHeader
        title="จัดการอาหาร | Food"
        links={[
          { href: "/admin", title: "Dashboard" },
          { href: "#", title: "Food" },
        ]}
      />
      <MaxWidthWrapper>
        <Card>
          <CardContent className="flex flex-col space-y-8 p-6">
            <div className="flex items-center justify-between">
              <CardTitle>รายการอาหาร</CardTitle>
              <Link href="/admin/food/new" className={buttonVariants({})}>
                <Plus className="h-4 w-4 md:mr-2" />
                <span className="hidden md:block">สร้างใหม่</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

export default FoodPage;
const FOODS_LIMIT = 100;
const FOODS_PAGE_ID = 1;
export const metadata: Metadata = {
  title: "จัดการอาหาร | Food",
  description: "จัดการอาหาร",
};
