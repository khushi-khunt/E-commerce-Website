import { login, ResetLink, ResetPassword, signup } from "@/services/authService"
import { AddCategory, addProduct, AddProductCart, AddSale, addToWishlist, cancelOrderWithOtp, createOrderAPI, FeaturedCategory, fetchCategories, fetchUsers, getDashboardStates, moveToCart, NewArrival, PopularProducts, ProductTag, removeFromWishlist, reorderById, Resetpassword, saveLocation, useWishlist, verifyEmailOtp } from "@/services/productService"
import { addToCart, clearCart } from "@/store/slices/cartSlice"
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from "react-redux"
import { toast } from "sonner"
// ----AUTH MUTATION------- 
//login
export const useLoginMutation = () => {
    return useMutation({
        mutationFn: login,
    })
}
//signup
export const useSignupMutation = () => {
    return useMutation({
        mutationFn: signup,
    })
}
//sendResetLink
export const useSendResetLinkMutation = () => {
    return useMutation({
        mutationFn: ResetLink,
    })
}
//ResetPassword
export const useResetPasswordMutation = () => {
    return useMutation({
        mutationFn: ResetPassword,
    })
}

//-------ADMIN-MUTATION------ 
//Add-product
export const useAddProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['product'] });
        }
    })
}

//State-cards
export const useDadhboardStates = () => {
    return useQuery({
        queryKey: ["dashboardStates"],
        queryFn: getDashboardStates
    })
}
//Add-Sale
export const useAddSale = () => {
    return useMutation({
        mutationFn: AddSale
    })
}

//Add-Category
export const useAddCategory = () => {
    return useMutation({
        mutationFn: AddCategory
    })
}
//View-Category
export const useViewCategory = () => {
    useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories
    })
}
//ALL-USERS
export const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    })
}

//----------USER-------
//User-forgotpassword
export const useResetpassword = () => {
    return useMutation({
        mutationFn: Resetpassword,
    })
}
//User-forgotpassword-otp
export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: verifyEmailOtp,
    })
}
//USER-popular products
export const usePopularProducts = () => {
    return useQuery({
        queryKey: ["popular-products"],
        queryFn: PopularProducts,
        initialData: [],
    })
}
// //USER-new arrivals
export const useNewArrivals = () => {
    return useQuery({
        queryKey: ["new-arrivals"],
        queryFn: NewArrival
    })
}
// //USER-featured category
export const useFeaturedCategories = () => {
    return useQuery({
        queryKey: ["featured-categories"],
        queryFn: FeaturedCategory
    })
}
// //USER-Product-Tag
export const useProductTags = () => {
    return useQuery({
        queryKey: ["product-tag"],
        queryFn: ProductTag
    })
}
//USER-ADD To cart
export const useAddToCart = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: async ({ product, quantity }: { product: any; quantity: number }) => {
            await AddProductCart(product._id, quantity);
            return product; // return full product data for Redux
        },

        onSuccess: (product) => {
            dispatch(addToCart({
                productId: product._id,
                title: product.title,
                price: product.onSale ? product.salePrice : product.price,
                quantity: 1,
                imageUrl: product.imageUrl?.[0]?.url || "/fallback.jpg",
            }));
            toast.success("Added to cart!");
        },

        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to add to cart");
        },
    });
};

// USER-VIEW WISHLIST
export const useViewWishlist = () => {
    return useQuery({
        queryKey: ["wishlist"],
        queryFn: useWishlist,
    })
}

//USER-Addto Wishlist
export const useAddToWishlist = () => {
    const queryClient = new QueryClient
    return useMutation({
        mutationFn: addToWishlist,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
            toast.success(data.message || "Added to wishlist");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to add to wishlist");
        },
    });
};
// user-remove from wishlist
export const useRemoveFromWishlist = () => {
    const queryClient = new QueryClient
    return useMutation({
        mutationFn: removeFromWishlist,
        onSuccess: (data) => {
            // console.log("Product is removing from wishlist")
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
            toast.success(data.message || "remove from wishlist");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to remove from wishlist");
        },
    });
}
//User-move to cart from wishlist
export const useMoveToCart = () => {
    const queryClient = new QueryClient
    return useMutation({

        mutationFn: moveToCart,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
            toast.success(data.message || "remove from wishlist");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to remove from wishlist");
        },
    });
};

//USER-Reorder from orderlist
export const useReorder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: reorderById,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["my-orders"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to reorder");
        },
    });
};
//USER-Cancel order with otp
export const useCancelOrderWithOtp = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: cancelOrderWithOtp,
        onSuccess: (data) => {
            toast.success("Order cancelled.!");
            queryClient.invalidateQueries({ queryKey: ["orders"] })
        }
    });
};
//USER- location of user
export function useSaveLocation() {
    return useMutation({
        mutationFn: saveLocation,
        onSuccess: (data) => {
            toast.success("Location saved Successfully");
        }
    });
}
// user create order
export const useCreateOrder = () => {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: createOrderAPI,
        onSuccess: (data) => {
            toast.success("Order placed successfully");
            dispatch(clearCart());
            queryClient.invalidateQueries({ queryKey: ["user-orders"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.error || "Order creation failed");
        },
    });
};

