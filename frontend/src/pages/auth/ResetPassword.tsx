import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/theme/components/ui/card"
import { Input } from "@/theme/components/ui/input"
import { Label } from "@/theme/components/ui/label"
import { Button } from "@/theme/components/ui/button"
import { useFormik } from "formik"
import zodToFormikValidate from "@/validations/zodSchema"
import { useNavigate, useParams } from "react-router-dom"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { useState } from "react"
import { toast } from "sonner"
import { useResetPasswordMutation } from "@/hooks/Mutation"
import { useAppDispatch } from "@/store/hooks"
import { setCredentials } from "@/store/slices/authSlice"
import { resetPasswordSchema } from "@/validations/loginSchemas"

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const mutation = useResetPasswordMutation()
  const dispatch = useAppDispatch();

  const { token } = useParams<{ token: string }>()

  const handleSubmit = async () => {
    if (!token) return
    const values = formik.values

    try {

      const response = await mutation.mutateAsync({ token, newPassword: values.password })
      alert("password reset sucessfully")
      // console.log("Sending to backend:", { token, password: values.password });

      if (response?.id && response?.user && response?.token) {
        dispatch(setCredentials({
          id: response.id,
          user: response.user,
          token: response.token,
          refreshToken: response.refreshToken,
          role: response.role,
        }))
      }
      toast.success("Password reset successful")
      formik.resetForm()
      navigate("/")
    } catch (err: any) {
      toast.error(err.message || "Password reset failed", {
        description: err?.response?.data?.message || "Something went wrong"
      })
    }
  }

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: zodToFormikValidate(resetPasswordSchema),
    onSubmit: handleSubmit
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* New Password */}
            <div className="space-y-1">
              <Label htmlFor="password">New Password</Label>
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

            <Button type="submit" className="w-full" disabled={formik.isSubmitting || mutation.isPending}>
              {mutation.isPending ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-sm">
          <span className="text-primary underline cursor-pointer" onClick={() => navigate("/")}>
            Back to Login
          </span>
        </CardFooter>
      </Card>
    </div>
  )
}






export default ResetPassword
