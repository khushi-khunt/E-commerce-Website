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
import { FaUser } from "react-icons/fa"
import {motion} from "framer-motion"
const Login = () => {
    const navigate = useNavigate()
    const loginMutation = useLoginMutation()
    const [showPassword, setShowPassword] = useState(false)
    const { handleAddCredentials } = useAuth()
      const [animate, setAnimate] = useState(false)


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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            {/* Wrapper with two columns */}
            <div className=" w-1/2 max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-2xl overflow-hidden">

                {/* LEFT SIDE */}
                <div className="w-[380px] flex flex-col items-center justify-center bg-primary rounded-r-[30%] text-white">
                    <h2 className="text-3xl font-bold mb-4">Hello Welcome !</h2>
                    <p className="text-sm mb-6 text-center">
                        Don’t have an account?
                    </p>
                    <Button
                        className="rounded-sm border-1"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </Button>
                </div>

                {/* RIGHT SIDE - LOGIN FORM */}
                <div className=" p-6 flex items-center justify-center">
                    <Card className="w-full max-w-md shadow-none border-0">
                        <CardHeader>
                            <CardTitle className="text-2xl font-extrabold text-center">Login</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={formik.handleSubmit} className="space-y-4">

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
                                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl text-gray-600 size-5 cursor-pointer"><FaUser/></span>
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

                                {/* Forgot Password */}
                                <div className="text-center mt-1">
                                    <span
                                        className="text-sm hover:underline cursor-pointer"
                                        onClick={() => navigate("/forgot-password")}
                                    >
                                        Forgot password?
                                    </span>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={formik.isSubmitting || loginMutation.isPending}
                                >
                                    {loginMutation.isPending ? "Logging in..." : "Login"}
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="justify-center text-sm">
                            Don’t have an account?{" "}
                            <span
                                className="ml-1 text-primary underline cursor-pointer"
                                onClick={() => navigate("/signup")}
                            >
                                Sign up
                            </span>
                        </CardFooter>
                    </Card>
                </div>

            </div>
        </div>
    )
}

export default Login
