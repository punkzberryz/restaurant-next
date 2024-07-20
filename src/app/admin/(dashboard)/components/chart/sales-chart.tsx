"use client";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatPrice } from "@/lib/format-price";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

export const SaleChart = ({
  salesData,
}: {
  salesData: {
    date: string;
    sales: number;
  }[];
}) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-[500px] min-h-[200px] w-full"
    >
      <BarChart accessibilityLayer data={salesData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
        />
        <YAxis
          dataKey="sales"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: number) => formatPrice(value)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="sales" fill="var(--color-sales)" radius={4}>
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
            formatter={(value: number) => formatPrice(value)}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};

const chartConfig = {
  sales: {
    label: "ยอดขาย",
    color: "#2563eb",
  },
} satisfies ChartConfig;
