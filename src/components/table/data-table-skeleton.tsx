import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export const DataTableSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("h-52 w-full rounded-md border p-6", className)} />
  );
};
