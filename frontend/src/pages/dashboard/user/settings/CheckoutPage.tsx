import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { checkoutOrder } from "@/services/productService";

export const CheckoutPage = () => {
    const { state } = useLocation();
    const { cartItems, userId, location } = state || {};

    const { mutate: placeOrder, isPending } = useMutation({
        mutationFn: checkoutOrder,
        onSuccess: (data) => {
            if (data?.url) {
                window.location.href = data.url; // redirect
            } else {
                toast.error("Payment link not received.");
            }
        },
        onError: () => {
            toast.error("Checkout failed.");
        },
    });

    useEffect(() => {
        if (!cartItems?.length || !userId) {
            toast.error("Invalid checkout details.");
            return;
        }

        placeOrder({
            orderItems: cartItems,
            user: userId,
            shippingAddress: {
                address: location.address,
                zipCode: location.zipCode,
                confirmLocation: location.confirmLocation,
            },
            paymentMethod: "card",
            paymentInfo: { paymentStatus: "Pending" },
        });
    }, [cartItems, userId, placeOrder, location]);

    return (
        <div className="text-center py-24">
            <h2 className="text-xl font-semibold">Processing your order...</h2>
            {isPending && (
                <>
                    <div className="flex justify-center mt-6">
                        {/* Tailwind spinner */}
                        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                    <p className="mt-4">Please wait while we redirect you to Stripe.</p>
                </>
            )}
        </div>
    );
};
