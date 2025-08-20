import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { RootState } from "@/store";
import { Card, CardContent, CardHeader, CardTitle, } from "@/theme/components/ui/card";
import { Button } from "@/theme/components/ui/button";
import { Separator } from "@/theme/components/ui/separator";
import { toast } from "sonner";
import { ShieldCheck, Truck, BadgeCheck, RotateCcw, Trash2, } from "lucide-react";
import { clearCart, fetchUserCart, removeFromCart, updateCart, } from "@/services/productService";

const CartPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const userId = useSelector((state: RootState) => state.auth.id);

    const { data: cart, isLoading, isError, } = useQuery({
        queryKey: ["user-cart", userId],
        queryFn: () => fetchUserCart(userId!),
        enabled: !!userId,
    });
    // Extract unique categories from cart items
    const cartCategories = Array.from(
        new Set(cart?.items?.map((item: any) => item?.product?.category).filter(Boolean))
    );

    const subtotal = cart?.items?.reduce((total, item) => {
        if (!item?.product) return total;
        const price = item.product.onSale ? item.product.salePrice : item.product.price;
        return total + price * item.quantity;
    }, 0) || 0;

    const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
        if (!userId) return toast.error("Please log in to update cart.");
        try {
            await updateCart(userId, productId, newQuantity);
            toast.success("Cart updated!");
            queryClient.invalidateQueries({ queryKey: ["user-cart", userId] });
        } catch (error) {
            toast.error("Failed to update cart.");
            console.error(error);
        }
    };

    const handleRemoveItem = async (productId: string) => {
        if (!userId) return toast.error("Please log in.");
        try {
            // console.log("ProductId is ",productId)
            await removeFromCart(userId, productId);
            toast.success("Item removed from cart");
            queryClient.invalidateQueries({ queryKey: ["user-cart", userId] });
        } catch (error) {
            toast.error("Failed to remove item");
            console.error(error);
        }
    };

    const handleClearCart = async () => {
        if (!userId) return toast.error("Please log in to clear cart.");
        try {
            await clearCart(userId);
            toast.success("Cart cleared successfully!");
            queryClient.invalidateQueries({ queryKey: ["user-cart", userId] });
        } catch (error) {
            toast.error("Failed to clear cart.");
            console.error(error);
        }
    };

    if (isLoading) return <p className="text-center py-10">Loading cart...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Error loading cart.</p>;

    if (!cart || !cart.items?.length) {
        return (
            <div className="max-w-xl mx-auto text-center py-20 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-700">Your Cart is Empty</h2>
                <p className="text-gray-500">Start shopping and add items to your cart!</p>
                <Button onClick={() => navigate("/user/dashboard")}>Continue Shopping</Button>
                <Separator className="my-6" />
                <div className="flex justify-center flex-wrap gap-6 text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-6 h-6 text-emerald-600" />
                        <span>Secure Payments</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Truck className="w-6 h-6 text-emerald-600" />
                        <span>Cash On Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BadgeCheck className="w-6 h-6 text-emerald-600" />
                        <span>Assured Quality</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <RotateCcw className="w-6 h-6 text-emerald-600" />
                        <span>Easy Returns</span>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="max-w-6xl mx-auto py-8 flex flex-col lg:flex-row gap-8 px-4">
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
                <Card>
                    <CardHeader className="flex justify-between">
                        <CardTitle className="text-xl">Shopping Cart</CardTitle>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={handleClearCart}
                        >
                            Clear All
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {cart.items
                            ?.filter((item: any) => item?.product)
                            .map((item: any) => {
                                const isOnSale = item.product.onSale;
                                const itemTotal = isOnSale
                                    ? item.product.salePrice * item.quantity
                                    : item.product.price * item.quantity;

                                return (
                                    <div
                                        key={item.product._id}
                                        className="flex gap-4 justify-between items-center border rounded-lg p-4"
                                    >
                                        <img
                                            src={item.product.imageUrl?.[0]?.url}
                                            alt={item.product.title}
                                            className="w-20 h-20 rounded-md object-cover"
                                        />
                                        <div className="flex-1">
                                            <Link to={`/product/${item.product.slug}`}>
                                                <h3 className="text-base font-medium hover:underline">{item.product.title}</h3>
                                            </Link>
                                            <p className="text-xs text-muted-foreground">
                                                Brand: {item.product.brand} | Category: {item.product.category}
                                            </p>
                                            <p className="text-xs text-yellow-600">
                                                Only {item.product.stock} left in stock!
                                            </p>

                                            <div className="text-sm mt-1">
                                                {isOnSale ? (
                                                    <>
                                                        <span className="line-through text-red-500 mr-2">₹{item.product.price}</span>
                                                        <span className="text-green-600 font-semibold">
                                                            ₹{item.product.salePrice} × {item.quantity} = ₹{itemTotal}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-muted-foreground">
                                                        ₹{item.product.price} × {item.quantity} ={" "}
                                                        <span className="font-semibold">₹{itemTotal}</span>
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 mt-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleUpdateQuantity(item.product._id, item.quantity - 1)
                                                    }
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </Button>
                                                <span className="w-6 text-center">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleUpdateQuantity(item.product._id, item.quantity + 1)
                                                    }
                                                >
                                                    +
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleRemoveItem(item.product._id)}
                                                    className="ml-auto"
                                                >
                                                    <Trash2 className="w-5 h-5 text-destructive" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </CardContent>
                </Card>
            </div>

            {/*  Price Summary */}
            <div className="w-full  lg:w-[300px] lg:sticky  h-fit">
                <Card className="bg-muted/30 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">Price Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        {/*  Total Orders Row */}

                        <p className="mt-4">
                            Subtotal: ₹{subtotal}
                        </p>
                        <Button
                            className="w-full mt-4 bg-emerald-600 text-white"
                            onClick={() => navigate("/user/location")}
                        >
                            Proceed to Checkout
                        </Button>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
};

export default CartPage;
