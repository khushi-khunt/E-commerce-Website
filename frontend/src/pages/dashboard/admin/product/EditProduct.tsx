import { Input } from "@/theme/components/ui/input";
import { fetchProductById, UpdateProduct } from "@/services/productService";
import { Label } from "@/theme/components/ui/label";
import { Textarea } from "@/theme/components/ui/textarea";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/theme/components/ui/button";
import { Separator } from "@/theme/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/theme/components/ui/card";

interface Product {
  _id: string;
  title: string;
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
  metaDescription: string;
  variants: string[];
  specs: string[];
  weight: number;
  dimentions: {
    length: number;
    width: number;
    height: number;
  };
}

const EditProduct = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [rawVariantsText, setRawVariantsText] = useState("[]");
  const [rawSpecsText, setRawSpecsText] = useState("[]");

  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    salePrice: 0,
    onSale: false,
    saleEndsAt: "",
    description: "",
    stock: 0,
    category: "",
    brand: "",
    tags: [] as string[],
    rating: 0,
    numReviews: 0,
    isFeatured: false,
    metaTitle: "",
    metaDescription: "",
    variants: [] as string[],
    specs: [] as string[],
    weight: 0,
    dimensions: { length: 0, width: 0, height: 0 },
  });

  // New: for image uploading
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);

  useEffect(() => {
    // console.log("Running useEffect for fetching product");

    const loadProduct = async () => {
      try {
        if (!_id) return;
        const data = await fetchProductById(_id);
        // console.log("FetchProduct data is", data.product)
        setProduct(data);
        const variantsText = data.product.variants && data.product.variants.length > 0
          ? JSON.stringify(data.product.variants, null, 2)
          : "[]";
        const specsText = data.product.specs && data.product.specs.length > 0
          ? JSON.stringify(data.product.specs, null, 2)
          : "[]";

        setRawVariantsText(variantsText);
        setRawSpecsText(specsText);
        setFormData({
          title: data.product.title,
          price: data.product.price,
          description: data.product.description,
          stock: data.product.stock,
          category: data.product.category,
          brand: data.product.brand,
          tags: data.product.tags ?? [],
          salePrice: data.product.salePrice ?? 0,
          onSale: data.product.onSale,
          saleEndsAt: data.product.saleEndsAt,
          rating: data.product.rating,
          numReviews: data.product.numReviews,
          isFeatured: data.product.isFeatured,
          metaTitle: data.product.metaTitle,
          metaDescription: data.product.metaDescription,
          variants: data.product.variants ?? [],
          specs: data.product.specs ?? [],
          weight: data.product.weight,
          dimensions: data.product.dimensions ?? { length: 0, width: 0, height: 0 },
          imageUrl: data.product.imageUrl?.map((img: any) =>
            typeof img === "string" ? img : img.url
          ) ?? [],
        });
      } catch {
        toast.error("Failed to load product details");
      }
    };
    loadProduct();
  }, [_id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        ["price", "salePrice", "stock", "rating", "numReviews", "weight"].includes(name)
          ? Number(value)
          : value
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const tagsArray = value
      .split(",")                    // split by commas
      .map(tag => tag.trim())        // remove whitespace
      .filter(tag => tag.length > 0); // remove empty tags
    setFormData(prev => ({
      ...prev,
      tags: tagsArray,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!_id) return;

    try {
      const updatedFormData = new FormData();
      updatedFormData.append("title", formData.title);
      updatedFormData.append("price", String(formData.price));
      updatedFormData.append("description", formData.description);
      updatedFormData.append("stock", String(formData.stock));
      updatedFormData.append("category", formData.category);
      updatedFormData.append("brand", formData.brand);
      updatedFormData.append("tags", formData.tags.join(","));
      updatedFormData.append("salePrice", String(formData.salePrice));
      updatedFormData.append("onSale", String(formData.onSale));
      if (formData.saleEndsAt) {
        const [year, month, day] = formData.saleEndsAt.split("-");
        const formattedDate = `${day}-${month}-${year}`;
        updatedFormData.append("saleEndsAt", formattedDate);
      }
      updatedFormData.append("rating", String(formData.rating));
      updatedFormData.append("numReviews", String(formData.numReviews));
      updatedFormData.append("isFeatured", String(formData.isFeatured));
      updatedFormData.append("metaTitle", formData.metaTitle);
      updatedFormData.append("metaDescription", formData.metaDescription);
      updatedFormData.append("variants", JSON.stringify(formData.variants));
      updatedFormData.append("specs", JSON.stringify(formData.specs));
      updatedFormData.append("weight", String(formData.weight));
      updatedFormData.append("dimensions", JSON.stringify(formData.dimensions));


      if (imageFiles) {
        Array.from(imageFiles).forEach((file) => {
          updatedFormData.append("images", file);
        });
      }

      await UpdateProduct(_id, updatedFormData);
      toast.success("Product updated successfully!");
      navigate("/admin/productlist");
    } catch {
      toast.error("Failed to update product");
    }
  };

  if (!product) {
    return (
      <p className="text-center mt-10 text-muted-foreground">
        No product data...
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Edit Product
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Product title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="Product price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                placeholder="Product category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>

            {/* Brand */}
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                name="brand"
                placeholder="Product brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>

            {/* weight */}
            <div>
              <Label htmlFor="onSale">Weight</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>

            {/* Dimensions */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="length" className="py-1">Length</Label>
                <Input
                  id="length"
                  name="length"
                  type="number"
                  value={formData.dimensions?.length ?? 0}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dimensions: {
                        ...prev.dimensions,
                        length: Number(e.target.value),
                      },
                    }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="width" className="py-1">Width</Label>
                <Input
                  id="width"
                  name="width"
                  type="number"
                  value={formData.dimensions.width}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dimensions: {
                        ...prev.dimensions,
                        width: Number(e.target.value),
                      },
                    }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="height" className="py-1">Height</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  value={formData.dimensions.height}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dimensions: {
                        ...prev.dimensions,
                        height: Number(e.target.value),
                      },
                    }))
                  }
                />
              </div>
            </div>

            {/* Meta Title */}
            <div className="mt-4">
              <Label htmlFor="metaTitle" className="py-1">Meta Title</Label>
              <Input
                id="metaTitle"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
              />
            </div>

            {/* Stock */}
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                placeholder="Stock quantity"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>



            {/* Variants */}
            <div>
              <Label htmlFor="variants">Variants</Label>
              <Textarea
                id="variants"
                name="variants"
                placeholder='e.g. [{"size": "M", "color": "Red", "stock": 10, "price": 3500}]'
                value={rawVariantsText}
                onChange={(e) => {
                  const value = e.target.value;
                  setRawVariantsText(value);
                  try {
                    const parsed = JSON.parse(value);
                    setFormData((prev) => ({ ...prev, variants: parsed }));
                  } catch {
                    // Don't toast on every keypress, optionally debounce or toast only on blur
                  }
                }}
                onBlur={() => {
                  try {
                    const parsed = JSON.parse(rawVariantsText);
                    setFormData((prev) => ({ ...prev, variants: parsed }));
                  } catch {
                    toast.error("Invalid JSON format for variants.");
                  }
                }}
              />
            </div>


            {/* Specs */}
            <div>
              <Label htmlFor="specs">Specifications (JSON format)</Label>
              <Textarea
                id="specs"
                name="specs"
                placeholder='e.g. [{"key": "Battery", "value": "500mAh"}]'
                value={rawSpecsText}
                onChange={(e) => {
                  const value = e.target.value;
                  setRawSpecsText(value); // Let user type freely

                  try {
                    const parsed = JSON.parse(value);
                    setFormData((prev) => ({ ...prev, specs: parsed }));
                  } catch {
                    // Optional: skip toast here to avoid spam on each keystroke
                  }
                }}
                onBlur={() => {
                  try {
                    const parsed = JSON.parse(rawSpecsText);
                    setFormData((prev) => ({ ...prev, specs: parsed }));
                  } catch {
                    toast.error("Invalid JSON format for specs.");
                  }
                }}
              />
            </div>



            {/* Tags */}
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                name="tags"
                placeholder="e.g. electronics, laptop"
                value={formData.tags.join(", ")}
                onChange={handleTagsChange}
              />
            </div>

            {/* sale price */}
            <div>
              <Label htmlFor="salePrice" className="py-1">Sale Price</Label>
              <Input
                id="salePrice"
                name="salePrice"
                min={0}
                type="number"
                value={formData.salePrice}
                onChange={(e) => setFormData({ ...formData, salePrice: Number(e.target.value) })}
              />
            </div>

            {/*  Sale Ends At */}
            <div>
              <Label htmlFor="saleEndsAt" className="py-1">Sale Ends At</Label>
              <Input
                type="date"
                id="saleEndsAt"
                name="saleEndsAt"
                value={formData.saleEndsAt ? formData.saleEndsAt.slice(0, 10) : ""}
                onChange={(e) => setFormData({ ...formData, saleEndsAt: e.target.value })}
              />
            </div>

            {/* onsale + isfeatured */}
            <div className="flex gap-10 py-2">
              {/* On Sale */}
              <div className="flex items-center gap-2">
                <Label htmlFor="onSale">On Sale?</Label>
                <Input
                  id="onSale"
                  name="onSale"
                  type="checkbox"
                  className="size-5"
                  checked={formData.onSale}
                  onChange={(e) => setFormData({ ...formData, onSale: e.target.checked })}
                />
              </div>

              {/* Is Featured */}
              <div className="flex items-center gap-2">
                <Label htmlFor="isFeatured">Is Featured?</Label>
                <Input
                  id="isFeatured"
                  name="isFeatured"
                  type="checkbox"
                  className="size-5"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                />
              </div>
            </div>

            {/* meta description */}
            <div>
              <Label htmlFor="metaDescription" className="py-1">Meta Description</Label>
              <Textarea
                id="metaDescription"
                name="metaDescription"
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Product description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <Separator />

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="images">Update Images</Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to keep current images. You can also remove existing ones below.
              </p>
            </div>

            {/* Uploaded Image File Names with Remove Option */}
            {formData.imageUrl.length > 0 && (
              <div className="mt-4">
                <Label className="block mb-2">Current Uploaded Images</Label>
                <ul className="space-y-2">
                  {formData.imageUrl.map((url, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between bg-muted px-4 py-2 rounded-md text-sm text-muted-foreground"
                    >
                      <span>{typeof url === "string" ? url.split("/").pop() : "Invalid image URL"}</span>
                    </li>
                  ))}

                </ul>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" className="w-full">
                Update Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div >
  );
};

export default EditProduct;
