import { deleteProductById, fetchProducts } from "@/services/productService";
import { Badge } from "@/theme/components/ui/badge";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { SquarePen, Trash2Icon } from "lucide-react";

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  brand: string;
  imageUrl: { url: string }[];
  tags: string[];
  onSale: boolean;
  isFeatured: boolean;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Delete handler
  const handleDelete = async (_id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProductById(_id);
      toast.success("Product deleted successfully!");
      setProducts((prev) => prev.filter((p) => p._id !== _id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  // Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(Array.isArray(data.products) ? data.products : []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-4xl font-extrabold mb-6 border-b border-gray-200 pb-3">
        All Products
      </h1>

      {loading ? (
        <div className="flex justify-center mt-6">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 mt-12 text-lg">
          No products available.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-md shadow">
          {/* Table view for md+ screens */}
          <table className="hidden md:table min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "Product",
                  "Title",
                  "Category",
                  "Brand",
                  "Price",
                  "Stock",
                  "On Sale",
                  "Featured",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="p-3 text-left text-sm font-semibold text-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/admin/productlist/${product._id}`)}
                >
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={product.imageUrl[0]?.url}
                      alt={product.title}
                      className="h-12 w-12 object-contain rounded bg-gray-100"
                    />
                  </td>
                  <td className="font-medium text-gray-800">{product.title}</td>
                  <td className="p-3 text-sm">
                    <Badge>{product.category}</Badge>
                  </td>
                  <td className="p-3 text-sm">
                    <Badge variant="outline" className="text-xs">
                      {product.brand}
                    </Badge>
                  </td>
                  <td className="p-3 text-sm font-bold text-emerald-600">
                    ₹{product.price.toFixed(2)}
                  </td>
                  <td className="p-3 text-sm">
                    {product.stock > 0 ? (
                      <Badge className="bg-emerald-100 text-emerald-800">
                        In Stock ({product.stock})
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                  </td>
                  <td className="p-3 text-sm">
                    {product.onSale ? (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        On Sale
                      </Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </td>
                  <td className="p-3 text-sm">
                    {product.isFeatured ? (
                      <Badge className="bg-purple-100 text-purple-800">
                        Featured
                      </Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </td>
                  <td
                    className="p-3 text-sm flex gap-2 justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      title="Edit"
                      className="p-2 rounded hover:bg-slate-100"
                      onClick={() =>
                        navigate(`/admin/productlist/${product._id}/edit`)
                      }
                    >
                      <SquarePen className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                      title="Delete"
                      className="p-2 rounded hover:bg-rose-100"
                      onClick={() => handleDelete(product._id)}
                    >
                      <Trash2Icon className="h-5 w-5 text-rose-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Card layout for mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg shadow-sm p-4 bg-white flex flex-col gap-3 hover:shadow-md transition"
                onClick={() => navigate(`/admin/productlist/${product._id}`)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.imageUrl[0]?.url}
                    alt={product.title}
                    className="h-16 w-16 object-contain rounded bg-gray-100"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {product.title}
                    </h2>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>{product.category}</Badge>
                  {product.onSale && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      On Sale
                    </Badge>
                  )}
                  {product.isFeatured && (
                    <Badge className="bg-purple-100 text-purple-800">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-lg font-bold text-emerald-600">
                    ₹{product.price.toFixed(2)}
                  </span>
                  <div
                    className="flex gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="p-2 rounded hover:bg-slate-100"
                      onClick={() =>
                        navigate(`/admin/productlist/${product._id}/edit`)
                      }
                    >
                      <SquarePen className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                      className="p-2 rounded hover:bg-rose-100"
                      onClick={() => handleDelete(product._id)}
                    >
                      <Trash2Icon className="h-5 w-5 text-rose-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
