"use client";

import { Order } from "@prisma/client";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/data-table";
import { TablePageLimit } from "@/components/table/table-page-limit";
import { TablePaginationButtons } from "@/components/table/table-pagination-buttons";
import { orderColumnDef } from "./order-column-def";
import { getManyOrdersAction } from "./bill-action";

interface ClientProps {
  limit: number;
  initialData: { orders: Order[]; hasMore: boolean };
}
export const Client = ({ limit, initialData }: ClientProps) => {
  const queryClient = useQueryClient();
  const [pageId, setPageId] = useState(1);
  const [pageLimit, setPageLimit] = useState(limit);
  const { data, refetch, isPlaceholderData } = useQuery({
    // We add initialData so that when we delete data in this table, it will clear query-cache.
    // But what if the data is on second page??
    queryKey: ["getManyOrders", pageId, pageLimit, initialData],
    queryFn: () => getManyOrders({ pageId: pageId, limit: pageLimit }),
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
        queryFn: () => getManyOrders({ pageId: pageId + 1, limit: pageLimit }),
      });
    }
  }, [data, isPlaceholderData, pageId, queryClient, pageLimit]);
  return (
    <div className="flex flex-col space-y-8">
      <DataTable columns={orderColumnDef} data={data.orders} />
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
const getManyOrders = async ({
  pageId,
  limit,
}: {
  pageId: number;
  limit: number;
}) => {
  const { orders, error } = await getManyOrdersAction({ pageId, limit });
  if (error) throw new Error(error.message);
  return {
    orders,
    hasMore: orders.length === limit,
  };
};
