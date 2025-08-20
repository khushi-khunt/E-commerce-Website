import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
  ChevronDown,
  ChevronUp,
  Layers,
  FilePlus,
  PieChart,
  MapPin,
  Tag,
} from "lucide-react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import logo from "@/assets/images/logo.jpg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import { Button } from "@/theme/components/ui/button";
import useAuth from "@/hooks/use-auth";

type SidebarLink = {
  name: string;
  to?: string;
  icon: JSX.ElementType;
  children?: {
    name: string;
    to: string;
  }[];
};

type Props = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

type SidebarSection = {
  title: string;
  links: SidebarLink[];
};

const sidebarLinks: SidebarLink[] = [
  {
    name: "Ecommerce",
    icon: ShoppingCart,
    children: [
      { name: "Add Product", to: "/admin/productadd" },
      { name: "Product List", to: "/admin/productlist" },
    ],
  },
  {
    name: "Category",
    icon: Layers,
    children: [
      { name: "New Category", to: "/admin/categoryadd" },
      { name: "Category list", to: "/admin/categorylist" },
    ],
  },
  {
    name: "Order",
    icon: FilePlus,
    children: [
      { name: "Order List", to: "/admin/orderlist" },

    ],
  },
  {
    name: "Users",
    icon: Users,
    children: [{ name: "All User", to: "/admin/allusers" }],
  },
  { name: "Report", to: "/admin/report", icon: PieChart },
  {
    name: "Coupons",
    icon: Tag,
    children: [
      { name: "Add Coupon", to: "/admin/addcoupon" },
      { name: "Coupon List", to: "/admin/couponlist" },
    ],
  },
  { name: "Location", to: "/admin/location", icon: MapPin },
];

const sidebarSections: SidebarSection[] = [
  {
    title: "MAIN HOME",
    links: [{ name: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "ALL PAGE",
    links: sidebarLinks.filter((link) =>
      ["Ecommerce", "Category", "Order", "Users", "Report"].includes(link.name)
    ),
  },
  {
    title: "SETTING",
    links: sidebarLinks.filter((link) =>
      ["Coupons", "Location"].includes(link.name)
    ),
  },
  {
    title: "CONNECT US",
    links: [],
  },
];

const sidebarIcons = [
  { name: "Facebook", icon: <AiOutlineFacebook /> },
  { name: "Twitter", icon: <AiOutlineTwitter /> },
  { name: "LinkedIn", icon: <AiOutlineLinkedin /> },
  { name: "Instagram", icon: <AiOutlineInstagram /> },
];

export default function AdminSidebar({ collapsed, setCollapsed }: Props) {
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const handleResetAuth = useAuth();
  const location = useLocation();

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleLogout = () => {
    handleResetAuth;
    navigate("/");
  };

  return (
    <aside
      className={clsx(
        "h-full bg-white border-r shadow-sm flex flex-col justify-between transition-all duration-300",
        collapsed ? "w-20 overflow-hidden" : "w-64 overflow-y-auto"
      )}
    >
      <div>
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <Link to="/admin/dashboard" className="text-xl font-bold">
            {!collapsed ? (
              <div className="flex items-center gap-2">
                <img src={logo} alt="logo" className="h-8 w-auto" />
                <span className="text-xl font-bold text-[rgb(34,121,252)]">Ecommerce</span>
              </div>
            ) : (
              <span className="text-xl font-bold text-blue-500">E</span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4 mt-4 px-2">
          {sidebarSections.map(({ title, links }) => (
            <div key={title}>
              {!collapsed && (
                <h4 className="text-xs text-gray-400 font-bold px-3 mb-1 tracking-wider">
                  {title}
                </h4>
              )}

              <div className="flex flex-col gap-1">
                {/* CONNECT US */}
                {title === "CONNECT US" ? (
                  <div
                    className={clsx(
                      "flex",
                      collapsed ? "flex-col items-center" : "gap-2 px-3"
                    )}
                  >
                    {sidebarIcons.map(({ name, icon: Icon }) => (
                      <a
                        key={name}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-600 text-2xl p-2 border-1 rounded-2xl"
                      >
                        {Icon}
                      </a>
                    ))}
                  </div>
                ) : (
                  // Render sidebar links
                  links.map(({ name, icon: Icon, to, children }) => {
                    const isOpen = openMenus[name];
                    const isParentActive = !!to && location.pathname.startsWith(to);
                    const isSubmenuActive =
                      children?.some((child) =>
                        location.pathname.startsWith(child.to)
                      ) ?? false;

                    return (
                      <div key={name}>
                        <button
                          onClick={() => {
                            if (collapsed) {
                              setCollapsed(false);
                            } else {
                              if (children) {
                                toggleMenu(name);
                              } else if (to) {
                                navigate(to);
                              }
                            }
                          }}
                          className={clsx(
                            "group w-full flex items-center justify-between px-4 py-2 rounded-lg transition",
                            (isParentActive || isSubmenuActive)
                              ? "bg-blue-100 text-blue-600 font-medium"
                              : "text-gray-600 hover:bg-gray-100"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5" />
                            {!collapsed && (
                              <span
                                className={clsx(
                                  "font-semibold transition-colors",
                                  (isParentActive || isSubmenuActive)
                                    ? "text-blue-600"
                                    : "text-gray-600 group-hover:text-blue-600"
                                )}
                              >
                                {name}
                              </span>
                            )}
                          </div>
                          {!collapsed && children && (
                            isOpen ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )
                          )}
                        </button>

                        {/* Submenu */}
                        {children && isOpen && !collapsed && (
                          <div className="pl-10 mt-1 flex flex-col gap-1 text-gray-400 font-semibold">
                            {children.map((child) => (
                              <NavLink
                                key={child.name}
                                to={child.to}
                                className={({ isActive }) =>
                                  clsx(
                                    "text-sm py-1 rounded hover:text-blue-600",
                                    isActive && "text-blue-600 font-medium"
                                  )
                                }
                              >
                                ◇ {child.name}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="px-4 py-4 border-t">
        <Button
          variant="destructive"
          className={clsx("w-full flex items-center", collapsed ? "justify-center" : "gap-2")}
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </aside>
  );
}
