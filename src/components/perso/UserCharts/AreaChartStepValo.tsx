"use client";

import { useEffect, useState } from "react";
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
     const [chartData, setChartData] = useState([]);

     useEffect(() => {
          // Appel à l'API PHP pour récupérer les données
          fetch("/php/getStats/getValoStats.php")
               .then((response) => response.json())
               .then((data) => setChartData(data))
               .catch((error) =>
                    console.error("Erreur lors du fetch des données:", error)
               );
     }, []);

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
                                   left: 5,
                                   right: 5,
                              }}
                         >
                              <CartesianGrid vertical={false} />
                              <XAxis
                                   dataKey="game"
                                   tickLine={true}
                                   axisLine={false}
                                   tickMargin={8}
                                   tickFormatter={(value) => `Game ${value}`}
                              />
                              <ChartTooltip
                                   cursor={true}
                                   content={
                                        <ChartTooltipContent indicator="dot" />
                                   }
                              />
                              <Area
                                   dataKey="kda"
                                   type="natural"
                                   fill="var(--color-kda)"
                                   fillOpacity={0.4}
                                   stroke="var(--color-kda)"
                                   stackId="a"
                              />
                              <Area
                                   dataKey="winrate"
                                   type="natural"
                                   fill="var(--color-winrate)"
                                   fillOpacity={0.4}
                                   stroke="var(--color-winrate)"
                                   stackId="a"
                              />
                         </AreaChart>
                    </ChartContainer>
               </CardContent>
               <CardFooter></CardFooter>
          </Card>
     );
}
