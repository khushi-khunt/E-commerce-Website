import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { fetchProducts } from "@/services/productService";
import { Grid, Paper, Typography, Box } from "@mui/material";
import StockAvailabilityChart from "@/components/Admin/StockAvailabilityChart";

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

        setChartData(Object.keys(grouped).map((cat) => ({
          category: cat,
          count: grouped[cat].count,
          totalPrice: grouped[cat].totalPrice,
        })));
      } catch (err) {
        console.error("Error loading product report", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p>Loading report...</p>;

  const series = [
    { name: "Product Count", type: "column", data: chartData.map((d) => d.count) },
    { name: "Total Price", type: "line", data: chartData.map((d) => d.totalPrice) },
  ];

  const options = {
    chart: { type: "line", stacked: false },
    stroke: { width: [0, 3], curve: "smooth" },
    colors: ["#3b82f6", "#ff6384"],
    plotOptions: { bar: { columnWidth: "40%", borderRadius: 4 } },
    markers: {
      size: 5, colors: ["#ff6384"], strokeColors: "#fff", strokeWidth: 2, hover: { size: 7 },
    },
    xaxis: { categories: chartData.map((d) => d.category) },
    yaxis: [
      { title: { text: "Product Count" } },
      { opposite: true, title: { text: "Total Price" } },
    ],
    tooltip: { shared: true, intersect: false, y: { formatter: (val: number) => val.toLocaleString() } },
  };

  return (
    <Grid container spacing={3}>
      {/* First Chart */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
          <Typography variant="h6" gutterBottom>
            Products Report by Category
          </Typography>
          <ReactApexChart options={options} series={series} type="line" height={350} width={570} />
        </Paper>
      </Grid>

      {/* Second Chart */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
          <StockAvailabilityChart />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UsersReport;
