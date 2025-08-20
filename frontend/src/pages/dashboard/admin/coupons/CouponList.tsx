import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/theme/components/ui/button";
// import { Input } from "@/theme/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { Switch } from "@/theme/components/ui/switch";
import {
  DeleteCoupon,
  FetchCoupons,
  // filterCoupons,
  toggleCouponStatus,
} from "@/services/productService";
import { Trash } from "lucide-react";

export default function CouponList() {
  const queryClient = useQueryClient();
  // const [search, setSearch] = useState("");
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  // const [isSearching, setIsSearching] = useState(false);

  // Fetch all coupons
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["coupons"],
    queryFn: FetchCoupons,
  });

  // Delete a coupon
  const { mutate: deleteOne } = useMutation({
    mutationFn: DeleteCoupon,
    onSuccess: () => {
      toast.success("Coupon deleted");
      queryClient.invalidateQueries(["coupons"]);
      setFilteredCoupons([]); // clear filter view
    },
    onError: (err) => {
      console.error("Delete error:", err);
      toast.error("Failed to delete coupon");
    },
  });

  // Toggle active status
  const { mutate: toggleStatus } = useMutation({
    mutationFn: toggleCouponStatus,
    onSuccess: () => {
      toast.success("Status toggled");
      queryClient.invalidateQueries(["coupons"]);
    },
    onError: (err) => {
      console.error("Toggle error:", err);
      toast.error("Toggle failed");
    },
  });

  // // Search (filter)
  // const { mutate: searchCoupons } = useMutation({
  //   mutationFn: filterCoupons,
  //   onMutate: () => setIsSearching(true),
  //   onSuccess: (data) => {
  //     setFilteredCoupons(data); // set filtered list
  //     setIsSearching(false);
  //   },
  //   onError: (err) => {
  //     console.error("Search error:", err);
  //     toast.error("Search failed");
  //     setIsSearching(false);
  //   },

  // });

  // const handleSearch = () => {
  //   if (search.trim() !== "") {
  //     searchCoupons(search.trim());
  //   } else {
  //     setFilteredCoupons([]); // clear search
  //   }
  // };

  const displayCoupons = filteredCoupons.length > 0 ? filteredCoupons : coupons;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Coupons</h2>

      {/* Search Input */}
      {/* <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search coupon code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80"
        />
        <Button onClick={handleSearch} disabled={isSearching}>
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </div> */}

      {/* Display Table */}
      {isLoading ? (
        <p>Loading coupons...</p>
      ) : displayCoupons.length === 0 ? (
        <p>No coupons found.</p>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-muted text-left">
            <tr>
              <th className="p-2">Category</th>
              <th className="p-2">Product-Code</th>
              <th className="p-2">Discount</th>
              <th className="p-2">Min Order</th>
              <th className="p-2">Max Usage</th>
              <th className="p-2">Starts At</th>
              <th className="p-2">Ends at</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayCoupons.map((coupon) => (
              <tr key={coupon._id} className="border-t">
                <td>{coupon?.productCategory}</td>
                <td className="p-2">{coupon.code}</td>
                <td className="p-2">
                  {coupon.type === "percentage"
                    ? `${coupon.discountPercent}%`
                    : `₹${coupon.discountAmount}`}
                </td>
                <td className="p-2">₹{coupon.minOrderValue}</td>
                <td className="p-2">{coupon.maxUsage}</td>

                <td>{coupon?.startsAt}</td>
                <td>{coupon?.expiresAt}</td>
                <td className="p-2">
                  <Switch
                    checked={coupon.active}
                    onCheckedChange={() => toggleStatus(coupon._id)}
                  />
                </td>
                <td className="p-2">
                  <Button
                    className="bg-red-100 "
                    size="sm"
                    onClick={() => deleteOne(coupon._id)}
                  >
                    <Trash className="text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
