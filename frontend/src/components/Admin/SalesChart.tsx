import { useQuery } from "@tanstack/react-query";
import ReactApexChart from "react-apexcharts";
import dayjs from "dayjs";
import { getDashboardStates } from "@/services/productService";

export const SalesChart = () => {
  const statsQuery = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStates,
  });

  if (statsQuery.isLoading) return <p>Loading chart...</p>;
  if (statsQuery.error) return <p>Failed to load chart.</p>;

  const saleByDate = statsQuery.data?.saleByDate || [];

  // 🔁 Generate last 7 days
  const last7Days = Array.from({ length: 7 }).map((_, i) =>
    dayjs().subtract(6 - i, "day").format("YYYY-MM-DD")
  );

  //  Initialize data structure
  const orderCounts: Record<string, number> = {};
  const salesTotals: Record<string, number> = {};
  last7Days.forEach((date) => {
    orderCounts[date] = 0;
    salesTotals[date] = 0;
  });

  //  Fill from saleByDate
  saleByDate.forEach((entry: any) => {
    const date = dayjs(entry._id).format("YYYY-MM-DD");
    if (orderCounts[date] !== undefined) {
      orderCounts[date] = entry.count;
      salesTotals[date] = entry.totalSums;
    }
  });

  // Labels
  const labels = last7Days.map((d) => dayjs(d).format("MMM D"));

  //  Chart series
  const series = [
    {
      name: "Orders",
      data: last7Days.map((d) => orderCounts[d] || 0),
    },
    {
      name: "Sales",
      data: last7Days.map((d) => salesTotals[d] || 0),
    },
  ];

  const options = {
    chart: { type: "line" },
    xaxis: { categories: labels },
    colors: ["#3b82f6", "#f59e0b"],
    stroke: { curve: "smooth" },
    legend: { position: "top" },
    yaxis: [
      { title: { text: "Orders" } },
      { opposite: true, title: { text: "Sales" } },
    ],
    tooltip: {
      y: {
        formatter: (val: number) => val.toLocaleString(),
      },
    },

  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Orders vs Sales (Last 7 Days)</h3>
      <ReactApexChart options={options} series={series} type="line" height={300} />
    </div>
  );
};
