import { updateOrderStatus } from "@/services/productService";
import { Button } from "@/theme/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/theme/components/ui/select";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
const orderStatusOptions = [
    "Processing",
    "Paid",
    "Shipped",
    "Delivered",
    "Cancelled"
];

const OrderUpdateStatus = ({ orderId, onClose }) => {
    const [status, setStatus] = useState(orderStatusOptions[0]);
    const queryClient = new QueryClient();

    const mutation = useMutation({
        mutationFn: updateOrderStatus,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            onClose(); 
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to update");
        }
    });

    const handleUpdate = () => {
        mutation.mutate({
            orderId,
            status,
        });
    };

    return (
        <div className="space-y-5 p-6 border border-gray-200 rounded-lg shadow-sm w-full max-w-md mx-auto bg-white">
            <h2 className="text-lg font-semibold mb-2">Update Order Status</h2>
            <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="order-status">
                    <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                    {orderStatusOptions.map((s) => (
                        <SelectItem key={s} value={s}>
                            {s}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button
                onClick={handleUpdate}
                disabled={mutation.isLoading}
                className="w-full"
            >
                {mutation.isLoading ? "Updating..." : "Update Status"}
            </Button>
        </div>
    );
};

export default OrderUpdateStatus
