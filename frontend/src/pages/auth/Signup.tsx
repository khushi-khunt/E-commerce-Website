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
import { FaRocket } from "react-icons/fa";

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
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50">
      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center items-center relative p-10">
        <div className="absolute w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl top-10 left-10" />
        <div className="absolute w-72 h-72 bg-sky-200/40 rounded-full blur-2xl bottom-10 right-10" />

        <h1 className="flex text-5xl font-extrabold mb-4 bg-gradient-to-r from-emerald-500 to-sky-600 bg-clip-text text-transparent drop-shadow-sm">Join Us <FaRocket className="text-sky-600 mx-2 size-10 mt-2" /></h1>
        <p className="text-lg mb-6 text-center max-w-sm text-gray-600">
          Create your account and start your journey with us today.
        </p>
        <Button
          variant="outline"
          className="rounded-full border-emerald-400 text-emerald-600 hover:bg-emerald-50 transition"
          onClick={() => navigate("/")}
        >
          Already have an account? Log In
        </Button>
      </div>

      {/* RIGHT SIDE - SIGNUP FORM */}
      <div className="p-6 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/70 backdrop-blur-xl shadow-lg border border-white/40 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-sky-600 to-emerald-500 bg-clip-text text-transparent">Sign Up</CardTitle>
            <p className="text-center text-sm text-gray-500 mt-1">
              Fill in your details to create your account
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit} className="space-y-5">
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 cursor-pointer"
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
                    className="absolute right-3 top-1/2  -translate-y-1/2 text-xl text-gray-400 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
                )}
              </div>

              <Button type="submit" className="w-full rounded-full font-medium bg-gradient-to-r from-emerald-400 to-sky-500 hover:opacity-90" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-gray-600 ">
            Already have an account?{" "}
            <span className="ml-1 text-sky-600 font-medium hover:underline cursor-pointer" onClick={() => navigate("/")}>
              Log In
            </span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
export default Signup;
