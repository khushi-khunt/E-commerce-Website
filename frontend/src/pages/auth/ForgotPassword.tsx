//Theme
import { Button } from "@/theme/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/theme/components/ui/card"
import { Input } from "@/theme/components/ui/input"
//mutation
import { useSendResetLinkMutation } from "@/hooks/Mutation"
import { forgotPasswordSchema } from "@/validations/loginSchemas"
import zodToFormikValidate from "@/validations/zodSchema"
import { Label } from "@radix-ui/react-label"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const ForgotPassword = () => {

  const navigate = useNavigate();
  const mutation = useSendResetLinkMutation();

  const formik = useFormik({
    initialValues: { email: "" },
    validate: zodToFormikValidate(forgotPasswordSchema),
    onSubmit: async (values, { resetForm }) => {
      try {
        await mutation.mutate(values)
        toast.success("Reset Link sent to your email")

        resetForm()
      } catch (err) {
        toast.error(err.message || "Failed to send reset link", {
          description: err?.response?.data?.message || "Something went wrong"
        })
      }
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
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
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={formik.isSubmitting || mutation.isPending}>
              {mutation.isPending ? "sending..." : "Send Reset Link"}
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

export default ForgotPassword