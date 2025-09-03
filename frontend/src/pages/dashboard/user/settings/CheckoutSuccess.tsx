import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserOrders } from "@/services/productService";
import useAuth from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";

export default function CheckoutSuccess() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: orders,
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-orders"],
    queryFn: fetchUserOrders,
    enabled: false,
  });

  useEffect(() => {
    if (user?._id) {
      refetch();
    }
  }, [user?._id, refetch]);

  return (
    <div className="w-full h-[70vh] flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 px-4">
      <div className="flex flex-col shadow-lg p-5 justify-center items-center rounded-xl">
        {/* Success Icon */}
        <div className="bg-green-100 rounded-full p-4 my-6 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-green-700 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-700 text-center max-w-md">
          Thank you for your order. Your payment has been processed successfully.
        </p>

        {/* Loading / Error States */}
        {isLoading && (
          <p className="mt-4 text-gray-500 text-sm animate-pulse">
            Loading your updated orders...
          </p>
        )}
        {isError && (
          <p className="mt-4 text-red-500 text-sm">
            Failed to fetch your updated orders. Please try again later.
          </p>
        )}

        {/* Action Button */}
        <button
          onClick={() => navigate("/user/dashboard")}
          className="mt-8 px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};  
