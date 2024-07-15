import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PageHeader } from "@/components/navbar/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";
import { FoodForm } from "./components/food-form";
interface FoodByIdPageProps {
  params: {
    foodId: string;
  };
}
const FoodByIadPage = ({ params }: FoodByIdPageProps) => {
  const title = `${params.foodId === "new" ? "สร้าง" : "แก้ไข"}อาหาร | Food`;
  return (
    <>
      <PageHeader
        title={title}
        links={[
          { href: "/admin", title: "Dashboard" },
          { href: "/admin/food", title: "Food" },
          {
            href: "#",
            title: `${params.foodId === "new" ? "New" : "Edit"} Food`,
          },
        ]}
      />
      <MaxWidthWrapper className="flex flex-col">
        <Card>
          <CardContent className="flex flex-col space-y-8 p-6">
            <FoodForm isNew title={title} initialData={null} />
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
