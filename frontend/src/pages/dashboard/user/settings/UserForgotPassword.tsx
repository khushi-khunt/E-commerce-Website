import { useResetpassword } from "@/hooks/Mutation";
import { Button } from "@/theme/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/theme/components/ui/card";
import { Input } from "@/theme/components/ui/input";
import { forgotPasswordSchema } from "@/validations/loginSchemas";
import zodToFormikValidate from "@/validations/zodSchema";
import { Label } from "@radix-ui/react-label";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UserForgotPassword = () => {
  const navigate = useNavigate();
  const mutation = useResetpassword();

  const formik = useFormik({
    initialValues: { email: "" },
    validate: zodToFormikValidate(forgotPasswordSchema),
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutation.mutate(values);
        // console.log(values)
        toast.success("Otp send to your email");
        navigate("/user/verifyOtp", { state: { email: values.email } });
        resetForm();
      } catch (err: any) {
        toast.error(err?.message || "Failed to send otp in to email", {
          description: err?.response?.data?.message || "Something went wrong",
        });
      }
    },
  });

  return (
    <div className="flex items-center justify-center py-12 bg-[rgb(245,255,250)] px-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Forgot Password
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your email to receive a reset otp
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-[rgb(118,157,147)] text-white hover:bg-[rgb(67,89,83)]"
              disabled={formik.isSubmitting || mutation.isPending}
            >
              {mutation.isPending ? "Sending..." : "Generate otp"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center mt-2">
          <span
            onClick={() => navigate("/user/changepassword")}
            className="text-sm text-blue-600 underline cursor-pointer"
          >
            Back to Change Password
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserForgotPassword;
