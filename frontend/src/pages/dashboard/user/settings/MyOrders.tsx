import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { fetchUserOrders, getInvoicePDF, sendCancelOtp, trackOrder } from "@/services/productService";
import { Card, CardContent, CardHeader, CardTitle, } from "@/theme/components/ui/card";
import { Badge } from "@/theme/components/ui/badge";
import { Separator } from "@/theme/components/ui/separator";
import { Skeleton } from "@/theme/components/ui/skeleton";
import { Button } from "@/theme/components/ui/button";
import { useReorder } from "@/hooks/Mutation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Clock, CreditCard, Download, Eye, EyeOff, MapPin, Package, Receipt, RotateCcw, ShoppingBag, Truck, X } from "lucide-react";

const MyOrders = ({ orderId }: { orderId: string }) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const queryClient = new QueryClient()
  const navigate = useNavigate();
  const location = useLocation();
  const shouldRefetch = location.state?.refetch;
  const [orderList, setOrderList] = useState<any[]>([]);
  const reorder = useReorder();

  useEffect(() => {
    if (shouldRefetch) {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    }
  }, [shouldRefetch]);

  const { mutate: triggerOtp, isLoading: isSendingOtp } = useMutation({
    mutationFn: sendCancelOtp,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send OTP");
    },
  });

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-orders"],
    queryFn: fetchUserOrders,
  });
  // track data
  const { data: trackingData } = useQuery({
    queryKey: ["track-order", selectedOrderId],
    queryFn: () => trackOrder(selectedOrderId),
    enabled: !!selectedOrderId,
  })

  //otp to cancel
  const handleCancelOrder = (orderId: string) => {
    if (!orderId) {
      toast.error("orderId is missing");
      return
    }
    triggerOtp(orderId);
    localStorage.setItem("cancelOrderId", orderId);
    navigate('/user/cancel-order');
  };

  useEffect(() => {
    if (orders) {
      setOrderList(orders);
    }
  }, [orders]);


  // reorder
  const handleReorder = (orderId: string) => {
    reorder.mutate(orderId, {
      onSuccess: () => {
        toast.success("Reorder successful");
        setOrderList((prev) => prev.filter((o) => o._id !== orderId));
      },
      onError: () => {
        toast.error("Reorder failed. Please try again.");
      },
    });
  };


  // get invoice
  const handleDownloadInvoice = async (orderId: string) => {
    try {
      const blob = await getInvoicePDF(orderId);
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      toast.success("Invoice opened successfully");
    } catch (err) {
      console.error("Invoice error:", err);
      toast.error("Failed to load invoice");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <Skeleton className="h-20 mb-4" />
        <Skeleton className="h-60" />
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500 py-10">Failed to load orders.</p>;
  }

  if (!orders?.length) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Card className="p-12 text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
          <h2 className="text-3xl font-bold text-muted-foreground">No Orders Yet</h2>
          <p className="text-lg text-muted-foreground">Once you place an order, it will appear here.</p>
          <Button size="lg" className="mt-4 ">Start Shopping</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">My Orders</h1>
        </div>

        {orderList.map((order: any) => (
          <Card key={order._id} className="overflow-hidden border-2 hover:border-primary/20  transition-all duration-300 ">
            <CardHeader className="bg-muted/30 border-b">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-xl font-bold">Order #{order.orderId}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(order.createdAt).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                    {order.status}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 capitalize">
                    <CreditCard className="w-3 h-3 mr-1" />
                    {order.paymentInfo?.paymentStatus}
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-semibold">
                    ₹{order.grandTotal.toLocaleString()}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Items */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <h4 className="text-lg font-semibold">Order Items</h4>
                </div>
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="p-4 bg-muted/30 rounded-lg border mb-2">
                    <p className="font-medium">{item.product?.title}</p>
                    <div className="text-sm text-muted-foreground flex gap-2">
                      <span>₹{item.price}</span> × <span>{item.quantity}</span> = <span className="font-semibold text-foreground">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Separator />
              {/*  Shipping  */}
              <Card className="border-muted">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" />Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <p><span className="font-medium">Address:</span> {order.shippingAddress?.address || "No address available"}</p>
                  <p><span className="font-medium">Location:</span> {order.shippingAddress?.confirmLocation || "No location available"}</p>
                  <p><span className="font-medium">Zip Code:</span> {order.shippingAddress?.zipCode || "No zip code available"}</p>
                </CardContent>
              </Card>

              {/* tracking */}
              <Button variant="outline"
                onClick={() => setSelectedOrderId(selectedOrderId === order.orderId ? null : order.orderId)}>
                <Truck className="h-4 w-4 mr-2" />
                {selectedOrderId === order.orderId ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {selectedOrderId === order.orderId ? "Hide Tracking" : "Track Order"}
              </Button>

              {selectedOrderId === order.orderId && trackingData?.orderId === order.orderId && (
                <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <h3 className="flex items-center gap-2"><Clock className="h-4 w-4" /> Tracking History</h3>
                  {trackingData.trackingHistory.map((t: any, i: number) => (
                    <div key={i} className="ml-4 mt-2 border-l-2 border-primary/20 pl-2">
                      <p className="font-medium">{t.status}<span className="text-sm text-muted-foreground">@ {t.location}</span></p>
                      <p className="text-xs text-muted-foreground">{new Date(t.dateTime).toLocaleString()}</p>
                      {t.note && (<p className="text-xs italic text-gray-500">{t.note}</p>)}
                    </div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-gray-700">📄 Billing Summary</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between"><span>Subtotal</span><span>₹{order.totalAmount}</span></div>
                    <div className="flex justify-between"><span>Tax</span><span>₹{order.taxAmount}</span></div>
                    <div className="flex justify-between"><span>Shipping</span><span>₹{order.shippingCharges}</span></div>
                    <div className="flex justify-between"><span>Discount</span><span>- ₹{order.discountAmount}</span></div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-emerald-600"><span>Total</span><span>₹{order.grandTotal}</span></div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">

                {/* download invoice */}
                <Button variant="outline" onClick={() => handleDownloadInvoice(order._id)}><Download className="h-4 w-4 mr-2" />Download Invoice</Button>
                {/* reorder */}
                <Button variant="outline" className="text-sm" onClick={() => handleReorder(order._id)}><RotateCcw className="h-4 w-4 mr-2" />Reorder </Button>
                {/* cancel order */}
                <Button variant="destructive"
                  disabled={isSendingOtp}
                  onClick={() => handleCancelOrder(order._id)}
                ><X className="h-4 w-4 mr-2" />{isSendingOtp ? "Sending OTP..." : "Cancel Order"}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};


export default MyOrders;
