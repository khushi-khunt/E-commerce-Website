import { PopularProducts } from "@/services/productService"
import { Card, CardContent } from "@/theme/components/ui/card"
import { useQuery } from "@tanstack/react-query"

type ProductType = {
  _id: string
  title: string
  views?: number
  imageUrl?: string[]
}

export const TopProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popular-products"],
    queryFn: PopularProducts,
  })

  const popularProducts: ProductType[] = data || []

  if (isLoading) return <p>Loading Top Products...</p>
  if (error) return <p>Failed to load Top Products</p>

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-center border-b pb-2">
          Top Popular Products
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 font-medium text-muted-foreground">#</th>
                <th className="px-4 py-2 font-medium text-muted-foreground">Product Name</th>
                <th className="px-4 py-2 font-medium text-muted-foreground text-right">Views</th>
              </tr>
            </thead>
            <tbody>
              {popularProducts.map((product, index) => (
                <tr
                  key={product._id}
                  className="border-t hover:bg-muted transition-colors"
                >
                  <td className="px-4 py-2 text-muted-foreground">{index + 1}</td>
                  <td className="px-4 py-2">{product.title}</td>
                  <td className="px-4 py-2 text-right text-primary font-medium">
                    {product.views || 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
