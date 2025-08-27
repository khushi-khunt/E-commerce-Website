import { deleteProductById, fetchProducts } from "@/services/productService";
import { Badge } from "@/theme/components/ui/badge";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PencilLine, SquarePen, Trash, Trash2Icon } from "lucide-react";
interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  imageUrl: { url: string }[];
  tags: string[];
  onSale: boolean;
}

const ITEMS_PER_PAGE = 6;

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
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

  // Extract unique categories
  const categories = useMemo(() => {
    const allCats = products.map((p) => p.category);
    return ["All", ...new Set(allCats)];
  }, [products]);

  // Filter + search
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesSearch = p.title
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-lg sm:text-xl font-extrabold mb-6 border-b border-gray-200 pb-3">
        All Product List
      </h1>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-3 py-2 w-56 bg-white"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-md px-3 py-2 bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center mt-6">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-12 text-lg">
          No products available.
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-md shadow-md">
            {/* Table view */}
            <table className="hidden md:table min-w-full bg-white border border-gray-200">
              <thead className="bg-[rgb(240,245,249)] ">
                <tr>
                  {[
                    "Product-Title",
                    "Price",
                    "Stock",
                    "Category",
                    "On Sale",
                    "Action",
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
                {paginatedProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50 transition-colors cursor-pointer "
                    onClick={() => navigate(`/admin/productlist/${product._id}`)}
                  >
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={product.imageUrl[0]?.url}
                        alt={product.title}
                        className="h-12 w-12 object-contain rounded bg-gray-100"
                      />
                      {product.title}
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
                    <td className="p-3 text-sm">{product.category}</td>
                    <td className="p-3 text-sm">
                      {product.onSale ? (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          On Sale
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
                        className="p-2 rounded-md hover:bg-slate-100 bg-gray-100"
                        onClick={() =>
                          navigate(`/admin/productlist/${product._id}/edit`)
                        }
                      >
                        <PencilLine className="h-5 w-5 text-gray-600" />
                      </button>
                      <button
                        title="Delete"
                        className="p-2 rounded-md hover:bg-rose-100 bg-red-100"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Trash className="h-5 w-5 text-rose-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Card layout for mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              {paginatedProducts.map((product) => (
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
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge>{product.category}</Badge>
                    {product.onSale && (
                      <Badge className="bg-yellow-100 text-yellow-800">
                        On Sale
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

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
