import { PageHeader } from "@/components/navbar/page-header";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { Suspense } from "react";
import { CategoryForm } from "./components/category-form";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { BadRequestError } from "@/lib/error";
import { CategorySkeleton } from "./components/category-skeleton";

interface CategoryByIdPageProps {
  params: { categoryId: string };
}
const CategoryByIdPage = ({ params }: CategoryByIdPageProps) => {
  const title = `${params.categoryId === "new" ? "สร้าง" : "แก้ไข"}หมวดหมู่อาหาร | Category`;
  return (
    <>
      <PageHeader
        title={title}
        links={[
          { href: "/admin", title: "Dashboard" },
          { href: "/admin/category", title: "Category" },
          {
            href: "#",
            title: `${params.categoryId === "new" ? "New" : "Edit"} Category`,
          },
        ]}
      />
      <MaxWidthWrapper>
        <Card className="mx-auto max-w-4xl">
          <CardContent className="flex flex-col space-y-8 p-6">
            {params.categoryId === "new" ? (
              <CategoryForm isNew initialData={null} title={title} />
            ) : (
              <Suspense
                fallback={<CategorySkeleton title={title} isNew={false} />}
              >
                <FetchCategoryById
                  categoryId={params.categoryId}
                  title={title}
                />
              </Suspense>
            )}
          </CardContent>
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

const FetchCategoryById = async ({
  categoryId,
  title,
}: {
  categoryId: string;
  title: string;
}) => {
  const id = parseInt(categoryId);
  if (isNaN(id)) throw new BadRequestError();
  try {
    const category = await db.category.findUnique({ where: { id } });
    if (!category) throw new BadRequestError();
    return <CategoryForm isNew={false} initialData={category} title={title} />;
  } catch (error) {
    throw error;
  }
};

export default CategoryByIdPage;
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "สร้างหรือแก้ไขหมวดหมู่อาหาร | Category",
  description: "สร้างหรือแก้ไขหมวดหมู่อาหาร",
};
