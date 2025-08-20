import Slider from "@/components/User/slider/Slider";
import Banner from "./Banner";
import FeaturesCards from "./FeaturesCards";
import PopularProducts from "./products/PouplarProducts";
import NewArrivals from "./products/NewArrival";
import FeaturedCategories from "./products/FeaturedCategories";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const UserDashboard = () => {

  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  useEffect(() => {
    if (status === "success") {
      toast.success("Payment completed successfully!");
    }
  }, [status]);

  return (
    <>
      <Slider />         {/* STATIC CONTENT */}
      <FeaturedCategories />   {/*Dynamic*/}
      <FeaturesCards />  {/* STATIC CONTENT */}
      <PopularProducts />  {/* Dynamic */}
      <NewArrivals />          {/* Dynamic */}
      <Banner />         {/* STATIC CONTENT */}
    </>
  );
};

export default UserDashboard;
