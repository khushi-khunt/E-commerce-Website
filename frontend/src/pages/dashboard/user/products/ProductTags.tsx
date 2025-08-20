import { useProductTags } from "@/hooks/Mutation";
import { Badge } from "@/theme/components/ui/badge";
import { Loader2, Tags } from "lucide-react";

const ProductTags = () => {
  const { data: tags = [], isLoading, isError } = useProductTags();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-20">
        <Loader2 className="animate-spin h-6 w-6 text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-destructive text-center font-medium">
        Failed to load tags.
      </div>
    );
  }

  return (
    <aside className="w-full rounded-lg border border-border bg-muted/50 p-4 shadow-sm">
      <h2 className="text-base font-semibold text-primary mb-3 flex items-center gap-2">
        <Tags className="h-4 w-4 text-primary" />
        Popular Product Tags
      </h2>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag: string, index: number) => (
          <Badge
            key={index}
            variant="outline"
            className="border-blue-400 text-blue-700 hover:bg-blue-100 cursor-pointer text-xs px-2 py-1"
          >
            #{tag}
          </Badge>
        ))}
      </div>
    </aside>
  );
};

export default ProductTags;
