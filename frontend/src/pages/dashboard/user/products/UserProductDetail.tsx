import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/theme/components/ui/dialog";
import { useState } from "react";
import { ProductSlug } from "@/services/productService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/theme/components/ui/card";
import { Badge } from "@/theme/components/ui/badge";
import { useAddToCart, useAddToWishlist } from "@/hooks/Mutation";
import { Button } from "@/theme/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/theme/components/ui/tabs";
import { Star, Heart, ShoppingCart, } from "lucide-react";
import { toast } from "sonner";

export default function UserProductDetail() {
  const { slug } = useParams();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { mutate: addToCart, isPending } = useAddToCart();
  const { mutate: addToWishlist } = useAddToWishlist();

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => ProductSlug(slug!),
    enabled: !!slug,
  });



  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">Failed to load product details</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist</p>
        </div>
      </div>
    );
  }

  const currentImage = product.imageUrl?.[selectedImageIndex] || product.imageUrl?.[0];

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left Side - Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <Card className="overflow-hidden border-0 shadow-lg py-0">
              <div className="bg-white flex items-center justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <img
                      src={currentImage?.url || "/fallback.jpg"}
                      alt={product.title}
                      className="w-full h-[350px] object-contain cursor-zoom-in hover:scale-105 transition-transform duration-300"
                      onClick={() => setPreviewImage(currentImage?.url)}
                    />
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl border-0">
                    <img
                      src={previewImage || currentImage?.url}
                      alt="Product preview"
                      className="w-full max-h-[90vh] object-contain rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            {/* Thumbnail Gallery */}
            {product.imageUrl?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.imageUrl.map((img: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${index === selectedImageIndex
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <img
                      src={img.url}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Product Information */}
          <div className="space-y-8">

            {/* Product Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    {product.title}
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                            }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        ({product.rating}) • {product.views} views
                      </span>
                    </div>
                  </div>
                </div>

                {product.isFeatured && (
                  <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    Featured
                  </Badge>
                )}
              </div>

              <p className=" text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Section */}
            <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50 py-0">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ₹{product.onSale ? product.salePrice : product.price}
                    </span>
                    {product.onSale && (
                      <>
                        <span className="text-2xl text-gray-400 line-through">
                          ₹{product.price}
                        </span>
                        <Badge variant="destructive" className="text-lg px-3 py-1">
                          -{product.discountPercent}% OFF
                        </Badge>
                      </>
                    )}
                  </div>

                  {product.onSale && (
                    <p className="text-sm text-red-600 font-medium">
                      🔥 Sale ends: {new Date(product.saleEndsAt).toLocaleDateString()}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-sm">
                    <span className={`px-3 py-1 rounded-full font-medium ${product.stock > 10
                      ? 'bg-green-100 text-green-800'
                      : product.stock > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                      }`}>
                      {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                className="w-40 text-sm font-semibold"
                onClick={() => addToCart({ product, quantity: 1 })}
                disabled={isPending || product.stock === 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isPending ? "Adding..." : "Add to Cart"}
              </Button>

              <Button
                variant="outline"
                className="w-10"
                onClick={() =>
                  addToWishlist(
                    { productId: product._id },
                    {
                      onSuccess: () => toast.success("Added to wishlist!"),
                      onError: (err) => {
                        console.error(err);
                        toast.error("Already in wishlist or error occurred.");
                      },
                    }
                  )
                }
                disabled={isPending}
              >
                <Heart className={`w-5 h-5 ${isPending ? 'animate-pulse' : ''}`} />
              </Button>
            </div>

            {/* Product Details Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="variants">Variants</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4 mt-6">
                <Card className="py-2">
                  <CardContent>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Product Information</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Brand</span>
                            <span className="font-medium">{product.brand}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Category</span>
                            <span className="font-medium">{product.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Weight</span>
                            <span className="font-medium">{product.weight} kg</span>
                          </div>
                        </div>
                      </div>

                      {product.dimensions && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-gray-900">Dimensions</h4>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Length</span>
                              <span className="font-medium">{product.dimensions.length} cm</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Width</span>
                              <span className="font-medium">{product.dimensions.width} cm</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Height</span>
                              <span className="font-medium">{product.dimensions.height} cm</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {product.tags?.length > 0 && (
                      <div className="mt-6  border-t">
                        <h4 className="font-semibold text-gray-900 mb-3">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-sm">
                              {tag.replace(/"/g, "")}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specs" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    {product.specs?.length > 0 ? (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900">Technical Specifications</h4>
                        <div className="space-y-3">
                          {product.specs.map((spec: any, idx: number) => (
                            <div key={idx} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                              <span className="text-gray-600 font-medium">{spec.key}</span>
                              <span className="text-gray-900">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No specifications available
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="variants" className="mt-6">
                <div className="space-y-4">
                  {product.variants?.length > 0 ? (
                    <div className="grid gap-4">
                      {product.variants.map((variant: any, idx: number) => (
                        <Card key={idx} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div className="space-y-1">
                                <p className="font-medium">{variant.size} • {variant.color}</p>
                                <p className="text-sm text-gray-600">Stock: {variant.stock}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-center py-8 text-gray-500">
                          No variants available
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* SEO Metadata (Hidden section for admin) */}
            {(product.metaTitle || product.metaDescription) && (
              <Card className="border-dashed py-2">
                <CardHeader>
                  <CardTitle className="text-sm text-gray-500">SEO Information</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 text-sm">
                    {product.metaTitle && (
                      <div>
                        <span className="text-gray-600">Meta Title:</span>
                        <p className="font-medium">{product.metaTitle}</p>
                      </div>
                    )}
                    {product.metaDescription && (
                      <div>
                        <span className="text-gray-600">Meta Description:</span>
                        <p className="font-medium">{product.metaDescription}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}