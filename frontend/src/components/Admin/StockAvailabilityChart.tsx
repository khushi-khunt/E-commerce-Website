import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { fetchProducts } from "@/services/productService";
import { Typography } from "@mui/material";

const StockAvailabilityChart = () => {
  const [stockData, setStockData] = useState<{ category: string; stock: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStockData = async () => {
      try {
        const data = await fetchProducts();
        const products = Array.isArray(data.products) ? data.products : [];

        const stockGrouped: Record<string, number> = {};
        products.forEach((p) => {
          const category = p.category || "Uncategorized";
          if (!stockGrouped[category]) stockGrouped[category] = 0;
          stockGrouped[category] += p.stock || 0;
        });

        setStockData(Object.keys(stockGrouped).map((cat) => ({
          category: cat,
          stock: stockGrouped[cat],
        })));
      } catch (err) {
        console.error("Error loading stock data", err);
      } finally {
        setLoading(false);
      }
    };

    loadStockData();
  }, []);

  if (loading) return <p>Loading stock chart...</p>;

  const stockSeries = [{ name: "Stock Quantity", data: stockData.map((d) => d.stock) }];
  const stockOptions = {
    chart: { type: "bar" },
    plotOptions: { bar: { horizontal: true } },
    colors: ["#10b981"],
    xaxis: { categories: stockData.map((d) => d.category), title: { text: "Stock Quantity" } },
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Stock Availability by Category
      </Typography>
      <ReactApexChart options={stockOptions} series={stockSeries} type="bar" height={350} width={570} />
    </>
  );
};

export default StockAvailabilityChart;
