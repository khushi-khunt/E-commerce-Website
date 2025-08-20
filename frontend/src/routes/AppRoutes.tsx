import { Route, Routes } from "react-router-dom"
//AUTH PAGES
import AuthLayout from "@/layouts/AuthLayout"
import Login from "@/pages/auth/Login"
import Signup from "@/pages/auth/Signup"
import ForgotPassword from "@/pages/auth/ForgotPassword"
import ResetPassword from "@/pages/auth/ResetPassword"

//404 PAGE
import NotFound from "@/pages/Notfound"

//ADMIN PAGES
import AdminLayout from "@/layouts/AdminLayout"
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard"
// PRODUCT
import ProductAdd from "@/pages/dashboard/admin/product/ProductAdd"
import ProductList from "@/pages/dashboard/admin/product/ProductList"
import ProductDetail from "@/pages/dashboard/admin/product/ProductDetail"
import EditProduct from "@/pages/dashboard/admin/product/EditProduct"
// CATEGORY
import AddCategory from "@/pages/dashboard/admin/categories/AddCategory"
import CategoryList from "@/pages/dashboard/admin/categories/CategoryList"
import EditCategory from "@/pages/dashboard/admin/categories/EditCategory"
// ORDER
import OrderList from "@/pages/dashboard/admin/orders/OrderList"
import OrderDetail from "@/pages/dashboard/admin/orders/OrderDetail"
//USERS
import AllUsers from "@/pages/dashboard/admin/users/AllUsers"
// SETTING
import AdminSetting from "@/pages/dashboard/admin/settings/AdminSetting"
// COUPON
import AddCoupon from "@/pages/dashboard/admin/coupons/AddCoupon"
import CouponList from "@/pages/dashboard/admin/coupons/CouponList"
// LOCATION
import AllLocations from "@/pages/dashboard/admin/AllLocations"
// REPORT
import UsersReport from "@/pages/dashboard/admin/UsersReport"

//USER PAGES
import UserLayout from "@/layouts/UserLayout"
import UserDashboard from "@/pages/dashboard/user/UserDashboard"
// SETTING
import SettingsLayout from "@/pages/dashboard/user/settings/SettingsLayout"
import UserForgotPassword from "@/pages/dashboard/user/settings/UserForgotPassword"
import ChangePassword from "@/pages/dashboard/user/settings/ChangePassword"
import NewPassword from "@/pages/dashboard/user/settings/NewPassword"
import DeleteAccount from "@/pages/dashboard/user/settings/DeleteAccount"
import VerifyOtp from "@/pages/dashboard/user/settings/VerifyOtp"
import CartPage from "@/pages/dashboard/user/settings/CartPage"
// ORDERS
import MyOrders from "@/pages/dashboard/user/settings/MyOrders"
import CancelOrder from "@/pages/dashboard/user/settings/CancelOrder"
import { CheckoutPage } from "@/pages/dashboard/user/settings/CheckoutPage"
import { CheckoutSuccess } from "@/pages/dashboard/user/settings/CheckoutSuccess"
import LocationPage from "@/pages/dashboard/user/settings/LocationPage"
import PopularProducts from "@/pages/dashboard/user/products/PouplarProducts"
import UserProductDetail from "@/pages/dashboard/user/products/UserProductDetail"
import Wishlist from "@/pages/dashboard/user/settings/Wishlist"


const AppRoutes = () => {
    return (
        <Routes>
            {/* AUTH ROUTES */}
            <Route element={<AuthLayout />}>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Route>

            <Route element={<AdminLayout />}>
                {/* ADMIN DASHBOARD */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                {/* PRODUCT*/}
                <Route path="/admin/productadd" element={<ProductAdd />} />
                <Route path="/admin/productlist" element={<ProductList />} />
                <Route path="/admin/productlist/:_id" element={<ProductDetail />} />
                <Route path="/admin/productlist/:_id/edit" element={<EditProduct />} />
                {/* CATEGORY*/}
                <Route path="/admin/categoryadd" element={<AddCategory />} />
                <Route path="/admin/categorylist" element={<CategoryList />} />
                <Route path="/admin/categorylist/:_id/edit" element={<EditCategory />} />
                {/* ORDER */}
                <Route path="/admin/orderlist" element={<OrderList />} />
                <Route path="/admin/orderlist/:id" element={<OrderDetail />} />
                {/* USERS */}
                <Route path="/admin/allusers" element={<AllUsers />} />
                {/* SETTING */}
                <Route path="/admin/setting" element={<AdminSetting />} />
                {/* COUPON */}
                <Route path="/admin/addcoupon" element={<AddCoupon />} />
                <Route path="/admin/couponlist" element={<CouponList />} />
                {/* LOCATION */}
                <Route path="/admin/location" element={<AllLocations />} />
                {/* REPORT */}
                <Route path="/admin/report" element={<UsersReport />} />

            </Route>

            <Route element={<UserLayout />}>
                <Route path="/user/dashboard" element={<UserDashboard />} />
                {/* Setting */}
                <Route path="/user/settings" element={<SettingsLayout />} />
                <Route path="/user/forgotpassword" element={<UserForgotPassword />} />
                <Route path="/user/changepassword" element={<ChangePassword />} />
                <Route path="/user/newpassword/:token" element={<NewPassword />} />
                <Route path="/user/deleteaccount" element={<DeleteAccount />} />
                <Route path="/user/verifyotp" element={<VerifyOtp />} />
                <Route path="/user/cartpage" element={<CartPage />} />
                <Route path="/user/wishlist" element={<Wishlist />} />
                <Route path="/user/orders" element={<MyOrders />} />
                <Route path="/user/checkout" element={<CheckoutPage />} />
                <Route path="/user/checkout-success" element={<CheckoutSuccess />} />
                <Route path="/user/cancel-order" element={<CancelOrder />} />
                <Route path="/user/location" element={<LocationPage />} />

                {/* Products */}
                <Route path="/user/popularproduct" element={<PopularProducts />} />
                <Route path="/product/:slug" element={<UserProductDetail />} />
                <Route />
            </Route>

            {/* 404 PAGE */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes