import { PageHeader } from "@/components/navbar/page-header";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { Suspense } from "react";
import { CategoryForm } from "./components/category-form";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { BadRequestError, UnauthorizedError } from "@/lib/error";
import { CategorySkeleton } from "./components/category-skeleton";
import { validateRequest } from "@/lib/auth";
import { UnauthorizedMessageCode } from "@/components/error-ui";

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
        role="admin"
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
    const validateReq = validateRequest();
    const categoryReq = db.category.findUnique({ where: { id } });
    const [{ user }, category] = await Promise.all([validateReq, categoryReq]);

    if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notSignIn);
    if (user?.role !== "ADMIN")
      throw new UnauthorizedError(UnauthorizedMessageCode.notAdmin);

    if (!category) throw new BadRequestError("ไม่พบหมวดหมู่อาหาร");
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
