import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/theme/components/ui/card";
import { Badge } from "@/theme/components/ui/badge";
import { Button } from "@/theme/components/ui/button";
import { Loader2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNewArrivals } from "@/hooks/Mutation";

const NewArrivals = () => {
    const { data: products = [], isLoading, isError } = useNewArrivals();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <p className="text-center text-red-500">Failed to load new arrivals.</p>
        );
    }

    return (
        <div className="px-4 py-6 space-y-6">
            <h2 className="text-2xl font-bold text-center text-[rgb(145,180,171)]">
                🛍️ New Arrivals
            </h2>

            <div className="flex flex-wrap justify-center gap-6">
                {products.map((product: any) => (
                    <Card
                        key={product._id}
                        className="w-[260px] bg-gradient-to-br from-blue-50 via-white to-blue-100 border-none rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all"
                    >
                        <CardHeader className="p-0">
                            <div className="h-36 bg-white rounded-t-md overflow-hidden flex items-center justify-center">
                                <img
                                    src={product.imageUrl?.[0]?.url || "/fallback.jpg"}
                                    alt={product.title}
                                    className="object-contain h-full w-full p-2"
                                />
                            </div>
                        </CardHeader>

                        <CardContent className="p-3 space-y-1">
                            <CardTitle className="text-md font-semibold text-[rgb(59,78,80)] line-clamp-1">
                                {product.title}
                            </CardTitle>

                            <p className="text-xs text-gray-500 line-clamp-2">
                                {product.description}
                            </p>

                            <div className="flex flex-wrap gap-1 mt-1">
                                {product.tags?.map((tag: string) => (
                                    <Badge
                                        key={tag}
                                        className="bg-blue-100 text-gray-800 border-blue-300 px-2 py-0.5 text-[10px]"
                                    >
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <p className="text-sm font-bold text-[rgb(59,78,80)]">₹{product.price}</p>
                                <span className="flex items-center gap-1 text-yellow-500 text-xs">
                                    <Star size={14} className="fill-yellow-400" />
                                    {product.rating}
                                </span>
                            </div>

                            <p className="text-[10px] text-gray-400">Stock: {product.stock}</p>
                        </CardContent>

                        <CardFooter className="p-3 pt-0">
                            <Button
                                className="w-full bg-[rgb(59,78,80)] text-white hover:bg-[rgb(94,120,133)] text-sm py-1.5"
                                onClick={() => navigate(`/product/${product.slug}`)}
                            >
                                View
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default NewArrivals;
