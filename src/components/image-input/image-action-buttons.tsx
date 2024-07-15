"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ImageInputAction } from "./image-input-type";
import { MoreHorizontal, ArrowUp, ArrowDown, Trash } from "lucide-react";

export const ImageActionButtons = ({
  imageDispatch,
  index,
}: {
  imageDispatch: React.Dispatch<ImageInputAction>;
  index: number;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            imageDispatch({ type: "MOVE_ITEM_UP", payload: { index } })
          }
        >
          <ArrowUp className="mr-2 h-4 w-4" />
          Move up
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            imageDispatch({ type: "MOVE_ITEM_DOWN", payload: { index } })
          }
        >
          <ArrowDown className="mr-2 h-4 w-4" />
          Move Down
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            imageDispatch({
              type: "REMOVE_FILE_FROM_INPUT",
              payload: { index },
            })
          }
        >
          <Trash className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
