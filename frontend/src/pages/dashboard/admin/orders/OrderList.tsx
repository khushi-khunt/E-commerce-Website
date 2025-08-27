import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/services/productService";
import { Button } from "@/theme/components/ui/button";
import { useNavigate } from "react-router-dom";
import ExportCSV from "@/components/Admin/ExportCSV";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/theme/components/ui/dialog";
import { Badge } from "@/theme/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/theme/components/ui/card";
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

  if (isLoading) return <div className="p-4 text-center">Loading orders...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error loading orders</div>;

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6 border-gray-50 rounded-md bg-white shadow-md">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold">Order Management</h2>
          <p className="text-sm sm:text-md text-gray-500">
            Manage and track all customer orders
          </p>
        </div>
        <div className="self-start">
          <ExportCSV />
        </div>
      </div>

      {/* Orders Section */}
      <div className="border border-gray-300 rounded-md shadow-sm">
        <h1 className="p-3 text-lg font-semibold">Recent Orders</h1>

        {/* Desktop Table View - Shows from 1200px+ */}
        <div className="hidden min-[1200px]:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="py-2 px-3 min-w-[90px] text-xs">Order ID</th>
                <th className="py-2 px-3 min-w-[100px] text-xs">Customer</th>
                <th className="py-2 px-3 min-w-[100px] text-xs">Products</th>
                <th className="py-2 px-3 min-w-[50px] text-xs">Qty</th>
                <th className="py-2 px-3 min-w-[70px] text-xs">Price</th>
                <th className="py-2 px-3 min-w-[80px] text-xs">Status</th>
                <th className="py-2 px-3 min-w-[80px] text-xs">Payment</th>
                <th className="py-2 px-3 min-w-[100px] text-xs">Order Date</th>
                <th className="py-2 px-3 min-w-[100px] text-xs">Delivery</th>
                <th className="py-2 px-3 min-w-[100px] text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((order) => (
                <tr key={order.orderId} className="border-b hover:bg-muted/50">
                  <td className="py-2 px-3 text-blue-600 font-medium text-xs">
                    {order.orderId || order._id}
                  </td>
                  <td className="py-2 px-3 text-xs">{order.user}</td>
                  <td className="py-2 px-3 text-xs truncate max-w-[100px]" title={order.products}>{order.products}</td>
                  <td className="py-2 px-3 text-xs">{order.totalQuantity}</td>
                  <td className="py-2 px-3 font-semibold text-xs">₹{order.totalPrice}</td>
                  <td className="py-2 px-3">
                    <Badge
                      variant="outline"
                      className={`px-2 py-0.5 text-xs rounded-full font-medium border 
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
                  <td className="py-2 px-3 text-xs">{order.paymentMethod}</td>
                  <td className="py-2 px-3 text-xs">{order.orderPlaced}</td>
                  <td className="py-2 px-3 text-xs">{order.expectedDelivery}</td>
                  <td className="py-2 px-3">
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewOrder(order.orderId)}
                        className="h-7 w-7 p-0 min-[1400px]:w-auto min-[1400px]:px-2"
                      >
                        <EyeIcon className="h-3 w-3" />
                        <span className="hidden min-[1400px]:inline ml-1 text-xs">View</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdateOrder(order.orderId)}
                        className="h-7 w-7 p-0 min-[1400px]:w-auto min-[1400px]:px-2"
                      >
                        <Edit className="h-3 w-3" />
                        <span className="hidden min-[1400px]:inline ml-1 text-xs">Edit</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View - Hidden from 1200px+ */}
        <div className="min-[1200px]:hidden space-y-4 p-3">
          {data.orders.map((order) => (
            <Card key={order.orderId} className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="text-blue-600 font-medium text-sm">
                    {order.orderId || order._id}
                  </div>
                  <Badge
                    variant="outline"
                    className={`px-2 py-1 text-xs rounded-full font-medium border 
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
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Customer:</span>
                    <div className="font-medium">{order.user}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Products:</span>
                    <div className="font-medium">{order.products}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Quantity:</span>
                    <div className="font-medium">{order.totalQuantity}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Price:</span>
                    <div className="font-semibold text-green-600">₹{order.totalPrice}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Payment:</span>
                    <div className="font-medium">{order.paymentMethod}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Order Date:</span>
                    <div className="font-medium">{order.orderPlaced}</div>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-gray-500">Expected Delivery:</span>
                    <div className="font-medium">{order.expectedDelivery}</div>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleViewOrder(order.orderId)}
                  >
                    <EyeIcon className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleUpdateOrder(order.orderId)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </Button>
          <span className="text-sm whitespace-nowrap">
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
      </div>

      {/* Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="w-[95vw] max-w-md">
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