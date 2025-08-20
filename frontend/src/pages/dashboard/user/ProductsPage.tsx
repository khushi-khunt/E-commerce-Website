import { useProductsQuery } from "@/hooks/Mutation"
import type { Product } from "@/services/authService";

const ProductsPage = () => {

  const { data, isLoading, error, isError } = useProductsQuery();

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.map((product: Product) => (
        <div key={product._id} className="border p-4 rounded-lg shadow-sm">
          <img src={product.imgUrl[0]} alt={product.title} className="h-40 object-cover w-full" />
          <h3 className="font-bold text-lg mt-2">{product.title}</h3>
          <p className="text-gray-600">{product.price}</p>
          <p className="text-sm">{product.category}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductsPage