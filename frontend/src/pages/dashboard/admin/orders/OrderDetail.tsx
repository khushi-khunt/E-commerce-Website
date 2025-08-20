import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderDetails } from "@/services/productService";
import { Card, CardContent, CardHeader, CardTitle } from "@/theme/components/ui/card";
import { Badge } from "@/theme/components/ui/badge";
import { Separator } from "@/theme/components/ui/separator";
import InvoicePreview from "@/components/Admin/InvoicePreview";

const OrderDetail = () => {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminOrderDetails", id],
    queryFn: () => fetchOrderDetails(id!),
    enabled: !!id,
  });
  // console.log("order detail",order)

  if (isLoading) return <p className="text-center py-6">Loading...</p>;
  if (error) return <p className="text-center py-6 text-red-500">Error: {(error as Error).message}</p>;
  if (!order) return <p className="text-center py-6">Order not found.</p>;

  return (
    <div className="p-4 space-y-6 max-w-5xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Order #{order.orderId}
          </CardTitle>
          <Badge variant="outline" className="mt-2">{order.status}</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            <strong>Customer:</strong> {order.user?.name} ({order.user?.email})
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p><strong>Discount Amount:</strong> ₹{order.discountAmount}</p>
            <p><strong>Expected Delivery:</strong> {new Date(order.expectedDeliveryDate).toLocaleDateString()}</p>
            <p><strong>Grand Total:</strong> ₹{order.grandTotal}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
            <p><strong>Shipping Charges:</strong> ₹{order.shippingCharges}</p>
            <p><strong>Tax:</strong> ₹{order.taxAmount}</p>
            <p><strong>Payment Method:</strong> {order.paymentInfo?.method}</p>
            <p><strong>Payment Status:</strong> {order.paymentInfo?.paymentStatus}</p>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Address */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          <p>{order.shippingAddress.address} {order.shippingAddress.confirmLocation}</p>
          <p>Phone: {order.shippingAddress.zipCode}</p>
        </CardContent>
      </Card>

      {/* Items */}
      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent>
          {order.items?.length > 0 ? (
            <ul className="space-y-4">
              {order.items.map((item: any) => (
                <li
                  key={item._id}
                  className="border p-3 rounded-md flex flex-col md:flex-row items-start md:items-center gap-4"
                >
                  <div className="flex gap-2 overflow-x-auto max-w-full">
                    {item.product?.imageUrl?.map((img: any, idx: number) => (
                      <img
                        key={idx}
                        src={img.url}
                        alt={item.product?.title || "Product Image"}
                        width={60}
                        height={60}
                        className="rounded object-cover border"
                      />
                    ))}
                  </div>
                  <div className="text-sm">
                    <p><strong>{item.product?.title}</strong></p>
                    <p>₹{item.product?.price} × {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items found in this order.</p>
          )}
        </CardContent>
      </Card>

      {/* Tracking History */}
      <Card>
        <CardHeader>
          <CardTitle>Tracking History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {Array.isArray(order.trackingHistory) && order.trackingHistory.length > 0 ? (
            order.trackingHistory.map((entry: any, idx: number) => (
              <div key={idx}>
                <p>
                  <strong>{entry.status}</strong> — {entry.location} at{" "}
                  {new Date(entry.dateTime).toLocaleString()}
                </p>
                {entry.note && <p className="text-muted-foreground">Note: {entry.note}</p>}
                {idx !== order.trackingHistory.length - 1 && <Separator className="my-2" />}
              </div>
            ))
          ) : (
            <p>No tracking history available.</p>
          )}
          <InvoicePreview orderId={order?._id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetail;
