import useAuth from "@/hooks/use-auth"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/theme/components/ui/alert-dialog"
import { Button } from "@/theme/components/ui/button"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const DeleteAccount = () => {
  const { handleResetAuth } = useAuth();
  const navigate = useNavigate();

  const logoutWithoutAPI = () => {
    handleResetAuth();

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    toast.success("You have been logged out.");
    navigate("/signup");
  };

  return (
    <section className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-red-600">Delete Your Account</h2>
      <p className="text-sm text-gray-600 mb-6">
        Deleting your account is permanent and cannot be undone. All your data will be lost.
      </p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete My Account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account and all your data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={logoutWithoutAPI}>
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}

export default DeleteAccount;
