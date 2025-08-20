import { useVerifyOtp } from "@/hooks/Mutation";
import {Card,CardHeader,CardTitle,CardContent,CardFooter,} from "@/theme/components/ui/card";
import { Button } from "@/theme/components/ui/button";
import { Input } from "@/theme/components/ui/input";
import { Label } from "@/theme/components/ui/label";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};
  const mutation = useVerifyOtp();

  const formik = useFormik({
    initialValues: { otp: "" },
    onSubmit: async (values) => {
      try {
        const res = await mutation.mutateAsync({ email, otp: values.otp });
        const token = res?.token;

        if (token) {
          toast.success("OTP verified!");
          navigate(`/user/newpassword/${token}`);
        }else{
            toast.error("Token not received from server.");
        }
      } catch (err: any) {
        toast.error("Verification failed", {
          description: err?.response?.data?.message || "Invalid OTP",
        });
      }
    },
  });

  return (
    <div className="flex items-center justify-center py-12 bg-[rgb(245,255,250)] px-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Verify OTP
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Please enter the OTP sent to your email.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="otp" className="text-sm font-medium text-gray-700">
                OTP
              </Label>
              <Input
                id="otp"
                name="otp"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your OTP"
              />
              {formik.touched.otp && formik.errors.otp && (
                <p className="text-sm text-red-500">{formik.errors.otp}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[rgb(118,157,147)] text-white hover:bg-[rgb(67,89,83)]"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <span
            onClick={() => navigate("/user/forgotpassword")}
            className="text-sm text-blue-600 underline cursor-pointer"
          >
            Back to Forgot Password
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyOtp;
