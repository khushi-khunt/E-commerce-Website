import { useFeaturedCategories } from "@/hooks/Mutation";
import { Loader2 } from "lucide-react";

const FeaturedCategories = () => {
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useFeaturedCategories();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin h-6 w-6 text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Failed to load categories
      </div>
    );
  }

  return (
    <section className="px-4 pt">
      <h2 className="text-xl sm:text-2xl font-bold text-[rgb(118,168,160)] mb-4">
        ✨ Shop by Category
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {categories.map((category: any) => (
          <div
            key={category._id}
            className="flex flex-col items-center justify-center bg-blue-50 p-4 rounded-2xl hover:bg-blue-100 transition-colors duration-300 cursor-pointer shadow-sm hover:shadow-md"
          >
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center overflow-hidden mb-2 border border-gray-200">
              <img
                src={category.icon?.url || "/category-fallback.jpg"}
                alt={category.name}
                className="h-12 w-12 object-contain"
              />
            </div>
            <p className="text-sm text-gray-700 font-medium text-center">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
