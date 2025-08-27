import useAuth from "@/hooks/use-auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

type ProtectedLayoutProps = {
    allowedRoles?: string[]
}

const ProtectedLayout = ({ allowedRoles }: ProtectedLayoutProps) => {

    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.token) {
            navigate("/");
            return;
        }

        // ROLE BASED
        if (allowedRoles && !allowedRoles.includes(auth.role)) {
            if (auth.role === "ADMIN") navigate("/admin/dashboard");
            else navigate("/user/dashboard")
        }
    }, [auth, navigate, allowedRoles])


    return auth?.token ? <Outlet /> : null;
}

export default ProtectedLayout
