import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/theme/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/theme/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/theme/components/ui/table";
import { Switch } from "@/theme/components/ui/switch";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  DeleteCoupon,
  FetchCoupons,
  toggleCouponStatus,
} from "@/services/productService";

export default function CouponList() {
  const queryClient = useQueryClient();
  const [filteredCoupons, setFilteredCoupons] = useState([]);

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
      setFilteredCoupons([]);
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

  const displayCoupons = filteredCoupons.length > 0 ? filteredCoupons : coupons;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-semibold">Coupons</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading coupons...</p>
          ) : displayCoupons.length === 0 ? (
            <p className="text-sm text-muted-foreground">No coupons found.</p>
          ) : (
            <>
              {/* --- Full table for lg+ screens --- */}
              <div className="hidden lg:block w-full overflow-x-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Product-Code</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Min Order</TableHead>
                      <TableHead>Max Usage</TableHead>
                      <TableHead>Starts At</TableHead>
                      <TableHead>Ends At</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayCoupons.map((coupon) => (
                      <TableRow key={coupon._id}>
                        <TableCell>{coupon?.productCategory}</TableCell>
                        <TableCell>{coupon.code}</TableCell>
                        <TableCell>
                          {coupon.type === "percentage"
                            ? `${coupon.discountPercent}%`
                            : `₹${coupon.discountAmount}`}
                        </TableCell>
                        <TableCell>₹{coupon.minOrderValue}</TableCell>
                        <TableCell>{coupon.maxUsage}</TableCell>
                        <TableCell>{coupon?.startsAt}</TableCell>
                        <TableCell>{coupon?.expiresAt}</TableCell>
                        <TableCell>
                          <Switch
                            checked={coupon.active}
                            onCheckedChange={() => toggleStatus(coupon._id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:bg-red-50"
                            onClick={() => deleteOne(coupon._id)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* --- Card layout for < 1040px --- */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
                {displayCoupons.map((coupon) => (
                  <Card key={coupon._id} className="p-4 space-y-2 border shadow-sm">
                    <p className="text-sm font-medium">Category: {coupon?.productCategory}</p>
                    <p className="text-sm">Code: {coupon.code}</p>
                    <p className="text-sm">
                      Discount:{" "}
                      {coupon.type === "percentage"
                        ? `${coupon.discountPercent}%`
                        : `₹${coupon.discountAmount}`}
                    </p>
                    <p className="text-sm">Min Order: ₹{coupon.minOrderValue}</p>
                    <p className="text-sm">Max Usage: {coupon.maxUsage}</p>
                    <p className="text-sm">Starts: {coupon?.startsAt}</p>
                    <p className="text-sm">Ends: {coupon?.expiresAt}</p>
                    <div className="flex items-center justify-between pt-2">
                      <Switch
                        checked={coupon.active}
                        onCheckedChange={() => toggleStatus(coupon._id)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-50"
                        onClick={() => deleteOne(coupon._id)}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
