import { Skeleton } from "@/components/ui/skeleton";

export const CategorySkeleton = ({
  title,
  isNew,
}: {
  title: string;
  isNew: boolean;
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <Skeleton className="font-semibold text-transparent md:text-3xl">
          {title}
        </Skeleton>
        {isNew ? null : <Skeleton className="h-10 w-10" />}
      </div>
      <Skeleton className="h-20" />
    </div>
  );
};
