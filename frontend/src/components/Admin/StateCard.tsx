import Chart from "react-apexcharts";
import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/theme/components/ui/card";

export interface StateCardProps {
  title: string;
  value: string | number;
  growth: string;
  positive: boolean;
  icon: React.ReactNode;
  color: "green" | "orange" | "gray" | "blue";
  chartData?: number[];
}

const colorMap = {
  green: "#22c55e",
  orange: "#f97316",
  gray: "#9ca3af",
  blue: "#3b82f6",
};

const StateCard: React.FC<StateCardProps> = ({
  title,
  value,
  growth,
  positive,
  icon,
  color,
  chartData
}) => {
  const chartColor = colorMap[color];

  const chartOptions = {
    chart: {
      sparkline: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: [chartColor],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: chartColor,
          },
          {
            offset: 100,
            color: chartColor,
            opacity: 0,
          },
        ],
      },
    },
    tooltip: { enabled: false },
  };

  const adjustedChartData = chartData && chartData.length < 2
    ? [chartData[0], chartData[0]]
    : chartData ?? [15, 25, 18, 40, 28, 40, 30]

  if (!chartData || chartData.length < 2) {
    return <p>No chart data available</p>
  }

  const chartSeries = [
    {
      name: "Value",
      data: adjustedChartData,
    },
  ];

  return (
    <Card
      className={`rounded-2xl backdrop-blur-md bg-white dark:bg-black/30 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 py-0`}
    >
      <CardContent className="p-4">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          {/* Icon Container */}
          <div
            className="rounded-xl p-3 shadow-inner"
            style={{
              background: `linear-gradient(135deg, ${chartColor} 0%, ${chartColor}33 100%)`,
            }}
          >
            <div className="text-white">{icon}</div>
          </div>

          {/* Growth Badge */}
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${positive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
              }`}
          >
            {positive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {growth}
          </div>
        </div>

        {/* Title and Value */}
        <div className="mb-2">
          <h4 className="text-sm text-muted-foreground">{title}</h4>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
        </div>

        {/* Chart */}
        <div className="-mx-3">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="area"
            height={60}
            width="100%"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StateCard;

