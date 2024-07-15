"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
interface TablePageLimitProps {
  setPageLimit: (pageLimit: number) => void;
}
export const TablePageLimit = ({ setPageLimit }: TablePageLimitProps) => {
  return (
    <div className="flex items-center space-x-2">
      <p>จำนวนต่อหน้า</p>
      <Select
        onValueChange={(value) => {
          setPageLimit(Number(value));
        }}
      >
        <SelectTrigger className="w-fit">
          <SelectValue
            defaultValue={pageOptions[0]}
            placeholder={pageOptions[0]}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {pageOptions.map((page) => (
              <SelectItem key={page} value={String(page)}>
                {page}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
const pageOptions = [10, 20, 50, 100];
