import { /*useEffect,*/ useState } from "react";
import AdminSidebar from "@/pages/dashboard/admin/AdminSidebar";
import Header from "@/pages/dashboard/admin/Header";
import { Outlet,/* useNavigate*/ } from "react-router-dom";
// import useAuth from "@/hooks/use-auth";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const navigate = useNavigate()
  // const { token } = useAuth()

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/");
  //   }
  // }, [token,navigate])


  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`h-screen border-r bg-white transition-all duration-300 ${collapsed ? "w-20 overflow-hidden" : "w-64"
          }`}
      >
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>

      <div className="flex flex-col flex-1 h-full">
        <Header />
        <main className="flex-1 overflow-y-auto px-6 py-6 bg-[rgb(240,245,249)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
