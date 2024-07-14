"use client";

import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getManyCategoriesAction } from "./category-action";
import { Category } from "@prisma/client";
import { DataTable } from "@/components/table/data-table";
import { categoryColumnDef } from "./table/category-column-def";
interface ClientProps {
  limit: number;
  initialData: { categories: Category[]; hasMore: boolean };
}

export const Client = ({ limit, initialData }: ClientProps) => {
  const queryClient = useQueryClient();
  const [pageId, setPageId] = useState(1);
  const [pageLimit, setPageLimit] = useState(limit);
  const { data, refetch, isPlaceholderData } = useQuery({
    // We add initialData so that when we delete data in this table, it will clear query-cache.
    // But what if the data is on second page??
    queryKey: ["getManyCategoriesAction", pageId, pageLimit, initialData],
    queryFn: () => getManyCategories({ pageId, limit: pageLimit }),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
    initialData,
  });
  useEffect(() => {
    refetch();
  }, [pageLimit, refetch]);
  //prefetch next page
  useEffect(() => {
    if (!isPlaceholderData && data.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["getManyCategoriesAction", pageId + 1],
        queryFn: () =>
          getManyCategories({ pageId: pageId + 1, limit: pageLimit }),
      });
    }
  }, [data, isPlaceholderData, pageId, queryClient, pageLimit]);
  return (
    <div>
      <DataTable columns={categoryColumnDef} data={data.categories} />
    </div>
  );
};

const getManyCategories = async ({
  pageId,
  limit,
}: {
  pageId: number;
  limit: number;
}) => {
  const { categories, error } = await getManyCategoriesAction({
    pageId,
    limit,
  });
  if (error) {
    throw new Error(error.message);
  }
  return {
    categories,
    hasMore: categories.length > 0,
  };
};
