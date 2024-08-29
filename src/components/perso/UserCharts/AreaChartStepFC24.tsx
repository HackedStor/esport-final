"use client";
import { useEffect, useState } from "react";

import { Activity } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";
// const chartData = [
//   { Weeks: "Semaine 1", FC24: 20 },
//   { Weeks: "Semaine 2", FC24: 10 },
//   { Weeks: "Semaine 3", FC24: 10 },
//   { Weeks: "Semaine 4", FC24: 20 },
//   { Weeks: "Semaine 5", FC24: 20 },
// ];

const chartConfig = {
  winrate: {
    label: "winrate",
    color: "hsl(var(--chart-1))",
    icon: Activity,
  },
} satisfies ChartConfig;

export function AreaChartStepFC24() {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    // Appel à l'API PHP pour récupérer les données
    fetch("http://esport/src/php/getStats/getfc24Stats.php")
      .then((response) => response.json())
      .then((data) => setChartData(data))
      .catch((error) => console.error("Erreur lors du fetch des données:", error));
  }, []);

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
              dataKey="winrate"
              type="step"
              fill="var(--color-winrate)"
              fillOpacity={0.4}
              stroke="var(--color-winrate)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
