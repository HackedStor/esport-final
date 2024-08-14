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
  { Weeks: "Semaine 1", RL: 10},
  { Weeks: "Semaine 2", RL: 20},
  { Weeks: "Semaine 3", RL: 20},
  { Weeks: "Semaine 4", RL: 10},
  { Weeks: "Semaine 5", RL: 20},
]

const chartConfig = {
  RL: {
    label: "RL",
    color: "hsl(var(--chart-1))",
    icon: Activity,
  }
} satisfies ChartConfig


export function AreaChartStepRL() {
  return (
    <Card className="border-none rounded-[1vh]">
      <CardHeader>
        <CardTitle>Perfomances sur Rocket League</CardTitle>
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
              dataKey="RL"
              type="step"
              fill="var(--color-RL)"
              fillOpacity={0.4}
              stroke="var(--color-RL)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
