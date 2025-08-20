import { useCancelOrderWithOtp } from "@/hooks/Mutation";
import { Button } from "@/theme/components/ui/button";
import { Input } from "@/theme/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CancelOrder = () => {
  const [otp, setOtp] = useState("");
  const orderId = location.state?.orderId || localStorage.getItem("cancelOrderId") || "";
  const navigate = useNavigate();

  if (!location.state?.orderId) {
    localStorage.setItem("cancelOrderId", orderId);
  }

  const {
    mutate,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCancelOrderWithOtp();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ orderId, otp });
    navigate("/user/cancel-order");
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-xl shadow-sm space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">❌ Cancel Order</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Enter the OTP sent to your email/phone to confirm cancellation of order <strong>#{orderId}</strong>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="text-sm"
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Cancelling..." : "Confirm Cancellation"}
        </Button>

        {isSuccess && (
          <p className="text-sm text-green-600 text-center">
            ✅ Order cancelled successfully!
          </p>
        )}

        {isError && (
          <p className="text-sm text-red-500 text-center">
            {(error as any)?.response?.data?.message || "Something went wrong"}
          </p>
        )}
      </form>
    </div>
  );
};

export default CancelOrder;
