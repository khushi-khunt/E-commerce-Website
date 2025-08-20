import { useMoveToCart, useRemoveFromWishlist, useViewWishlist } from "@/hooks/Mutation";
import { Button } from "@/theme/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/theme/components/ui/card";
import { toast } from "sonner";

export default function WishlistPage() {
  const { data: wishlist = [], isLoading } = useViewWishlist();
  // console.log(wishlist)
  const removeFromWishlist = useRemoveFromWishlist();
  const moveToCart = useMoveToCart();

  if (isLoading) return <div>Loading wishlist...</div>;

  if (wishlist.length === 0) {
    return <div className="text-center text-gray-500">Your wishlist is empty.</div>;
  }

  return (
    <div className="p-6  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlist.map((item: any) => (
        <Card key={item.product._id}>
          <CardHeader>
            <CardTitle>{item.product.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={item.product.imageUrl?.[0]?.url || "/fallback.jpg"}
              alt={item.product.title}
              className="h-32 w-full object-contain"
            />
            <p className="text-gray-700 mb-2">₹{item.product.price}</p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  removeFromWishlist.mutate(item.product._id, {
                    onSuccess: () => toast.success("Removed from wishlist"),
                    onError: () => toast.error("Failed to remove"),
                  })
                }
              >
                Remove
              </Button>

              <Button
                onClick={() =>
                  moveToCart.mutate(item.product._id, {
                    onSuccess: () => toast.success("Moved to cart"),
                    onError: () => toast.error("Failed to move to cart"),
                  })
                }
              >
                Move to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
