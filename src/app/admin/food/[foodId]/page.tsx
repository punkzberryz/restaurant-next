import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";
import { FetchData } from "./components/fetch-data";
import { Suspense } from "react";
import { FoodSkeleton } from "./components/food-form-skeleton";

interface FoodByIdPageProps {
  params: {
    foodId: string;
  };
}
const FoodByIadPage = ({ params }: FoodByIdPageProps) => {
  const title = `${params.foodId === "new" ? "สร้าง" : "แก้ไข"}อาหาร | Food`;
  const isNew = params.foodId === "new";
  return (
    <>
      <PageHeader
        title={title}
        links={[
          { href: "/admin", title: "Dashboard" },
          { href: "/admin/food", title: "Food" },
          {
            href: "#",
            title: `${isNew ? "New" : "Edit"} Food`,
          },
        ]}
      />
      <MaxWidthWrapper>
        <Card className="mx-auto max-w-4xl">
          <CardContent className="flex flex-col space-y-8 p-6">
            <Suspense fallback={<FoodSkeleton isNew={isNew} title={title} />}>
              <FetchData foodId={params.foodId} isNew={isNew} title={title} />
            </Suspense>
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

export default FoodByIadPage;
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "สร้างหรือแก้ไขอาหาร | Food",
  description: "สร้างหรือแก้ไขอาหาร",
};
