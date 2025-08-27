import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { fetchProducts } from "@/services/productService";
import StockAvailabilityChart from "@/components/Admin/StockAvailabilityChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/theme/components/ui/card";

const UsersReport = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        const products = Array.isArray(data.products) ? data.products : [];

        const grouped: Record<string, { count: number; totalPrice: number }> = {};
        products.forEach((p) => {
          const category = p.category || "Uncategorized";
          if (!grouped[category]) grouped[category] = { count: 0, totalPrice: 0 };
          grouped[category].count += 1;
          grouped[category].totalPrice += p.price;
        });

        setChartData(
          Object.keys(grouped).map((cat) => ({
            category: cat,
            count: grouped[cat].count,
            totalPrice: grouped[cat].totalPrice,
          }))
        );
      } catch (err) {
        console.error("Error loading product report", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p className="text-center py-6">Loading report...</p>;

  const series = [
    { name: "Product Count", type: "column", data: chartData.map((d) => d.count) },
    { name: "Total Price", type: "line", data: chartData.map((d) => d.totalPrice) },
  ];

  const options = {
    chart: { type: "line", stacked: false, toolbar: { show: false } },
    stroke: { width: [0, 3], curve: "smooth" },
    colors: ["#3b82f6", "#ff6384"],
    plotOptions: { bar: { columnWidth: "40%", borderRadius: 4 } },
    markers: {
      size: 5,
      colors: ["#ff6384"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 7 },
    },
    xaxis: { categories: chartData.map((d) => d.category) },
    yaxis: [
      { title: { text: "Product Count" } },
      { opposite: true, title: { text: "Total Price" } },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: { formatter: (val: number) => val.toLocaleString() },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: { bar: { columnWidth: "60%" } },
          legend: { position: "bottom" },
        },
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* First Chart */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Products Report by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <ReactApexChart
              options={options}
              series={series}
              type="line"
              height={350}
              width="100%"
            />
          </div>
        </CardContent>
      </Card>

      {/* Second Chart */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Stock Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <StockAvailabilityChart />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersReport;
