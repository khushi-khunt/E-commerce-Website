import { changeUserPassword } from "@/services/productService";
import { Button } from "@/theme/components/ui/button";
import { Input } from "@/theme/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 👇 toggle visibility states
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error("New Password must be at least 6 characters..!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Password do not match..!");
      return;
    }

    setLoading(true);

    try {
      const result = await changeUserPassword({
        currentPassword,
        newPassword,
      });
      toast.success(result.message || "Password Changed Successfully..!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div className="space-y-1 relative">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowCurrent((prev) => !prev)}
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* New Password */}
          <div className="space-y-1 relative">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowNew((prev) => !prev)}
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1 relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          <div className="text-right">
            <Link to={"/user/forgotpassword"} className="text-blue-500 underline">Forgot Password</Link>
          </div>

          <Button type="submit" className="w-full bg-[rgb(118,157,147)] hover:bg-[rgb(67,89,83)]" disabled={loading}>
            {loading ? "Updating..." : "Change Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
