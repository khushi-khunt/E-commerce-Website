import { DeleteCategory, fetchCategories } from "@/services/productService";
import { Avatar, AvatarFallback, AvatarImage } from "@/theme/components/ui/avatar";
import { Button } from "@/theme/components/ui/button";
import { Card } from "@/theme/components/ui/card";
import { PencilLine, Trash } from "lucide-react";
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
    <Card className="max-w-6xl mx-auto p-3 sm:p-6 border border-muted shadow-md">
      <h1 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-primary">
        Categories Table View
      </h1>

      {/* Responsive Table Wrapper */}
      <div className="w-full overflow-x-auto rounded-lg border border-muted">
        <div className="hidden md:block overflow-x-auto rounded-lg border border-muted">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-muted text-muted-foreground font-semibold">
              <tr>
                <th className="py-3 px-4 text-left">Icon</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Featured</th>
                <th className="py-3 px-4 text-left">Stock</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="border-b">
                  <td className="py-3 px-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={category.icon?.url} alt={category.name} />
                      <AvatarFallback>{category.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </td>
                  <td className="py-3 px-4">{category.name}</td>
                  <td className="py-3 px-4">{category.isActive ? "Active" : "Inactive"}</td>
                  <td className="py-3 px-4">{category.isFeatured ? "Featured" : "Not Featured"}</td>
                  <td className="py-3 px-4">{category.displayOrder}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(category._id)}><PencilLine /></Button>
                    <Button size="sm" onClick={() => handleDelete(category._id)}><Trash /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card layout for small screens */}
        <div className="block md:hidden space-y-4">
          {categories.map((category) => (
            <Card key={category._id} className="p-4 border">
              <div className="flex items-center gap-3 mb-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={category.icon?.url} alt={category.name} />
                  <AvatarFallback>{category.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h2 className="font-semibold text-base">{category.name}</h2>
              </div>
              <p>Status: <span className={category.isActive ? "text-green-600" : "text-red-600"}>
                {category.isActive ? "Active" : "Inactive"}
              </span></p>
              <p>Featured: <span className={category.isFeatured ? "text-green-600" : "text-red-600"}>
                {category.isFeatured ? "Featured" : "Not Featured"}
              </span></p>
              <p>Stock: {category.displayOrder}</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" onClick={() => handleEdit(category._id)}><PencilLine /></Button>
                <Button size="sm" onClick={() => handleDelete(category._id)}><Trash /></Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CategoryList;
