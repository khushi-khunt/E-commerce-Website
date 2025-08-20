import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/theme/components/ui/card";
import { Badge } from "@/theme/components/ui/badge";
import { Button } from "@/theme/components/ui/button";
import { usePopularProducts } from "@/hooks/Mutation";
import { Loader2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PopularProducts() {
  const { data: products = [], isLoading, isError } = usePopularProducts();
  // console.log(products)
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center p-10">
        Error loading popular products
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-10">
        No popular products found.
      </div>
    );
  }

  return (
    <section className="p-6">
      <h2 className="text-3xl font-bold text-center text-[rgb(145,180,171)] mb-8">🌟 Trending Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <Card
            key={product._id}
            className="group flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100 border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] py-4"
          >
            <CardHeader className="p-0">
              <div className="h-48 w-full bg-white rounded-t-md overflow-hidden">
                <img
                  src={product.imageUrl?.[0]?.url || "/fallback.jpg"}
                  alt={product.title}
                  className="h-36 w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-1 p-4 flex-grow">
              <CardTitle className="text-base text-[rgb(59,78,80)] font-semibold">
                {product.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 line-clamp-1">
                {product.description}
              </CardDescription>

              <div className="flex flex-wrap gap-2">
                {product.tags?.map((tag: string) => (
                  <Badge
                    key={tag}
                    className="bg-blue-100 text-gray-800 border-blue-300 px-1.5 py-0.5 text-[10px]"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-bold text-[rgb(59,78,80)]">
                  ₹{product.price}
                </p>
                <span className="flex items-center gap-1 text-sm text-yellow-500 font-medium">
                  <Star size={14} className="fill-yellow-400 text-yellow-500" />
                  {product.rating}
                </span>
              </div>

              <p className="text-xs text-muted-foreground">In Stock: {product.stock}</p>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button
                className="w-full bg-[rgb(59,78,80)] hover:bg-[rgb(94,120,133)] text-white font-medium transition-all"
                onClick={() => navigate(`/product/${product.slug}`)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
