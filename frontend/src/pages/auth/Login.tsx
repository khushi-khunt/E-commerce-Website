import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/theme/components/ui/card"
import { Input } from "@/theme/components/ui/input"
import { Button } from "@/theme/components/ui/button"
import { Label } from "@radix-ui/react-label"
import { useFormik } from "formik"
import { useLoginMutation } from "@/hooks/Mutation"
import { useNavigate } from "react-router-dom"
import zodToFormikValidate from "@/validations/zodSchema"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useState } from "react"
import { toast } from "sonner"
import useAuth from "@/hooks/use-auth"
import { loginSchema } from "@/validations/loginSchemas"
import { FaLeaf, FaUser } from "react-icons/fa"
const Login = () => {
    const navigate = useNavigate()
    const loginMutation = useLoginMutation()
    const [showPassword, setShowPassword] = useState(false)
    const { handleAddCredentials } = useAuth()

    const formik = useFormik({
        initialValues: { email: "khushikhunt18@gmail.com", password: "Admin@123" },
        validate: zodToFormikValidate(loginSchema),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await loginMutation.mutateAsync(values)

                const credentials = {
                    id: response.user?._id ?? null,
                    user: response.user?.name ?? null,
                    token: response.accessToken ?? null,
                    refreshToken: response.refreshToken ?? null,
                    role: response.user?.role ?? null,
                }
                handleAddCredentials(credentials)

                toast.success(response.message || "Welcome back!", {
                    description: "Login Successful",
                    duration: 3000,
                })

                resetForm()

                if (credentials.role === "ADMIN") {
                    navigate("/admin/dashboard")
                } else {
                    navigate("/user/dashboard")
                }
            } catch (error: any) {
                toast.error(error?.response?.data?.message || error.message)
            }
        },
    })

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50">
            {/* LEFT SIDE */}
            <div className="hidden md:flex flex-col justify-center items-center relative p-10">
                {/* Decorative shapes */}
                <div className="absolute w-64 h-64 bg-emerald-200/40 rounded-full blur-3xl top-10 left-10" />
                <div className="absolute w-72 h-72 bg-sky-200/40 rounded-full blur-2xl bottom-10 right-10" />

                <h1 className="text-5xl flex font-extrabold mb-4 bg-gradient-to-r from-emerald-500 to-sky-600 bg-clip-text text-transparent drop-shadow-sm">
                    <FaLeaf className="text-emerald-5a00 mx-1" />
                    Welcome Back
                </h1>
                <p className="text-lg mb-6 text-center max-w-sm text-gray-600">
                    Log in to stay connected and continue your journey with us.
                </p>
                <Button
                    variant="outline"
                    className="rounded-full border-emerald-400 text-emerald-600 hover:bg-emerald-50 transition"
                    onClick={() => navigate("/signup")}
                >
                    Create Account
                </Button>
            </div>

            {/* RIGHT SIDE - LOGIN FORM */}
            <div className="flex items-center justify-center p-6">
                <Card className="w-full max-w-md bg-white/70 backdrop-blur-xl shadow-lg border border-white/40 rounded-3xl">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-sky-600 to-emerald-500 bg-clip-text text-transparent">Login</CardTitle>
                        <p className="text-center text-sm text-gray-500 mt-1">
                            Enter your details to access your account
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit} className="space-y-5">

                            {/* Email */}
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 "><FaUser /></span>
                                </div>
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

                            {/* Forgot Password */}
                            <div className="text-right">
                                <span
                                    className="text-sm text-sky-600 hover:underline cursor-pointer"
                                    onClick={() => navigate("/forgot-password")}
                                >
                                    Forgot password?
                                </span>
                            </div>

                            <Button
                                type="submit"
                                className="w-full rounded-full font-medium bg-gradient-to-r from-emerald-400 to-sky-500 hover:opacity-90"
                                disabled={formik.isSubmitting || loginMutation.isPending}
                            >
                                {loginMutation.isPending ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="text-center text-sm text-gray-600">
                        Don’t have an account?{" "}
                        <span
                            className="ml-1 text-sky-600 font-medium hover:underline cursor-pointer"
                            onClick={() => navigate("/signup")}
                        >
                            Sign up
                        </span>
                    </CardFooter>
                </Card>
            </div>

        </div>
    )
}

export default Login
