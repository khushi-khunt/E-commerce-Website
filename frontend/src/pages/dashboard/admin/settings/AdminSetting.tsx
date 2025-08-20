import { Button } from "@/theme/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/theme/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/theme/components/ui/dialog";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/use-auth";

const AdminSetting = () => {
  const { handleResetAuth } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    handleResetAuth();
    navigate("/"); 
  };

  return (
    <div className="p-6 flex justify-center items-center min-h-[80vh] bg-gray-50">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Settings</CardTitle>
          <p className="text-gray-500 text-sm mt-2">
            Manage your admin account and preferences
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 items-center">
          {/* Logout Button */}
          <Button 
            variant="destructive" 
            size="lg" 
            className="w-full flex items-center gap-2"
            onClick={() => setOpen(true)}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </CardContent>
      </Card>

      {/* Logout Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Are you sure you want to log out? You will need to log in again to access the admin dashboard.
          </p>
          <DialogFooter className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSetting;
