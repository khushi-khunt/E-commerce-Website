import { deleteProductById, fetchProductById } from "@/services/productService";
import { Badge } from "@/theme/components/ui/badge";
import { Button } from "@/theme/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/theme/components/ui/card";
import { Bookmark, Check, CopyPlusIcon, Gift, Headphones, PencilIcon, Trash, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

interface Product {
    _id: string;
    title: string;
    slug: string;
    price: number;
    salePrice: number;
    onSale: boolean;
    saleEndsAt: string;
    description: string;
    stock: number;
    category: string;
    brand: string;
    imageUrl: { url: string }[];
    tags: string[];
    rating: number;
    numReviews: number;
    isFeatured: boolean;
    metaTitle: string;
    weight: number;
    metaDescription: string;
    dimensions: { length: number; width: number; height: number };
    specs: { key: string; value: string }[];
    variants: { name: string; options: string[] }[];
    views: number;
    createdAt: string;
    updatedAt: string;
}

const ProductDetail: React.FC = () => {
    const { _id } = useParams<{ _id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>("");

    useEffect(() => {
        if (!_id) {
            setLoading(false);
            return;
        }
        const loadProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchProductById(_id);
                if (!data) {
                    setError("Product not found.");
                    setProduct(null);
                } else {
                    setProduct(data.product);
                }
            } catch {
                setError("Failed to fetch product details.");
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [_id]);

    useEffect(() => {
        if (product && product.imageUrl?.length > 0) {
            setSelectedImage(product.imageUrl[0].url);
        }
    }, [product]);

    const handleDelete = async () => {
        if (!product) return;
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await deleteProductById(product._id);
            toast.success("Product deleted successfully!");
            navigate("/admin/productlist");
        } catch {
            toast.error("Failed to delete product.");
        }
    };

    if (loading) return <p className="text-center mt-10 text-lg font-medium text-muted-foreground px-4">Loading product details...</p>;
    if (error) return <p className="text-center mt-10 text-lg font-medium text-red-600 px-4">{error}</p>;
    if (!product) return <p className="text-center mt-10 text-lg font-medium text-muted-foreground px-4">No Product Found</p>;

    return (
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-gray-600 font-semibold text-lg sm:text-xl">PRODUCT DETAILS</h1>
            </div>

            {/* Main Product Card */}
            <Card className="bg-transparent shadow-none border-none p-0">
                <CardContent className="p-0">
                    {/* Mobile Layout (< 768px) */}
                    <div className="md:hidden space-y-4">
                        {/* Image Section - Mobile */}
                        <div className="bg-white p-4 rounded-xl space-y-4">
                            <div className="w-full h-[250px] sm:h-[300px] rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center">
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Selected Product" className="w-full h-full object-contain" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image Available</div>
                                )}
                            </div>

                            {/* Thumbnails - Mobile */}
                            {product.imageUrl.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    {product.imageUrl.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedImage(img.url)}
                                            className={`w-16 h-16 border rounded-md p-1 flex-shrink-0 ${selectedImage === img.url ? "ring-2 ring-primary" : ""}`}
                                        >
                                            <img src={img.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover rounded" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details Section - Mobile */}
                        <div className="bg-white p-4 rounded-xl space-y-4">
                            <CardHeader className="px-0 pb-2">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    {product.isFeatured ? (
                                        <Badge className="bg-emerald-600 font-semibold rounded-[4px] text-xs">New Arrival</Badge>
                                    ) : (
                                        <Badge className="bg-rose-100 text-rose-700 text-xs">Not Featured</Badge>
                                    )}
                                </div>
                                <CardTitle className="text-lg sm:text-xl font-normal leading-tight">{product.title}</CardTitle>
                            </CardHeader>

                            {/* Rating - Mobile */}
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <span className={product.numReviews > 0 ? "text-yellow-400" : "text-gray-400"}>★★★★★</span>
                                <span>({product.numReviews > 0 ? "55 Reviews" : "No Reviews"})</span>
                            </div>

                            {/* Price - Mobile */}
                            <div className="space-y-1">
                                {product.onSale && product.salePrice < product.price ? (
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-xl sm:text-2xl font-semibold text-black">₹{product.salePrice.toFixed(2)}</span>
                                        <span className="line-through text-gray-500">₹{product.price.toFixed(2)}</span>
                                        <span className="text-sm text-emerald-600 font-medium">
                                            ({Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF)
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-xl sm:text-2xl font-semibold text-emerald-600">₹{product.price.toFixed(2)}</span>
                                )}
                            </div>

                            {/* Stock & Features - Mobile */}
                            <div className="space-y-2">
                                <div className="flex flex-wrap gap-2">
                                    {product.stock > 0 ? (
                                        <Badge className="bg-white text-green-800 border-green-200"><Check className="h-3 w-3 mr-1" /> In Stock ({product.stock})</Badge>
                                    ) : (
                                        <Badge className="bg-white text-red-600 border-red-200">Out of Stock</Badge>
                                    )}
                                    <Badge className="bg-white text-green-800 border-green-200"><Check className="h-3 w-3 mr-1" /> Free Delivery</Badge>
                                </div>
                            </div>

                            {/* Action Buttons - Mobile */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <Button className="bg-gray-200 text-black hover:bg-gray-700 hover:text-white flex-1" onClick={() => navigate(`/admin/productlist/${product._id}/edit`)}>
                                    <PencilIcon className="h-4 w-4 mr-2" /> Edit Product
                                </Button>
                                <Button className="bg-red-200 text-black hover:bg-red-600 hover:text-white flex-1" onClick={handleDelete}>
                                    <Trash className="h-4 w-4 mr-2" /> Delete Product
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop/Tablet Layout (>= 768px) */}
                    <div className="hidden md:grid md:grid-cols-5 lg:grid-cols-3 gap-4 lg:gap-6">
                        {/* Left - Images */}
                        <div className="md:col-span-2 lg:col-span-1">
                            <div className="bg-white p-4 rounded-xl space-y-4 sticky top-4">
                                <div className="w-full h-[300px] lg:h-[400px] rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center">
                                    {selectedImage ? (
                                        <img src={selectedImage} alt="Selected Product" className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image Available</div>
                                    )}
                                </div>

                                {/* Thumbnails */}
                                {product.imageUrl.length > 1 && (
                                    <div className="flex gap-2 overflow-x-auto pb-1">
                                        {product.imageUrl.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedImage(img.url)}
                                                className={`w-20 h-20 border rounded-md p-1 flex-shrink-0 ${selectedImage === img.url ? "ring-2 ring-primary" : ""}`}
                                            >
                                                <img src={img.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover rounded" />
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Action Buttons - Desktop */}
                                <CardFooter className="flex flex-col gap-3 p-0 pt-4">
                                    <Button className="bg-gray-200 text-black hover:bg-gray-700 hover:text-white w-full" onClick={() => navigate(`/admin/productlist/${product._id}/edit`)}>
                                        <PencilIcon className="h-4 w-4 mr-2" /> Edit Product
                                    </Button>
                                    <Button className="bg-red-200 text-black hover:bg-red-600 hover:text-white w-full" onClick={handleDelete}>
                                        <Trash className="h-4 w-4 mr-2" /> Delete Product
                                    </Button>
                                </CardFooter>
                            </div>
                        </div>

                        {/* Right - Details */}
                        <div className="md:col-span-3 lg:col-span-2 space-y-4">
                            <div className="bg-white p-4 lg:p-6 rounded-xl">
                                <CardHeader className="px-0 pb-4">
                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        {product.isFeatured ? (
                                            <Badge className="bg-emerald-600 font-semibold rounded-[4px]">New Arrival</Badge>
                                        ) : (
                                            <Badge className="bg-rose-100 text-rose-700">Not Featured</Badge>
                                        )}
                                    </div>
                                    <CardTitle className="text-xl lg:text-2xl font-normal leading-tight">{product.title}</CardTitle>
                                </CardHeader>

                                {/* Rating */}
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                    <span className={product.numReviews > 0 ? "text-yellow-400" : "text-gray-400"}>★★★★★</span>
                                    <span>({product.numReviews > 0 ? "55 Reviews" : "No Reviews"})</span>
                                </div>

                                {/* Price */}
                                <div className="mb-4">
                                    {product.onSale && product.salePrice < product.price ? (
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="text-2xl lg:text-3xl font-semibold text-black">₹{product.salePrice.toFixed(2)}</span>
                                            <span className="line-through text-gray-500 text-lg">₹{product.price.toFixed(2)}</span>
                                            <span className="text-sm text-emerald-600 font-medium">
                                                ({Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF)
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-2xl lg:text-3xl font-semibold text-emerald-600">₹{product.price.toFixed(2)}</span>
                                    )}
                                </div>

                                {/* Stock & Features */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex flex-wrap gap-2">
                                        {product.stock > 0 ? (
                                            <Badge className="bg-white text-green-800 border-green-200"><Check className="h-4 w-4 mr-1" /> In Stock ({product.stock})</Badge>
                                        ) : (
                                            <Badge className="bg-white text-red-600 border-red-200">Out of Stock</Badge>
                                        )}
                                        <Badge className="bg-white text-green-800 border-green-200"><Check className="h-4 w-4 mr-1" /> Free Delivery</Badge>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-3">
                                    <h3 className="text-lg font-medium text-gray-800">Description:</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{product.description}</p>
                                </div>

                                {/* Offers */}
                                <div className="space-y-3 mt-6">
                                    <h3 className="text-lg font-medium text-gray-800">Available Offers:</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-3">
                                            <Bookmark className="text-green-400 h-5 w-5 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-muted-foreground">Bank Offer 10% instant discount on Bank Debit Cards, up to $30 on orders of $50 and above</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Bookmark className="text-green-400 h-5 w-5 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-muted-foreground">Grab our exclusive offer now and save 20% on your next purchase!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Description for Mobile (separate section) */}
            <div className="md:hidden bg-white p-4 rounded-xl space-y-3">
                <h3 className="text-lg font-medium text-gray-800">Description:</h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{product.description}</p>
                
                <h3 className="text-lg font-medium text-gray-800 pt-2">Available Offers:</h3>
                <div className="space-y-2">
                    <div className="flex items-start gap-3">
                        <Bookmark className="text-green-400 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">Bank Offer 10% instant discount on Bank Debit Cards, up to $30 on orders of $50 and above</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <Bookmark className="text-green-400 h-5 w-5 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">Grab our exclusive offer now and save 20% on your next purchase!</p>
                    </div>
                </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
                    {[
                        { icon: <Truck className="h-6 w-6" />, title: "Free shipping for all orders over $200", subtitle: "Only in this week" },
                        { icon: <Gift className="h-6 w-6" />, title: "Free gift wrapping service", subtitle: "With 100 letters custom" },
                        { icon: <CopyPlusIcon className="h-6 w-6" />, title: "Special discounts for customers", subtitle: "Coupons up to $100" },
                        { icon: <Headphones className="h-6 w-6" />, title: "Expert Customer Service", subtitle: "24/7 hours" },
                    ].map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-start">
                            <div className="text-orange-500 bg-gray-100 p-3 rounded-lg flex-shrink-0">
                                {item.icon}
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-semibold text-sm lg:text-base text-black leading-tight">{item.title}</h4>
                                <p className="text-gray-500 text-xs lg:text-sm">{item.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Details */}
            <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm space-y-6">
                {/* Tags */}
                {product?.tags?.length > 0 && (
                    <div>
                        <h3 className="font-medium text-lg mb-3">Tags:</h3>
                        <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag, index) => (
                                <Badge key={index} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Specs */}
                {product.specs?.length > 0 && (
                    <div>
                        <h3 className="font-medium text-lg mb-3">Specifications:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {product.specs.map((spec, idx) => (
                                <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                                    <span className="text-sm text-muted-foreground">
                                        <strong className="text-gray-800">{spec.key}:</strong> {spec.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Meta & Info Grid */}
                <div>
                    <h3 className="font-medium text-lg mb-3">Product Information:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div className="space-y-2">
                            <p className="text-muted-foreground"><strong className="text-gray-800">Meta Title:</strong></p>
                            <p className="bg-gray-50 p-2 rounded text-xs break-words">{product.metaTitle}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-muted-foreground"><strong className="text-gray-800">Meta Description:</strong></p>
                            <p className="bg-gray-50 p-2 rounded text-xs break-words">{product.metaDescription}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-muted-foreground"><strong className="text-gray-800">Sale Ends At:</strong></p>
                            <p className="bg-gray-50 p-2 rounded text-xs">{product.saleEndsAt ? new Date(product.saleEndsAt).toLocaleDateString() : "N/A"}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-muted-foreground"><strong className="text-gray-800">Views:</strong></p>
                            <p className="bg-gray-50 p-2 rounded text-xs">{product.views}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-muted-foreground"><strong className="text-gray-800">Dimensions:</strong></p>
                            <p className="bg-gray-50 p-2 rounded text-xs">{product.dimensions?.length} x {product.dimensions?.width} x {product.dimensions?.height} cm</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-muted-foreground"><strong className="text-gray-800">Weight:</strong></p>
                            <p className="bg-gray-50 p-2 rounded text-xs">{product.weight ? `${product.weight} kg` : "N/A"}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-muted-foreground"><strong className="text-gray-800">Brand:</strong></p>
                            <Badge className="bg-blue-100 text-blue-800">{product.brand}</Badge>
                        </div>
                        <div className="space-y-2">
                            <p className="text-muted-foreground"><strong className="text-gray-800">Category:</strong></p>
                            <Badge className="bg-purple-100 text-purple-800">{product.category}</Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;