import { deleteProductById, fetchProductById } from "@/services/productService";
import { Badge } from "@/theme/components/ui/badge";
import { Button } from "@/theme/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/theme/components/ui/card";
import { Separator } from "@/theme/components/ui/separator";
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
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
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

    //for image
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
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete product.");
        }
    };

    if (loading) {
        return (
            <p className="text-center mt-10 text-lg font-medium text-muted-foreground">
                Loading product details...
            </p>
        );
    }
    if (error) {
        return (
            <p className="text-center mt-10 text-lg font-medium text-red-600">{error}</p>
        );
    }
    if (!product) {
        return (
            <p className="text-center mt-10 text-lg font-medium text-muted-foreground">
                No Product Found
            </p>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl md:text-3xl">{product.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row gap-6 md:gap-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left Column - Image and Basic Info below */}
                        <div className="w-full md:w-1/2 space-y-4">
                            {/* Image Section */}
                            <div className="rounded-lg overflow-hidden border shadow">
                                {selectedImage ? (
                                    <img
                                        src={selectedImage}
                                        alt="Selected Product"
                                        className="w-full h-[350px] object-contain"
                                    />
                                ) : (
                                    <div className="w-full h-[350px] flex items-center justify-center text-gray-400">
                                        No Image Available
                                    </div>
                                )}
                            </div>
                            {/* Image Thumbnails */}
                            <div className="flex gap-2 overflow-x-auto">
                                {product.imageUrl.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img.url)}
                                        className={`w-20 h-20 border rounded-md p-1 ${selectedImage === img.url ? "ring-2 ring-primary" : ""}`}
                                    >
                                        <img src={img.url} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                            {/* Basic Info Below Image */}
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p className="text-lg font-semibold text-gray-900">
                                    Price: <span className="text-emerald-600">₹{product.price.toFixed(2)}</span>
                                </p>
                                <p>
                                    Sale Price:{" "}
                                    {product.onSale ? (
                                        <span className="text-orange-500 font-semibold">₹{product.salePrice}</span>
                                    ) : (
                                        <span className="text-gray-400">Not on Sale</span>
                                    )}
                                </p>
                                <p>
                                    Stock:{" "}
                                    {product.stock > 0 ? (
                                        <Badge className="bg-emerald-100 text-emerald-800">In Stock ({product.stock})</Badge>
                                    ) : (
                                        <Badge className="bg-rose-100 text-rose-700">Out of Stock</Badge>
                                    )}
                                </p>
                                <p>Brand: <Badge variant="outline">{product.brand}</Badge></p>
                                <p>Category: <Badge>{product.category}</Badge></p>
                            </div>
                        </div>
                        {/* Right Column - Detailed Info */}
                        <div className="flex-1 space-y-4">
                            <div className="space-y-1 text-sm text-muted-foreground">
                                <p><strong>Featured:</strong> {product.isFeatured ? "Yes" : "No"}</p>
                                <p><strong>Sale Ends At:</strong> {product.saleEndsAt ? new Date(product.saleEndsAt).toLocaleDateString() : "N/A"}</p>
                                <p><strong>Rating:</strong> {product.rating} ★ ({product.numReviews} reviews)</p>
                                <p><strong>Views:</strong> {product.views}</p>
                                <p><strong>Dimensions:</strong> {product.dimensions?.length} x {product.dimensions?.width} x {product.dimensions?.height} cm</p>
                                <p><strong>Weight:</strong> {product.weight ? `${product.weight} kg` : "N/A"}</p>
                            </div>
                            {product.tags?.length > 0 && (
                                <div>
                                    <p className="font-medium mb-1">Tags:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {product.variants?.length > 0 && (
                                <div>
                                    <p className="font-medium mb-1">Variants:</p>
                                    <ul className="ml-4 list-disc text-sm text-muted-foreground">
                                        {product.variants.map((variant, idx) => (
                                            <li key={idx}>
                                                <strong>Size:</strong> {variant.size}, <strong>Color:</strong> {variant.color}, <strong>Stock:</strong> {variant.stock}, <strong>Price:</strong> ₹{variant.price}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {product.specs?.length > 0 && (
                                <div>
                                    <p className="font-medium mb-1">Specifications:</p>
                                    <ul className="ml-4 list-disc text-sm text-muted-foreground">
                                        {product.specs.map((spec, idx) => (
                                            <li key={idx}>{spec.key}: {spec.value}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="text-sm text-muted-foreground space-y-1">
                                <p><strong>Meta Title:</strong> {product.metaTitle}</p>
                                <p><strong>Meta Description:</strong> {product.metaDescription}</p>
                            </div>
                            <Separator />
                            <p className="text-sm whitespace-pre-wrap text-muted-foreground">{product.description}</p>
                            {/* Action Buttons */}
                            <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 p-0 pt-4">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigate(`/admin/productlist/${product._id}/edit`)}
                                >
                                    Edit Product
                                </Button>
                                <Button variant="destructive" size="sm" onClick={handleDelete}>
                                    Delete Product
                                </Button>
                            </CardFooter>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
};


export default ProductDetail;
