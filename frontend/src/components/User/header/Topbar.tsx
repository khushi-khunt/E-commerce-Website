import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ListOrdered, LogOut, ShoppingCart, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import { Input } from "@/theme/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/theme/components/ui/dropdown-menu";
import useAuth from "@/hooks/use-auth";
import { Button } from "@/theme/components/ui/button";

export default function TopBar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { handleResetAuth } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    handleResetAuth();
    navigate("/");
  };

  return (
    <div className="w-full border-b bg-white z-50 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span
            className="text-lg font-bold text-primary cursor-pointer font-serif" onClick={() => navigate("/user/dashboard")}
          >
            MyStore
          </span>
        </div>

        {/* Center Search - hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-lg px-4">
          <Input
            type="text"
            placeholder="Search products..."
            className="rounded-full"
          />
        </div>

        {/* Right: Profile, Cart */}
        <div className="flex items-center gap-2">
          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="size-5 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={10} className="w-44">
              <DropdownMenuItem onClick={() => navigate("/user/settings")}>
                <UserCircle className="mr-2 size-4" /> Setting
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/user/orders")}>
                <ListOrdered className="mr-2 size-4" /> Orders
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/user/wishlist")}>
                <Heart className="mr-2 size-4" /> Wishlist
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/user/dashboard")}>
                <FaHome className="mr-2 size-4" /> Home
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 size-4" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => navigate("/user/cartpage")}
          >
            <ShoppingCart className="size-5 text-gray-600" />
          </Button>

          {/* Hamburger Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 6h14a1 1 0 010 2H3a1 1 0 110-2zm0 6h14a1 1 0 010 2H3a1 1 0 110-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu & Search */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-2 px-4 pb-4 md:hidden overflow-hidden"
          >
            <Input
              type="text"
              placeholder="Search products..."
              className="rounded-full"
            />
            <Button variant="ghost" onClick={() => navigate("/user/profile")}>
              <UserCircle className="mr-2" /> My Profile
            </Button>
            <Button variant="ghost" onClick={() => navigate("/user/orders")}>
              <ListOrdered className="mr-2" /> Orders
            </Button>
            <Button variant="ghost" onClick={() => navigate("/user/wishlist")}>
              <Heart className="mr-2" /> Wishlist
            </Button>
            <Button variant="ghost" onClick={() => navigate("/user/dashboard")}>
              <FaHome className="mr-2" /> Home
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="mr-2" /> Sign Out
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
