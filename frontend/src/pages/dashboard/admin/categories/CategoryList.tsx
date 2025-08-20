import { DeleteCategory, fetchCategories } from "@/services/productService";
import { Avatar, AvatarFallback, AvatarImage } from "@/theme/components/ui/avatar";
import { Button } from "@/theme/components/ui/button";
import { Card } from "@/theme/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Category {
  _id: string;
  name: string;
  icon: { url: string; public_id: string };
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  slug: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(Array.isArray(data) ? data : []);
        toast.success("Categories loaded successfully!", {
          duration: 3000,
          position: "top-right",
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load categories", {
          description: "Something went wrong while fetching the category list",
        });
      }
    };
    loadCategories();
  }, []);

  const handleEdit = (_id: string) => {
    navigate(`/admin/categorylist/${_id}/edit`);
  };

  const handleDelete = async (_id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await DeleteCategory(_id);
        setCategories(categories.filter((cat) => cat._id !== _id));
        toast.success("Category deleted successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete category.");
      }
    }
  };

  return (
    <Card className="max-w-6xl mx-auto p-4 sm:p-6 border border-muted shadow-md">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center text-primary">
        Categories Table View
      </h1>

      <div className="w-full overflow-x-auto rounded-lg border border-muted">
        <table className="min-w-[850px] w-full text-sm sm:text-base border-collapse">
          <thead className="bg-muted text-muted-foreground font-semibold">
            <tr>
              <th className="py-3 px-4 text-left whitespace-nowrap">Icon</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Name</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Status</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Featured</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Order</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category._id}
                className="border-b border-muted transition hover:bg-muted/50"
              >
                <td className="py-3 px-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={category.icon?.url} alt={category.name} />
                    <AvatarFallback>
                      {category.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </td>
                <td className="py-3 px-4 max-w-[150px] truncate">{category.name}</td>
                <td className="py-3 px-4">
                  <span className={category.isActive ? "text-green-600" : "text-red-600"}>
                    {category.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={category.isFeatured ? "text-green-600" : "text-red-600"}>
                    {category.isFeatured ? "Featured" : "Not Featured"}
                  </span>
                </td>
                <td className="py-3 px-4">{category.displayOrder}</td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(category._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default CategoryList;
