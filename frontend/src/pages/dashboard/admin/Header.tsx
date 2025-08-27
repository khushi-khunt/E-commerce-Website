import { Button } from "@/theme/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/theme/components/ui/dropdown-menu"
import { Input } from "@/theme/components/ui/input"
import { Bell, Globe, MoonStar, SearchIcon, Settings } from "lucide-react"
import flag1 from "@/assets/images/flag1.png"
import flag2 from "@/assets/images/flag2.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/theme/components/ui/avatar"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store"
import avatar from '@/assets/images/avatar.png'
import { useNavigate } from "react-router-dom"
import { resetState } from "@/store/slices/authSlice"
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state: RootState) => state.auth.user)

  const handleLogout = () => {
    dispatch(resetState());
    navigate("/");
  }

  return (
    <header className="flex items-center justify-between p-3 border-b bg-background shadow-sm">
      {/* LEFT SEARCH INPUT */}
      <div className="hidden md:flex w-1/3 relative items-center">
        <Input type="text" placeholder="Search here.." className="w-full" />
        <SearchIcon className="absolute right-3 size-5" />
      </div>

      {/* CENTER ICONS */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {/* LANGUAGE SELECTOR */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="bg-gray-200 p-2 sm:p-3 rounded-full">
              <Globe className="w-5 h-5 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex items-center justify-center">
            <div>
              <p className="px-4 gap-2 py-2 flex">
                <img src={flag1} alt="flag-1" />
                ENG
              </p>
              <p className="px-4 gap-2 py-2 flex">
                <img src={flag2} alt="flag-2" />
                VIE
              </p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* MODE TOGGLE */}
        <div className="bg-gray-200 p-2 rounded-full hover:bg-gray-100">
          <MoonStar className="w-5 h-5 " />
        </div>

        {/* NOTIFICATIONS */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative bg-gray-200 p-2 sm:p-3 rounded-full">
              <Bell className="w-5 h-5" />
              <span className="text-[10px] sm:text-xs bg-red-500 text-white rounded-full px-1 absolute -top-1 -right-0">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-64 sm:w-72 p-2 space-y-2" align="end">
            <div className="text-sm font-semibold px-2 text-muted-foreground">Notifications</div>
            <DropdownMenuItem className="text-sm flex flex-col items-start space-y-1">
              <p className="font-medium text-foreground">Order #1234 placed</p>
              <span className="text-xs text-muted-foreground">Just now</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm flex flex-col items-start space-y-1">
              <p className="font-medium text-foreground">New user registered</p>
              <span className="text-xs text-muted-foreground">5 mins ago</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm flex flex-col items-start space-y-1">
              <p className="font-medium text-foreground">Low stock alert: Shoes</p>
              <span className="text-xs text-muted-foreground">1 hour ago</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* SETTINGS */}
        <Button
          variant={"ghost"}
          size={"icon"}
          className="bg-gray-200 p-2 sm:p-3 rounded-full"
          onClick={() => navigate("/admin/help-center")}
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* RIGHT: USER INFORMATION */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
            <Avatar>
              <AvatarImage src={avatar || "/default-avatar.png"} />
              <AvatarFallback>
                {admin?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {/* Hide name on small screens */}
            <div className="text-sm leading-tight hidden md:block">
              <p className="font-medium">{admin?.name || "Admin"}</p>
            </div>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40 sm:w-48">
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Header
