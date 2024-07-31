"use client";

import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getManyFoodsAction } from "./food-action";
import { DataTable } from "@/components/table/data-table";
import { foodColumnDef } from "./table/food-column-def";
import { TablePageLimit } from "@/components/table/table-page-limit";
import { TablePaginationButtons } from "@/components/table/table-pagination-buttons";
import { FoodWithImagesAndCategory } from "./food-schema";
import {
  cloudinaryFolderName,
  deleteImageCloudinaryAction,
  useImageToBeDeletedStore,
} from "@/components/image-input";

interface ClientProps {
  limit: number;
  initialData: { foods: FoodWithImagesAndCategory[]; hasMore: boolean };
}
export const Client = ({ initialData, limit }: ClientProps) => {
  const { removeUrl, urls } = useImageToBeDeletedStore();
  const queryClient = useQueryClient();
  const [pageId, setPageId] = useState(1);
  const [pageLimit, setPageLimit] = useState(limit);
  const { data, refetch, isPlaceholderData } = useQuery({
    // We add initialData so that when we delete data in this table, it will clear query-cache.
    // But what if the data is on second page??
    queryKey: ["getManyCategoriesAction", pageId, pageLimit, initialData],
    queryFn: () => getManyFoods({ pageId: pageId, limit: pageLimit }),
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
        queryKey: ["getManyFoods", pageId + 1],
        queryFn: () => getManyFoods({ pageId: pageId + 1, limit: pageLimit }),
      });
    }
  }, [data, isPlaceholderData, pageId, queryClient, pageLimit]);
  //delte images from upload store
  useEffect(() => {
    if (urls.length === 0) return;
    urls.forEach((url) =>
      deleteImageCloudinaryAction({
        url,
        folder: cloudinaryFolderName.foods,
      }).then(({ error, invalidUrl }) => {
        if (error) {
          console.error(error.message);
          return;
        }
        if (invalidUrl) {
          console.error("Invalid url");
          return;
        }
        removeUrl(url);
      }),
    );
  }, [urls, removeUrl]);

  return (
    <div className="flex flex-col space-y-8">
      <DataTable columns={foodColumnDef} data={data.foods} />
      <div className="items-cente mt-5 flex justify-end space-x-6">
        <TablePageLimit setPageLimit={setPageLimit} />
        <TablePaginationButtons
          hasMore={data.hasMore}
          pageId={pageId}
          setPageId={setPageId}
          isPlaceholderData={isPlaceholderData}
        />
      </div>
    </div>
  );
};

const getManyFoods = async ({
  pageId,
  limit,
}: {
  pageId: number;
  limit: number;
}) => {
  const { foods, error } = await getManyFoodsAction({ pageId, limit });

  if (error) throw new Error(error.message);
  return {
    foods,
    hasMore: foods.length === limit,
  };
};
