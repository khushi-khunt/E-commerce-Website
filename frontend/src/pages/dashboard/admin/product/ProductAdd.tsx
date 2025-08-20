import { ProductForm } from "@/components/Admin/form/ProductForm";

const ProductAdd = () => {
  return (
    <div className=" mx-auto max-w-6xl px-6 py-10 bg- rounded-xl shadow border">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-foreground">Add a New Product</h1>
        <p className="text-muted-foreground text-base mt-2">
          Fill in product information to publish it to your catalog.
        </p>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-inner border">
        <ProductForm />
      </div>
    </div>
  );
};

export default ProductAdd;
