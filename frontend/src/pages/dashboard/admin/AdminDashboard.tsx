import { BestSellers } from "@/components/Admin/BestSeller"
import OrderStatusChart from "@/components/Admin/OrderStatusChart"
import { RevenueChart } from "@/components/Admin/RevenueChart"
import { SalesChart } from "@/components/Admin/SalesChart"
import StateCard from "@/components/Admin/StateCard"
import { TopProducts } from "@/components/Admin/TopProducts"
import { useDadhboardStates } from "@/hooks/Mutation"
import { Activity, DollarSign, Heart, ShoppingCart } from 'lucide-react';

const iconMap: Record<string, JSX.Element> = {
  activity: <Activity />,
  dollar: <DollarSign />,
  cart: <ShoppingCart />
}

const AdminDashboard = () => {
  const { data, isLoading, isError } = useDadhboardStates();

  if (isLoading) return <div>Loading dashboard data..!</div>;
  if (isError) return <div>Failed to load dashboard data..!</div>;

  const cardsData = [
    {
      title: "Total Orders",
      value: data.totalOrder,
      growth: "+0%",
      positive: true,
      iconName: "cart",
      color: "green",
      chartData: data.saleByDate.map(sale => Number(sale.totalSums) || 0),
    },
    {
      title: "Total Income",
      value: data.totalIncome,
      growth: "+0%",
      positive: true,
      iconName: "dollar",
      color: "blue",
      chartData: data.saleByDate.map(sale => Number(sale.totalSums) || 0),
    },
    {
      title: "Total Visitors",
      value: data.totalVisitors,
      growth: "+0%",
      positive: false,
      iconName: "activity",
      color: "orange",
      chartData: data.saleByDate.map(sale => sale.count || 0),
    },
    {
      title: "Sales By Date ",
      value: `${data.saleByDate.reduce((acc, sale) => acc + sale.totalSums, 0)}`,
      growth: "+0%",
      positive: true,
      iconName: "dollar",
      color: "blue",
      chartData: data.saleByDate.map(sale => Number(sale.totalSums) || 0)
    }
  ];

  return (
    <div className="flex-1 space-y-6 overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardsData.map((card, i) => (
          <StateCard
            key={i}
            {...card}
            icon={iconMap[card.iconName] ?? <Activity />}
          />
        ))}

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <RevenueChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <OrderStatusChart />
        <TopProducts />
        <BestSellers />
      </div>

      <footer className="w-full px-4 py-4 bg-white text-center text-sm text-muted-foreground border-t">
        <p className="flex flex-wrap justify-center items-center gap-1">
          Copyright © 2024 <span className="font-semibold mx-1">Remos</span>.
          Design with
          <Heart className="inline w-4 h-4 text-red-500 mx-1" />
          by <span className="font-semibold">Ecommerce</span>. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AdminDashboard
