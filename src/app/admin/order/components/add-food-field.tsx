"use client";

import { UseFormReturn } from "react-hook-form";
import { OrderFormSchema } from "./order-schema";
import { Food } from "@prisma/client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format-price";
import { unitLabels } from "../../food/components/food-schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { calculateTotalPrice } from "@/lib/calculate-price";

interface AddFoodFieldProps {
  form: UseFormReturn<OrderFormSchema>;
  menu: (Food & { category: string })[];
}

const quantityIsError = (quantity: string) => {
  const quantityValue = parseFloat(quantity);
  return quantityValue < 1e-9 || isNaN(quantityValue);
};

export const AddFoodField = ({ form, menu }: AddFoodFieldProps) => {
  const [selectedFood, setselectedFood] = useState<
    (Food & { category: string }) | null
  >(null);
  const [quantity, setQuantity] = useState("");
  const [quantityError, setQuantityError] = useState(false);
  const [onAddFoodErrorMessage, setOnAddFoodErrorMessage] = useState<
    string | null
  >(null);
  const handleOnQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantityError(false);
    setQuantity(e.target.value);
    const isError = quantityIsError(e.target.value);
    if (isError) setQuantityError(true);
  };

  const handleOnAddFood = () => {
    if (!selectedFood) {
      setOnAddFoodErrorMessage("กรุณาเลือกเมนู");
      return;
    }
    if (quantityIsError(quantity)) {
      setQuantityError(true);
      return;
    }
    setOnAddFoodErrorMessage(null);
    const quantityValue = parseFloat(quantity);
    const newFoods = [
      ...foods,
      {
        ...selectedFood,
        unit: selectedFood.unit,
        quantity: quantityValue,
        totalPrice: calculateTotalPrice(selectedFood.price, quantityValue),
      },
    ];
    form.setValue("foods", newFoods);
    const totalPrice = newFoods.reduce((acc, food) => acc + food.totalPrice, 0);
    form.setValue("totalPrice", totalPrice);
    setQuantity("");
    setselectedFood(null);
  };
  const foods = form.watch("foods");
  return (
    <FormField
      control={form.control}
      name="foods"
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-7">
          <div className="flex flex-col space-y-2">
            <FormLabel>เลือกเมนู</FormLabel>
            {/* TODO: this can be improved by using actual auto-complete-input because it is <input/> and htmlFor will work on it */}
            <Command className="min-h-[350px] rounded-lg border shadow-md">
              <CommandInput placeholder="ค้นหารายการอาหาร..." />
              <CommandEmpty>ไม่พบรายการ..</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {menu.map((food) => (
                    <CommandItem
                      key={food.id}
                      value={food.name}
                      onSelect={(name) => {
                        if (name === selectedFood?.name) {
                          setselectedFood(null);
                        } else {
                          setselectedFood(food);
                        }
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedFood?.id === food.id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      <span>{food.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
          <FoodCard
            handleOnAddFood={handleOnAddFood}
            handleOnQuantityChange={handleOnQuantityChange}
            onAddFoodErrorMessage={onAddFoodErrorMessage}
            quantity={quantity}
            quantityError={quantityError}
            selectedFood={selectedFood}
          />
        </FormItem>
      )}
    />
  );
};

interface FoodCardProps {
  handleOnAddFood: () => void;
  onAddFoodErrorMessage: string | null;
  quantity: string;
  quantityError: boolean;
  selectedFood: (Food & { category: string }) | null;
  handleOnQuantityChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const FoodCard = ({
  handleOnAddFood,
  onAddFoodErrorMessage,
  quantity,
  quantityError,
  selectedFood,
  handleOnQuantityChange,
}: FoodCardProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-6 pt-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* <div className="flex flex-row"> */}
          <div className="flex h-[100px] flex-col justify-start space-y-2">
            <Label className="h-[20px]">ราคา</Label>
            <div className="flex h-[68px] flex-col space-y-2">
              <p className="flex h-10 w-fit rounded-md border border-input bg-secondary px-3 py-2 text-sm">
                {selectedFood?.price ? formatPrice(selectedFood.price) : "-"}{" "}
                บาท /{" "}
                {selectedFood?.unit
                  ? unitLabels.get(selectedFood.unit)
                  : "หน่วย"}
              </p>
            </div>
          </div>
          <div className="flex h-[100px] flex-col justify-start space-y-2">
            <Label htmlFor="quantity" className="h-[20px]">
              จำนวน
              {selectedFood?.unit ? (
                <span className="ml-2 text-sm font-semibold">
                  ({unitLabels.get(selectedFood.unit)})
                </span>
              ) : null}
            </Label>
            <div className="flex h-[68px] flex-col space-y-2">
              <Input
                id="quantity"
                value={quantity}
                onChange={handleOnQuantityChange}
              />
              {quantityError && (
                <p className="text-sm text-red-500">กรุณาใส่จำนวนเป็นตัวเลข</p>
              )}
            </div>
          </div>
          {/* Total Price */}
          <div className="flex h-[100px] flex-col justify-start space-y-2">
            <Label className="h-[20px]">ราคารวม</Label>
            <div className="flex h-[68px] flex-col space-y-2">
              <p className="flex h-10 w-fit rounded-md border border-input bg-secondary px-3 py-2 text-sm">
                {selectedFood?.price ? formatPrice(selectedFood.price) : "-"}{" "}
                บาท
              </p>
            </div>
          </div>
        </div>
        <Button type="button" onClick={handleOnAddFood}>
          เพิ่มรายการ
        </Button>
        {onAddFoodErrorMessage && (
          <FormMessage>{onAddFoodErrorMessage}</FormMessage>
        )}
      </CardContent>
    </Card>
  );
};
