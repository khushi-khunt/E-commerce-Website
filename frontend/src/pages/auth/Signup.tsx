import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/theme/components/ui/card";
import { Input } from "@/theme/components/ui/input";
import { Label } from "@/theme/components/ui/label";
import { Button } from "@/theme/components/ui/button";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import zodToFormikValidate from "@/validations/zodSchema";
import { signup } from "@/services/authService";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { signupSchema } from "@/validations/loginSchemas";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: zodToFormikValidate(signupSchema),
    onSubmit: async (values, { resetForm }) => {
      try {
        const { confirmPassword, ...rest } = values;
        const payload = { ...rest, role: "USER" };
        const result = await signup(payload);

        dispatch(setCredentials(result));

        toast.success(result.message || "Account created!", {
          description: "Signup Successful",
          duration: 3000,
        });
        resetForm();
        navigate("/");
      } catch (err: any) {
        toast.error(err.message || "Signup failed", {
          description: err?.response?.data?.message || "Something went wrong",
          duration: 3000,
        });
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Two Column Layout */}
      <div className="w-1/2 max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-2xl overflow-hidden">

        {/* LEFT SIDE */}
        <div className="w-[380px] flex flex-col items-center justify-center bg-primary rounded-r-[30%] text-white p-6">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-sm mb-6 text-center">
            Already have an account?
          </p>
          <Button
            className="rounded-sm border-1"
            onClick={() => navigate("/")}
          >
            Log In
          </Button>
        </div>

        {/* RIGHT SIDE - SIGNUP FORM */}
        <div className="p-6 flex items-center justify-center">
          <Card className="w-full max-w-md shadow-none border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-center font-extrabold">Create Account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-sm">{formik.errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="pr-10"
                    />
                    <span
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl text-gray-600 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </span>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm">{formik.errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="pr-10"
                    />
                    <span
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl text-gray-600 cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </span>
                  </div>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? "Signing up..." : "Sign Up"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="justify-center text-sm">
              Already have an account?{" "}
              <span className="ml-1 text-primary underline cursor-pointer" onClick={() => navigate("/")}>
                Log In
              </span>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Signup;
