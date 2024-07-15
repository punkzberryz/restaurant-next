"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface TablePaginationButtonsProps {
  pageId: number;
  setPageId: (old: number) => void;
  hasMore: boolean;
  isPlaceholderData?: boolean;
  className?: string;
}

export const TablePaginationButtons = ({
  hasMore,
  pageId,
  setPageId,
  className,
  isPlaceholderData,
}: TablePaginationButtonsProps) => {
  return (
    <div className={cn("flex items-center justify-end space-x-6", className)}>
      <p className="text-sm">หน้าที่ {pageId}</p>
      <div className="flex space-x-0.5">
        <Button
          size="icon"
          variant="default"
          onClick={() => setPageId(Math.max(pageId - 1, 0))}
          disabled={pageId === 1}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="default"
          onClick={() => {
            setPageId(pageId + 1);
          }}
          disabled={isPlaceholderData || !hasMore}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
