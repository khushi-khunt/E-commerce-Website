import { Input } from "@/theme/components/ui/input";
import { Label } from "@/theme/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger, } from "@/theme/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/theme/components/ui/calendar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { updateProfile } from "@/services/productService";
import { Button } from "@/theme/components/ui/button";
import { setUser } from "@/store/slices/authSlice";
import avatar from "@/assets/images/avatar.png"

export default function ProfileSetting() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [dob, setDob] = useState<Date | undefined>(
    user?.dob ? new Date(user.dob) : undefined
  );
  const [profilePic, setProfilePic] = useState<File | string | null>(
    user?.profilePic || null
  );

  const parseDateString = (str: string) => {
    const [day, month, year] = str.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  useEffect(() => {
    if (!user) return;
    setName(user.fullName || user.name || "");
    setEmail(user.email || "");
    setMobile(user.mobile || "");
    setGender(user.gender || "");
    const parsedDob =
      user.dateOfBirth && user.dateOfBirth.includes("/")
        ? parseDateString(user.dateOfBirth)
        : new Date(user.dateOfBirth);
    setDob(parsedDob && !isNaN(parsedDob.getTime()) ? parsedDob : undefined);
    setProfilePic(user.profilePic || null);
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (profilePic && typeof profilePic !== "string") {
      formData.append("icon", profilePic);
    }
    formData.append("email", email);
    formData.append("mobile", mobile);
    if (dob) formData.append("dob", dob.toISOString());
    formData.append("gender", gender);
    try {
      const updateUser = await updateProfile(formData);
      toast.success("Profile updated successfully");
      dispatch(setUser(updateUser));
    } catch (error: any) {
      toast.error("Failed to update profile");
    }
  };
  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Profile Picture at top center */}
      <div className="md:col-span-2 flex flex-col items-center gap-4">
        {profilePic ? (
          <img
            src={
              typeof profilePic === "string"
                ? profilePic
                : URL.createObjectURL(profilePic)
            }
            alt="Profile"
            className="w-24 h-24 object-cover rounded-full border shadow"
          />
        ) : (
          <img
            src={avatar}
            alt="Default Avatar"
            className="w-24 h-24 object-cover rounded-full border shadow"
          />
        )}

        {/* Hidden input and custom label */}
        <label
          htmlFor="profilePic"
          className="cursor-pointer px-4 py-1 text-sm text-blue-600 hover:underline"
        >
          Click here to upload image
        </label>
        <input
          id="profilePic"
          type="file"
          accept="image/*"
          onChange={handleProfilePicChange}
          className="hidden"
        />
      </div>
      {/* Rest of the form continues below */}
      <div>
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Label>Phone</Label>
        <Input
          type="tel"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>
      <div>
        <Label>Gender</Label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

      </div>
      <div>
        <Label>Date of Birth</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dob instanceof Date && !isNaN(dob.getTime()) ? format(dob, "dd-MM-yyyy") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar mode="single" selected={dob} onSelect={setDob} />
          </PopoverContent>
        </Popover>
      </div>
      <div className="md:col-span-2">
        <Button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          Save changes
        </Button>
      </div>
    </form>
  );
} 
