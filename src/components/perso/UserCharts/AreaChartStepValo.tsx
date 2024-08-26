"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";
const chartData = [
  { game: "1", kda: 186, winrate: 80 },
  { game: "2", kda: 305, winrate: 200 },
  { game: "3", kda: 237, winrate: 120 },
  { game: "4", kda: 73, winrate: 190 },
  { game: "5", kda: 209, winrate: 130 },
  { game: "6", kda: 214, winrate: 140 },
];

const chartConfig = {
  kda: {
    label: "kda",
    color: "#FD4556",
  },
  winrate: {
    label: "winrate",
    color: "#53212B",
  },
} satisfies ChartConfig;

export function AreaChartStepValo() {
  return (
    <Card className="border-none rounded-[1vh]">
      <CardHeader>
        <CardTitle>Performances sur Valorant</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-[40vw]">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="game"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="kda"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="winrate"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  );
}
