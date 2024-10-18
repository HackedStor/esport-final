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

const chartConfig = {
  score: {
    label: "score",
    color: "hsl(var(--chart-2))",
    icon: Activity,
  },
} satisfies ChartConfig;

export function AreaChartStepSupSmashBros() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Appel à l'API PHP pour récupérer les données
    fetch("http://www.lycee-ferry-versailles.fr:5173/src/php/getStats/getSmashStats.php")
      .then((response) => response.json())
      .then((data) => setChartData(data))
      .catch((error) => console.error("Erreur lors du fetch des données:", error));
  }, []);
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
              dataKey="score"
              type="step"
              fill="var(--color-score)"
              fillOpacity={0.4}
              stroke="var(--color-score)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
