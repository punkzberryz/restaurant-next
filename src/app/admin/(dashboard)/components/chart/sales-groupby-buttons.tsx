import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Calendar, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const SalesGroupbyButtons = ({
  salesXAxis,
}: {
  salesXAxis?: "month" | "year";
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm">
          <Calendar className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="end">
        <DropdownMenuGroup className="flex flex-col">
          <DropdownMenuItem asChild className="flex items-center">
            <Link href={`/admin?salesXAxis=day`}>
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  salesXAxis === undefined ? "opacity-100" : "opacity-0",
                )}
              />
              <span>รายวัน</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="flex items-center">
            <Link
              //   className={buttonVariants({ variant: "ghost" })}
              href={`/admin?salesXAxis=month`}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  salesXAxis === "month" ? "opacity-100" : "opacity-0",
                )}
              />
              <span>รายเดือน</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="flex items-center">
            <Link
              //   className={buttonVariants({ variant: "ghost" })}
              href={`/admin?salesXAxis=year`}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  salesXAxis === "year" ? "opacity-100" : "opacity-0",
                )}
              />
              <span>รายปี</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
