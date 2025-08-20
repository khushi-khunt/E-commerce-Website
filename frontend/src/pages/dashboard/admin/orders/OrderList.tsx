import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/services/productService";
import { Button } from "@/theme/components/ui/button";
import { useNavigate } from "react-router-dom";
import ExportCSV from "@/components/Admin/ExportCSV";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/theme/components/ui/dialog";
import { Badge } from "@/theme/components/ui/badge";
import { Edit, EyeIcon } from "lucide-react";
import OrderUpdateStatus from "@/components/Admin/OrderUpdateStatus";

const OrderList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => fetchOrders({ page, limit }),
  });

  const handleViewOrder = (orderId) => {
    navigate(`/admin/orderlist/${orderId}`);
  };

  const handleUpdateOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenModal(true);
  };

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders</div>;

  return (
    <div className="p-6 space-y-6 border-gray-50 rounded-md bg-white shadow-md">
      <div className="flex justify-between items-start ">
        <div className="space-y-1 ">
          <h2 className="text-3xl font-bold">Order Management</h2>
          <p className="text-md text-gray-500">
            Manage and track all customer orders
          </p>
        </div>
        <ExportCSV />
      </div>
      <div className="border border-gray-300 rounded-md shadow-sm ">
        <h1 className="p-3 text-lg font-semibold">Recent Orders</h1>
        <table className="w-full text-sm text-left ">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Products</th>
              <th className="py-2 px-4">Qty</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Payment</th>
              <th className="py-2 px-4">Order Placed</th>
              <th className="py-2 px-4">Delivery</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map((order) => (
              <tr key={order.orderId} className="border-b hover:bg-muted/50">
                <td className="py-2 px-4 text-blue-600 font-medium">
                  {order.orderId || order._id}
                </td>
                <td className="py-2 px-4">{order.user}</td>
                <td className="py-2 px-4">{order.products}</td>
                <td className="py-2 px-4">{order.totalQuantity}</td>
                <td className="py-2 px-4 font-semibold">₹{order.totalPrice}</td>
                <td className="py-2 px-4">
                  <Badge
                    variant="outline"
                    className={`px-3 py-1 text-sm rounded-full font-medium border 
                      ${order.status === "Cancelled"
                        ? "bg-red-100 text-red-800 border-red-300 opacity-100"
                        : order.status === "Delivered"
                          ? "bg-green-100 text-green-800 border-green-300 opacity-100"
                          : order.status === "out of delivery"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-300 opacity-80"
                            : order.status === "Shipped"
                              ? "bg-teal-100 text-teal-800 border-teal-300 opacity-80"
                              : order.status === "Paid"
                                ? "bg-blue-100 text-blue-900 border-blue-300 opacity-100"
                                : "bg-gray-100 text-gray-900 border-gray-300 opacity-100"

                      }`}
                  >
                    {order.status}
                  </Badge>
                </td>
                <td className="py-2 px-4">{order.paymentMethod}</td>
                <td className="py-2 px-4">{order.orderPlaced}</td>
                <td className="py-2 px-4">{order.expectedDelivery}</td>
                <td className="py-2 px-4 space-y-2 flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewOrder(order.orderId)}
                  ><EyeIcon />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdateOrder(order.orderId)}
                  ><Edit />
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-4 pt-4">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Prev
        </Button>
        <span className="text-sm">
          Page {data.page} of {data.totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= data.totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>

      {/* Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>
          {selectedOrderId && (
            <OrderUpdateStatus
              orderId={selectedOrderId}
              onClose={() => setOpenModal(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderList;