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
  { Weeks: "Partie 1", Valo: 10 },
  { Weeks: "Partie 2", Valo: 10 },
  { Weeks: "Partie 3", Valo: 20 },
  { Weeks: "Partie 4", Valo: 10 },
  { Weeks: "Partie 5", Valo: 20 },
]

const chartConfig = {
  Valo: {
    label: "Valo",
    color: "hsl(var(--chart-1))",
    icon: Activity,
  }
} satisfies ChartConfig


export function AreaChartStepValo() {
  return (
    <Card className="border-none rounded-[1vh]">
      <CardHeader>
        <CardTitle>Perfomances sur Valorant</CardTitle>
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
              dataKey="Valo"
              type="step"
              fill="var(--color-Valo)"
              fillOpacity={0.4}
              stroke="var(--color-Valo)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
