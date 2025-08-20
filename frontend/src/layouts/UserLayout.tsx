import Footer from "@/components/User/footer/Footer"
import { Header } from "@/components/User/header/Header"
// import useAuth from "@/hooks/use-auth"
// import { useEffect } from "react"
import { Outlet,/* useNavigate*/ } from "react-router-dom"

const UserLayout = () => {

    // const navigate = useNavigate();
    // const token = useAuth();

    // useEffect(() => {
    //     if (!token) {
    //         navigate("/")
    //     }
    // }, [token, navigate])

    return (
        <div className="flex flex-col min-h-screen bg-[rgb(245,255,250)]">
            <main className="flex-grow h-[100vh] overflow-scroll ">
                <Header />
                <Outlet />
                <Footer />
            </main>
        </div>
    )
}

export default UserLayout