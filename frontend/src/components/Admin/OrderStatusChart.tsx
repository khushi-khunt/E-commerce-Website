import Chart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/theme/components/ui/card";
import { fetchStatusDistribution } from "@/services/productService";

const OrderStatusChart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["status-distribution"],
    queryFn: () => fetchStatusDistribution()
  });

  const labels = data ? Object.keys(data) : [];
  const series = data ? Object.values(data) : [];

  const options = {
    chart: {
      type: "donut",
    },
    labels,
    colors: ["#0D47A1", "#1976D2", "#2196F3", "#64B5F6", "#BBDEFB", "#E3F2FD"],
    legend: {
      position: "bottom"
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: { width: "100%" },
          legend: { position: "bottom" }
        }
      }
    ]
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading chart.</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <Chart options={options} series={series} type="donut" width="100%" />
      </CardContent>
    </Card>
  );
};

export default OrderStatusChart;
