import { Formik, Form, FieldArray } from "formik";
import { z } from "zod";
import { useAddProduct } from "@/hooks/Mutation";
import { productSchema } from "@/validations/productSchemas";
import zodToFormikValidate from "@/validations/zodSchema";
import { toast } from "sonner";

// shadcn/ui components
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/theme/components/ui/card";
import { Input } from "@/theme/components/ui/input";
import { Textarea } from "@/theme/components/ui/textarea";
import { Button } from "@/theme/components/ui/button";
import { Label } from "@/theme/components/ui/label";
import { Separator } from "@/theme/components/ui/separator";

type ProductFormValues = z.infer<typeof productSchema>;

const initialValues: ProductFormValues = {
  title: "",
  slug: "",
  price: 0,
  salePercent: 0,
  onSale: false,
  saleEndsAt: "",
  stock: 0,
  description: "",
  category: "",
  brand: "",
  tags: [],
  rating: 0,
  numReviews: 0,
  isFeatured: false,
  metaTitle: "",
  metaDescription: "",
  variants: [],
  specs: [],
  weight: 0,
  dimensions: { length: 0, width: 0, height: 0 },
  imageUrl: [],
};

export const ProductForm = () => {
  const { mutate, isPending } = useAddProduct();

  const handleSubmit = (
    values: ProductFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "imageUrl" && Array.isArray(value)) {
        value.forEach((file: File) => formData.append("images", file));
      } else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value ?? ""));
      }
    });

    mutate(formData, {
      onSuccess: () => {
        toast.success("Product added successfully");
        resetForm();
      },
      onError: () => {
        toast.error("Failed to add product. Please try again.");
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={zodToFormikValidate(productSchema)}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Card className="max-w-5xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Add New Product</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left */}
                <div className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input value={values.title} onChange={e => setFieldValue("title", e.target.value)} />
                  </div>
                  <div>
                    <Label>Price</Label>
                    <Input type="number" value={values.price} onChange={e => setFieldValue("price", Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Input value={values.category} onChange={e => setFieldValue("category", e.target.value)} />
                  </div>
                  <div>
                    <Label>Brand</Label>
                    <Input value={values.brand} onChange={e => setFieldValue("brand", e.target.value)} />
                  </div>
                  <div>
                    <Label>Weight</Label>
                    <Input type="number" value={values.weight} onChange={e => setFieldValue("weight", Number(e.target.value))} />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label>Length</Label>
                      <Input type="number" value={values.dimensions?.length ?? 0} onChange={e => setFieldValue("dimensions.length", Number(e.target.value))} />
                    </div>
                    <div>
                      <Label>Width</Label>
                      <Input type="number" value={values.dimensions?.width ?? 0} onChange={e => setFieldValue("dimensions.width", Number(e.target.value))} />
                    </div>
                    <div>
                      <Label>Height</Label>
                      <Input type="number" value={values.dimensions?.height ?? 0} onChange={e => setFieldValue("dimensions.height", Number(e.target.value))} />
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="space-y-4">
                  <div>
                    <Label>Stock</Label>
                    <Input type="number" value={values.stock} onChange={e => setFieldValue("stock", Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Upload Images</Label>
                    <Input type="file" multiple accept="image/*" onChange={e => {
                      if (e.currentTarget.files) {
                        setFieldValue("imageUrl", Array.from(e.currentTarget.files));
                      }
                    }} />
                  </div>
                  <div>
                    <Label>Tags</Label>
                    <Input value={(values.tags ?? []).join(", ")} onChange={e => setFieldValue("tags", e.target.value.split(",").map(t => t.trim()))} />
                  </div>
                  <div>
                    <Label>Sale Percentage</Label>
                    <Input type="number" value={values.salePercent} onChange={e => setFieldValue("salePercent", Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>Sale Ends At</Label>
                    <Input type="date" value={values.saleEndsAt} onChange={e => setFieldValue("saleEndsAt", e.target.value)} />
                  </div>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={values.onSale} onChange={e => setFieldValue("onSale", e.target.checked)} />
                      On Sale
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={values.isFeatured} onChange={e => setFieldValue("isFeatured", e.target.checked)} />
                      Featured
                    </label>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Variants & Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FieldArray name="variants">
                  {({ push, remove }) => (
                    <div className="space-y-2">
                      <Label>Variants</Label>
                      {values.variants.map((v, i) => (
                        <div key={i} className="grid grid-cols-5 gap-2 items-center">
                          <Input placeholder="Size" value={v.size} onChange={e => setFieldValue(`variants.${i}.size`, e.target.value)} />
                          <Input placeholder="Color" value={v.color} onChange={e => setFieldValue(`variants.${i}.color`, e.target.value)} />
                          <Input type="number" placeholder="Price" value={v.price} onChange={e => setFieldValue(`variants.${i}.price`, Number(e.target.value))} />
                          <Input type="number" placeholder="Stock" value={v.stock} onChange={e => setFieldValue(`variants.${i}.stock`, Number(e.target.value))} />
                          <Button variant="destructive" size="sm" type="button" onClick={() => remove(i)}>Remove</Button>
                        </div>
                      ))}
                      <Button type="button" variant="secondary" onClick={() => push({ size: "", color: "", price: 0, stock: 0 })}>
                        + Add Variant
                      </Button>
                    </div>
                  )}
                </FieldArray>

                <FieldArray name="specs">
                  {({ push, remove }) => (
                    <div className="space-y-2">
                      <Label>Specifications</Label>
                      {values.specs.map((s, i) => (
                        <div key={i} className="grid grid-cols-3 gap-2 items-center">
                          <Input placeholder="Key" value={s.key} onChange={e => setFieldValue(`specs.${i}.key`, e.target.value)} />
                          <Input placeholder="Value" value={s.value} onChange={e => setFieldValue(`specs.${i}.value`, e.target.value)} />
                          <Button variant="destructive" size="sm" type="button" onClick={() => remove(i)}>Remove</Button>
                        </div>
                      ))}
                      <Button type="button" variant="secondary" onClick={() => push({ key: "", value: "" })}>
                        + Add Spec
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </div>

              <Separator />

              {/* Meta + Description */}
              <div>
                <Label>Meta Title</Label>
                <Input value={values.metaTitle} onChange={e => setFieldValue("metaTitle", e.target.value)} />
              </div>
              <div>
                <Label>Meta Description</Label>
                <Textarea value={values.metaDescription} onChange={e => setFieldValue("metaDescription", e.target.value)} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={values.description} onChange={e => setFieldValue("description", e.target.value)} />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Add Product"}
              </Button>
            </CardFooter>
          </Card>
        </Form>
      )}
    </Formik>
  );
};
