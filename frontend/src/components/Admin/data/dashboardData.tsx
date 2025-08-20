import type { SellerType } from "../BestSeller";
import type { OrderType } from "../OrdersTable";
import type{ProductType} from "../TopProducts"

export const orders: OrderType[] = [
  { id: "#001", customer: "John Doe", status: "Paid", total: "$120.00" },
  { id: "#002", customer: "khushi", status: "Pending", total: "$75.00" },
  { id: "#003", customer: "Smith", status: "Pending", total: "$75.00" },
  { id: "#004", customer: "Disha v", status: "paid", total: "$75.00" },
  { id: "#005", customer: "krimisha", status: "Pending", total: "$75.00" },
  { id: "#006", customer: "kajal", status: "Pending", total: "$75.00" },
  { id: "#007", customer: "Heer", status: "Pending", total: "$75.00" },
]

export const topProducts: ProductType[] = [
  { name: "AirPods pro", sales: 150 },
  { name: "iPhone 15 Pro", sales: 120 },
  { name: "AirPods Max", sales: 150 },
  { name: "iPhone 13 Pro", sales: 120 }, 
  { name: "AirPods avg", sales: 150 },
  { name: "iPhone 14 Pro", sales: 120 }, 
  { name: "AirPods Max", sales: 150 },
  { name: "iPhone 12 Pro", sales: 120 }, 
  { name: "AirPods Max", sales: 150 },
  { name: "iPhone 10 Pro", sales: 120 },
]

export const bestSellers: SellerType[] = [
  {
    id: "1",
    name: "DigitalWave",
    totalSales: 4820,
    growth: 12,
    avatar: "https://placehold.co/40x40?text=D"
  },
  {
    id: "2",
    name: "TechVibes",
    totalSales: 3790,
    growth: 8,
    avatar: "https://placehold.co/40x40?text=T"
  },
  {
    id: "3",
    name: "GadgetMart",
    totalSales: 3265,
    growth: -2,
    avatar: "https://placehold.co/40x40?text=G"
  },
  {
    id: "4",
    name: "EcoEssentials",
    totalSales: 2980,
    growth: 5,
    avatar: "https://placehold.co/40x40?text=E"
  }
]