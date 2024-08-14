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
  { Weeks: "Semaine 1", FC24: 20 },
  { Weeks: "Semaine 2", FC24: 10 },
  { Weeks: "Semaine 3", FC24: 10 },
  { Weeks: "Semaine 4", FC24: 20 },
  { Weeks: "Semaine 5", FC24: 20 },
]

const chartConfig = {
  FC24: {
    label: "FC24",
    color: "hsl(var(--chart-1))",
    icon: Activity,
  }
} satisfies ChartConfig


export function AreaChartStepFC24() {
  return (
    <Card className="border-none rounded-[1vh]">
      <CardHeader>
        <CardTitle>Perfomances sur FC24</CardTitle>
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
              dataKey="FC24"
              type="step"
              fill="var(--color-FC24)"
              fillOpacity={0.4}
              stroke="var(--color-FC24)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}