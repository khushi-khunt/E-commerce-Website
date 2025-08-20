import { Tabs, TabsList, TabsTrigger, TabsContent, } from "@/theme/components/ui/tabs";
import { Card } from "@/theme/components/ui/card";
import { User, Lock, Gift, Trash2 } from "lucide-react";
import DeleteAccount from "./DeleteAccount";
import ProfileSetting from "./ProfileSetting";
import ChangePassword from "./ChangePassword";

export default function SettingsLayout() {
  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <Card className="overflow-hidden border bg-white shadow-sm">
        <Tabs
          defaultValue="profile"
          className="flex flex-col md:flex-row"
        >
          {/* Sidebar */}
          <TabsList className="flex md:flex-col w-full md:w-64 bg-muted/10 p-4 space-y-1 md:min-h-[200px]">
            <TabsTrigger
              value="profile"
              className="w-full justify-start gap-2 text-left px-3 py-2 rounded-md hover:bg-muted aria-selected:bg-primary/10 aria-selected:text-primary font-medium text-sm transition"
            >
              <User className="w-4 h-4" />
              Edit Profile
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="w-full justify-start gap-2 text-left px-3 py-2 rounded-md hover:bg-muted aria-selected:bg-primary/10 aria-selected:text-primary font-medium text-sm transition"
            >
              <Lock className="w-4 h-4" />
              Change Password
            </TabsTrigger>
            <TabsTrigger
              value="delete"
              className="w-full justify-start gap-2 text-left px-3 py-2 rounded-md hover:bg-destructive/10 aria-selected:bg-destructive/10 text-destructive aria-selected:text-destructive font-medium text-sm transition"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </TabsTrigger>
          </TabsList>

          {/* Main content */}
          <div className="flex-1 p-6 bg-muted/5">
            <TabsContent value="profile">
              <ProfileSetting />
            </TabsContent>
            <TabsContent value="password">
              <ChangePassword />
            </TabsContent>
            <TabsContent value="delete">
              <DeleteAccount />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}
