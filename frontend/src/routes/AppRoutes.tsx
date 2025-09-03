import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
//AUTH PAGES
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Signup = lazy(() => import('@/pages/auth/Signup'));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));

//OTHER PAGES
const ProtectedLayout = lazy(() => import("@/layouts/ProtectedLayout"));
import Notfound from "@/pages/Notfound";
import LoadingComponent from "@/components/LoadingComponent";
//ADMIN PAGES
const AdminLayout = lazy(() => import("@/layouts/AdminLayout"))
const AdminDashboard = lazy(() => import("@/pages/dashboard/admin/AdminDashboard"))
const ProductAdd = lazy(() => import("@/pages/dashboard/admin/product/ProductAdd"))
const ProductList = lazy(() => import("@/pages/dashboard/admin/product/ProductList"))
const ProductDetail = lazy(() => import("@/pages/dashboard/admin/product/ProductDetail"))
const EditProduct = lazy(() => import("@/pages/dashboard/admin/product/EditProduct"))
const AddCategory = lazy(() => import("@/pages/dashboard/admin/categories/AddCategory"))
const CategoryList = lazy(() => import("@/pages/dashboard/admin/categories/CategoryList"))
const EditCategory = lazy(() => import("@/pages/dashboard/admin/categories/EditCategory"))
const OrderList = lazy(() => import("@/pages/dashboard/admin/orders/OrderList"))
const OrderDetail = lazy(() => import("@/pages/dashboard/admin/orders/OrderDetail"))
const AllUsers = lazy(() => import("@/pages/dashboard/admin/users/AllUsers"))
const Faqs = lazy(() => import("@/pages/dashboard/admin/settings/Faqs"))
const HelpCenter = lazy(() => import("@/pages/dashboard/admin/settings/HelpCenter"))
const PrivacyPolicy = lazy(() => import("@/pages/dashboard/admin/settings/PrivacyPolicy"))
const AddCoupon = lazy(() => import("@/pages/dashboard/admin/coupons/AddCoupon"))
const CouponList = lazy(() => import("@/pages/dashboard/admin/coupons/CouponList"))
const AllLocations = lazy(() => import("@/pages/dashboard/admin/AllLocations"))
const UsersReport = lazy(() => import("@/pages/dashboard/admin/UsersReport"))

//USER PAGES
const UserLayout = lazy(() => import("@/layouts/UserLayout"));
const UserDashboard = lazy(() => import("@/pages/dashboard/user/UserDashboard"));
const SettingsLayout = lazy(() => import("@/pages/dashboard/user/settings/SettingsLayout"));
const UserForgotPassword = lazy(() => import("@/pages/dashboard/user/settings/UserForgotPassword"));
const ChangePassword = lazy(() => import("@/pages/dashboard/user/settings/ChangePassword"));
const NewPassword = lazy(() => import("@/pages/dashboard/user/settings/NewPassword"));
const DeleteAccount = lazy(() => import("@/pages/dashboard/user/settings/DeleteAccount"));
const VerifyOtp = lazy(() => import("@/pages/dashboard/user/settings/VerifyOtp"));
const CartPage = lazy(() => import("@/pages/dashboard/user/settings/CartPage"));
const MyOrders = lazy(() => import("@/pages/dashboard/user/settings/MyOrders"));
const CancelOrder = lazy(() => import("@/pages/dashboard/user/settings/CancelOrder"));
const CheckoutPage = lazy(() => import("@/pages/dashboard/user/settings/CheckoutPage"))
const CheckoutSuccess = lazy(() => import("@/pages/dashboard/user/settings/CheckoutSuccess"))
const PopularProducts = lazy(() => import("@/pages/dashboard/user/products/PouplarProducts"));
const UserProductDetail = lazy(() => import("@/pages/dashboard/user/products/UserProductDetail"));
const Wishlist = lazy(() => import("@/pages/dashboard/user/settings/Wishlist"));
const LocationPage = lazy(() => import("@/pages/dashboard/user/settings/LocationPage"));

const AppRoutes = () => {
    return (
        <Routes>
            {/* AUTH ROUTES */}
            <Route element={<Suspense fallback={<LoadingComponent message="Please wait, loading Page..." />}><AuthLayout /></Suspense>}>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Route>

            {/* ADMIN PROTECTED ROUTES */}
            <Route element={<Suspense fallback={<LoadingComponent message="Please wait, loading Page..." />}><ProtectedLayout /></Suspense>}>
                <Route element={<Suspense fallback={<LoadingComponent message="Please wait, loading Page..." />}><AdminLayout /></Suspense>}>
                    {/* ADMIN DASHBOARD */}
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    {/* PRODUCT*/}
                    <Route path="/admin/productadd" element={<ProductAdd />} />
                    <Route path="/admin/productlist" element={<ProductList />} />
                    <Route path="/admin/productlist/:_id" element={<ProductDetail />} />
                    <Route
                        path="/admin/productlist/:_id/edit"
                        element={<EditProduct />}
                    />
                    {/* CATEGORY*/}
                    <Route path="/admin/categoryadd" element={<AddCategory />} />
                    <Route path="/admin/categorylist" element={<CategoryList />} />
                    <Route
                        path="/admin/categorylist/:_id/edit"
                        element={<EditCategory />}
                    />
                    {/* ORDER */}
                    <Route path="/admin/orderlist" element={<OrderList />} />
                    <Route path="/admin/orderlist/:id" element={<OrderDetail />} />
                    {/* USERS */}
                    <Route path="/admin/allusers" element={<AllUsers />} />
                    {/* SETTING */}
                    <Route path="/admin/faqs" element={<Faqs />} />
                    <Route path="/admin/help-center" element={<HelpCenter />} />
                    <Route path="/admin/privacy-policy" element={<PrivacyPolicy />} />
                    {/* COUPON */}
                    <Route path="/admin/addcoupon" element={<AddCoupon />} />
                    <Route path="/admin/couponlist" element={<CouponList />} />
                    {/* LOCATION */}
                    <Route path="/admin/location" element={<AllLocations />} />
                    {/* REPORT */}
                    <Route path="/admin/report" element={<UsersReport />} />
                </Route>
            </Route>

            {/* USER PROTECTED ROUTES */}
            <Route element={<Suspense fallback={<LoadingComponent message="Please wait, loading Page..." />}><ProtectedLayout /></Suspense>}>
                <Route element={<Suspense fallback={<LoadingComponent message="Please wait, loading Page..." />}><UserLayout /></Suspense>}>
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
            </Route>

            {/* CATCH ALL FOR UNKNOWN ROUTES */}
            <Route path="/notfound" element={<Notfound />} />

            {/* 404 PAGE */}
            <Route path="*" element={<Notfound />} />
        </Routes>
    );
};

export default AppRoutes;
