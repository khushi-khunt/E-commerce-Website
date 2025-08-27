import { Avatar, AvatarFallback, AvatarImage } from "@/theme/components/ui/avatar"
import { Badge } from "@/theme/components/ui/badge"
import { Card, CardContent } from "@/theme/components/ui/card"
import { bestSellers } from "./data/dashboardData"

export type SellerType = {
  id: string
  name: string
  avatar?: string
  totalSales: number
  growth?: number
}
export const BestSellers = () => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-6">🏅 Best Shop Sellers</h3>
        <ul className="space-y-4">
          {bestSellers.map((seller: SellerType, index: number) => (
            <li
              key={seller.id}
              className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-md hover:bg-muted transition-all">
              {/* Rank and Avatar */}
              <div className="flex items-center gap-4">
                <div className="text-lg font-bold text-muted-foreground w-6 text-center">
                  {index + 1}
                </div>
                <Avatar>
                  <AvatarImage src={seller.avatar} alt={seller.name} />
                  <AvatarFallback>
                    {seller.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{seller.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ${seller.totalSales.toLocaleString()} sales
                  </p>
                </div>
              </div>

              {/* Growth Badge */}
              {typeof seller.growth === "number" && (
                <Badge
                  variant={seller.growth >= 0 ? "default" : "destructive"}
                  className="text-xs"
                >
                  {seller.growth >= 0 ? `+${seller.growth}%` : `${seller.growth}%`}
                </Badge>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
