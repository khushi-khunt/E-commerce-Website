import client from "@/lib/client"
//------------ADMIN----------//
//Admin-State-DashboardData
export const getDashboardStates = async () => {
    try {
        const res = await client.get("/api/stats/overview");
        // console.log(res)
        return res.data
    } catch (error: any) {
        console.error("Error Fetching Dashboard States", error.response?.data || error.message);
        throw error;
    }
}
//Admin-AddProduct
export const addProduct = async (formData: FormData) => {
    try {
        const response = await client.post("/api/products/create", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Add Product error", error.response?.data || error.message);
        throw error;
    }
}
//Admin-ViewProductList
export const fetchProducts = async () => {
    try {
        const response = await client.get("/api/products/allProducts");
        // console.log("Fetchdata products are", response.data)
        return response.data
    } catch (error: any) {
        console.error("Error Fetching Products", error.response?.data || error.message);
        throw error;
    }
}
//ADMIN-UpdateProduct
export const UpdateProduct = async (_id: string, formdata: FormData) => {
    try {
        const res = await client.put(`/api/products/update/${_id}`, formdata, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data
    } catch (error: any) {
        console.error("Error to update Product", error.response?.data || error.message);
        throw error;
    }
}
//ADMIN-DeleteProduct
export const deleteProductById = async (_id: string) => {
    try {
        const res = await client.delete(`/api/products/delete/${_id}`);
        return res.data
    } catch (error: any) {
        console.error("Error to Delete Products", error.response?.data || error.message);
        throw error;
    }
}
//Admin-product-detail-view
export const fetchProductById = async (_id: string) => {
    try {
        if (!_id) throw new Error("Invalid product id.");
        const response = await client.get(`/api/products/details/id/${_id}`);
        // console.log("response from api", response.data)
        return response.data
    } catch (error: any) {
        console.error("Error Fetching Products by ID", error.response?.data || error.message);
        throw error;
    }
}
//Admin-AddSale
export const AddSale = async (formData: FormData) => {
    try {
        const res = await client.post('/api/sale/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return res.data
    } catch (error: any) {
        console.error("Error to Add Sale", error.res?.data || error.message);
        throw error;
    }
}
//Admin-Category-Add
export const AddCategory = async (formData: FormData) => {
    try {
        const response = await client.post('/api/categories/create', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data
    } catch (error: any) {
        console.log("Error to Add Category", error.response?.data || error.message);
        throw error;
    }
}
//Admin-Category-View
export const fetchCategories = async () => {
    try {
        const response = await client.get("/api/categories/list");
        return response.data
    } catch (error: any) {
        console.log("Error to View Category", error.response?.data || error.message)
        throw error;
    }
}
//Admin-fetch-categoryById
export const fetchCategoryById = async (_id: string) => {
    try {
        if (!_id) throw new Error("Invalid product id.")
        const res = await client.get(`/api/categories/getCategory/${_id}`);
        // console.log(res.data)
        return res.data
    } catch (error: any) {
        console.error("Error fetching categories by ID", error.response?.data || error.message);
        throw error;
    }
}
//ADMIN-Category-Update
export const updateCategory = async (_id: string, formData: FormData) => {
    try {
        const res = await client.put(`/api/categories/update/${_id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data
    } catch (error: any) {
        console.error("Error to update Product", error.response?.data || error.message);
        throw error;
    }
}
// Admin-Category-Delete
export const DeleteCategory = async (_id: string) => {
    try {
        const res = await client.delete(`/api/categories/delete/${_id}`);
        return res.data
    } catch (error: any) {
        console.error("Error to Delete Products", error.response?.data || error.message);
        throw error;
    }
}
//Admin-Getall-Users
export const fetchUsers = async () => {
    const res = await client.get("/api/admin/users");
    return res.data;
}
//ADMIN-Coupoun-Add
export const createCoupon = async (couponData: any) => {
    const res = await client.post("/api/coupons/create", couponData);
    return res.data
}
//ADMIN-Coupon-List
export const FetchCoupons = async () => {
    const res = await client.get("/api/coupons/list");
    // console.log("Coupon List", res.data)
    return res.data
}
//ADMIN-Coupon-delete
export const DeleteCoupon = async (id: string) => {
    const res = await client.delete(`/api/coupons/delete/${id} `);
    return res.data
}
//ADMIN-Coupons-toggle/activate & deactivate
export const toggleCouponStatus = async (id: string) => {
    const res = await client.patch(`/api/coupons/${id}/toggle`);
    return res.data
}
//ADMIN-Coupons-filter
export const filterCoupons = async (search: string) => {
    try {
        const res = await client.get("/api/coupons/filter", {
            params: { search },
        });
        return res.data;
    } catch (error: any) {
        console.error("Error to Filter Coupons", error.response?.data || error.message);
        throw error;
    }
};
//ADMIN-GET ALL ORDERS
export const fetchOrders = async ({ page = 1, limit = 10, status = "", userId = "", search = "" }) => {
    const res = await client.get("/api/orders/admin/list", {
        params: { page, limit, status, userId, search },
    });
    return res.data;
};
// ADMIN-fetchorder details
export const fetchOrderDetails = async (orderId: string) => {
    const res = await client.get(`/api/orders/admin/${orderId}`);
    return res.data;
}
//ADMIN-update order-status
export const updateOrderStatus = async ({ orderId, status, location, note, }: { orderId: string; status: string; location?: string; note?: string; }) => {
    const res = await client.patch(`/api/orders/admin/${orderId}/status`, { status, location, note, });
    return res.data;
};
//ADMIN-order status showing(distribution)
export const fetchStatusDistribution = async (from?: string, to?: string) => {
    const params = new URLSearchParams();
    if (from) params.append("from", from);
    if (to) params.append("to", to);

    const res = await client.get(`/api/orders/admin/status-distribution?${params.toString()}`);
    return res.data;
};
//ADMIN-EXPORT CSV
export const downloadOrderCSV = async () => {
    const res = await client.get("/api/orders/export", {
        responseType: "blob"
    });
    //Trigger file download
    const blob = new Blob([res.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
}
// ADMIN-PREVIEW INVOICE
export const previewInvoice = async (orderId: string) => {
    const res = await client.get(`/api/orders/invoice-preview/${orderId}`, {
        responseType: "blob"
    });
    const file = new Blob([res.data], { type: "application/pdf" })
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
}
// ADMIN_Locations
export const fetchAllLocations = async () => {
    const response = await client.get("/api/locations/admin/location")
    return response.data
}
//-----------USER-----------//
//USER-PROFILE-DATA
export const updateProfile = async (formData: FormData) => {
    const res = await client.put("/api/user/update-profile", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.data.user
}
//USER-CHANGE-PASSWORD
export const changeUserPassword = async (data: { currentPassword: string, newPassword: string }) => {
    const res = await client.put("/api/user/change-password", data);
    return res.data;
}
//USER-VERIFY-OTP
export const verifyEmailOtp = async (data: { email: string, otp: string }) => {
    const res = await client.post("/api/user/verify-email-otp?", data);
    // console.log("verifyemailotp is", res.data)
    return res.data
}
//USER-FORGOT-PASSWORD
export const Resetpassword = async (data: { email: string }) => {
    const res = await client.post("/api/user/request-email-update", data)
    return res.data
}
//User-Profile-Newpassword
export const SetNewPassword = async (data: { newPassword: string, confirmPassword: string, token?: string }) => {
    const res = await client.post(`/api/user/auth/set-new-password`, { newPassword: data.newPassword, confirmPassword: data.confirmPassword, },
        {
            headers: {
                Authorization: `Bearer ${data.token}`,
            }
        })
    return res.data
}
//USER-Delete Account
export const DeleteAccount = async () => {
    const res = await client.delete("")
    return res.data
}
//USER-popular products
export const PopularProducts = async () => {
    try {
        const res = await client.get("/api/products/popular")
        return res.data
    } catch (error: any) {
        console.log("Error to view popular products", error.response?.data || error.message)
        throw error;
    }
}
// USER-New-arrival
export const NewArrival = async () => {
    try {
        const res = await client.get("/api/products/new-arrivals")
        return res.data
    } catch (error: any) {
        console.log("Error to view new arrival products", error.response?.data || error.message)
        throw error;
    }
}
// USER-Featured categories
export const FeaturedCategory = async () => {
    try {
        const res = await client.get("/api/categories/featured")
        return res.data
    } catch (error: any) {
        console.log("Error to view featured categories", error.response?.data || error.message)
        throw error;
    }
}
// USER-All tags
export const ProductTag = async () => {
    try {
        const res = await client.get("/api/products/tags")
        return res.data
    } catch (error: any) {
        console.log("Error to view product tag", error.response?.data || error.message)
        throw error;
    }
}
// // USER-Product bt slug-detail
export const ProductSlug = async (slug: string) => {
    try {
        const res = await client.get(`/api/products/details/slug/${slug}`);
        return res.data.product
    } catch (error: any) {
        console.log("Error to view product slug", error.response?.data || error.message)
        throw error;
    }
}
// USER: Add single product to cart
export const AddProductCart = async (productId: string, quantity: number = 1) => {
    try {
        const res = await client.post("/api/cart/add", { productId, quantity });
        return res.data;
    } catch (error: any) {
        console.log("Error adding to cart:", error.response?.data || error.message);
        throw error;
    }
};
//USER-View cart
export const fetchUserCart = async (userId: string) => {
    try {
        const res = await client.get('/api/cart', {
            params: { userId },
        })
        return res.data;
    } catch (error: any) {
        console.error("Error fetching cart:", error.response?.data || error.message);
        throw error;
    }
};
//USER-UPDATE cart-item
export const updateCart = async (userId: string, productId: string, quantity: number) => {
    try {
        const res = await client.put('/api/cart/update', { userId, productId, quantity })
        return res.data
    } catch (error: any) {
        console.error("Error updating car items", error.response?.data || error.message);
        throw error;
    }
}
//USER-Remove indivisual cart-item
export const removeFromCart = async (userId: string, productId: string) => {
    try {
        const res = await client.delete(`/api/cart/remove/${productId}`, {
            data: { userId }
        })
        return res.data
    } catch (error: any) {
        console.error("Error remove car items", error.response?.data || error.message);
        throw error;
    }
}
//USER- clear full cart
export const clearCart = async (userId: string) => {
    try {
        const res = await client.delete(`/api/cart/clear`, { data: { userId }, });
        return res.data;
    } catch (error: any) {
        console.error("Error clearing cart:", error.response?.data || error.message);
        throw error;
    }
};
// USER: Send entire cart
export const sendCart = async (cartItems: any[], userId: string) => {
    try {
        const res = await client.post("/api/cart", { userId, items: cartItems });
        return res.data;
    } catch (error: any) {
        console.log("Error sending cart:", error.response?.data || error.message);
        throw error;
    }
};
//USER-order Total
export const fetchTotalOrders = async (cartItems: any[]) => {
    const orderItems = cartItems.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
    }));
    const res = await client.post("/api/orders/total", {
        orderItems,
    });
    return res.data;
};
//USER-check-out
export const checkoutOrder = async (orderData: any) => {
    const res = await client.post("/api/orders/checkout", orderData);
    return res.data
}
//USER-ALL data of wishlist 
export const useWishlist = async () => {
    const res = await client.get("/api/wishlist");
    return res.data.wishlist ?? res.data
}
// //USER-addtoWishlist
export const addToWishlist = async ({ productId }: { productId: string }) => {
    const res = await client.post("/api/wishlist/add", { productId });
    return res.data;
}
// USER-REMOVE FROM WISHLIST
export const removeFromWishlist = async (productId: string) => {
    const res = await client.delete(`/api/wishlist/remove/${productId}`);
    return res.data;
}
//USER-move to cart from wishlist
export const moveToCart = async (productId: string) => {
    const res = await client.post('/api/wishlist/move-to-cart', { productId });
    return res.data;
}
//USER-fetch orders
export const fetchUserOrders = async () => {
    const res = await client.get("/api/orders/my-orders")
    // console.log(res.data)
    return res.data
}
// USER-re-order
export const reorderById = async (orderId: string) => {
    try {
        const res = await client.post(`/api/orders/reorder/${orderId}`);
        return res.data
    } catch (error: any) {
        console.log("Error re-order into cart:", error.response?.data || error.message);
        throw error;
    }
}
// USER-trackorder
export const trackOrder = async (orderId: string) => {
    const res = await client.post(`/api/orders/track/${orderId}`);
    return res.data
}
//USER-invoice
export const getInvoicePDF = async (orderId: string) => {
    const res = await client.get(`/api/orders/invoice/${orderId}`, {
        responseType: "blob"
    });
    return res.data
}
// User-send order otp to cancel
export const sendCancelOtp = async (orderId: string) => {
    const res = await client.post(`/api/orders/${orderId}/send-otp`);
    return res.data
}
// user-cancel order 
export const cancelOrderWithOtp = async ({ orderId, otp }: { orderId: string, otp: string }) => {
    try {
        if (!orderId) throw new Error("Invalid order is passed to cancel order")
        const res = await client.post(`/api/orders/${orderId}/cancel-with-otp`, { otp });
        // console.log(res.data)
        return res.data
    } catch (err) {
        console.log("Error to cancel order:", err.response?.data || err.message);
        throw err;
    }
}
//User-Get location
export const saveLocation = async ({ userId, address, zipCode, confirmLocation }) => {
    const res = await client.post("/api/location/user/locations", { userId, address, zipCode, confirmLocation });
    return res.data;
}
//USER-Create order
export const createOrderAPI = async ({ cartItems, shippingAddress }) => {
    try {
        const res = await client.post("/api/orders", { cartItems, shippingAddress });
        return res.data;
    } catch (error: any) {
        console.error("Error creating order:", error.response?.data || error.message);
        throw error;
    }
};