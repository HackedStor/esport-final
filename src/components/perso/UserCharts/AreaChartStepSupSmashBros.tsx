"use client"

import { Activity } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart"
const chartData = [
  { Weeks: "Semaine 1", SupSmashBros: 10 },
  { Weeks: "Semaine 2", SupSmashBros: 20 },
  { Weeks: "Semaine 3", SupSmashBros: 20 },
  { Weeks: "Semaine 4", SupSmashBros: 10 },
  { Weeks: "Semaine 5", SupSmashBros: 10 },
]

const chartConfig = {
  SupSmashBros: {
    label: "SupSmashBros",
    color: "hsl(var(--chart-1))",
    icon: Activity,
  }
} satisfies ChartConfig


export function AreaChartStepSupSmashBros() {
  return (
    <Card className="border-none rounded-[1vh]">
      <CardHeader>
        <CardTitle>Perfomances sur Super Smash Bross</CardTitle>
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
              dataKey="Weeks"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="SupSmashBros"
              type="step"
              fill="var(--color-SupSmashBros)"
              fillOpacity={0.4}
              stroke="var(--color-SupSmashBros)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
