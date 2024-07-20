"use client";

import { DataTable } from "@/components/table/data-table";
import { userColumnDef } from "./user-column-def";
import { User } from "@prisma/client";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getManyUsersAction } from "./get-many-users-action";
import { TablePageLimit } from "@/components/table/table-page-limit";
import { TablePaginationButtons } from "@/components/table/table-pagination-buttons";
interface ClientProps {
  initialData: { users: User[]; hasMore: boolean };
  limit: number;
}
export const Client = ({ initialData, limit }: ClientProps) => {
  const queryClient = useQueryClient();
  const [pageId, setPageId] = useState(1);
  const [pageLimit, setPageLimit] = useState(limit);
  const { data, refetch, isPlaceholderData } = useQuery({
    // We add initialData so that when we delete data in this table, it will clear query-cache.
    // But what if the data is on second page??
    queryKey: ["getManyUsersAction", pageId, pageLimit, initialData],
    queryFn: () => getManyUsers({ pageId: pageId, limit: pageLimit }),
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
        queryKey: ["getManyUsersAction", pageId + 1],
        queryFn: () => getManyUsers({ pageId: pageId + 1, limit: pageLimit }),
      });
    }
  }, [data, isPlaceholderData, pageId, queryClient, pageLimit]);
  return (
    <div className="flex flex-col space-y-8">
      <DataTable columns={userColumnDef} data={data.users} />
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
const getManyUsers = async ({
  pageId,
  limit,
}: {
  pageId: number;
  limit: number;
}) => {
  const { users, error } = await getManyUsersAction({ pageId, limit });
  if (error) throw new Error(error.message);
  return { users, hasMore: users.length === limit };
};
