import React, { useEffect, useState } from "react";
import { Button } from "@/theme/components/ui/button";
import { Input } from "@/theme/components/ui/input";
import { Label } from "@/theme/components/ui/label";
import { toast } from "sonner";
import { fetchCategoryById, updateCategory } from "@/services/productService";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const { _id } = useParams();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState<File | string | null>(null)
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (_id) {
      (async () => {
        try {
          const data = await fetchCategoryById(_id);
          if (data) {
            setName(data.name || "");
            setIcon(data.icon?.url || null);
            setDisplayOrder(data.displayOrder || 0);
            setIsActive(data.isActive || false);
            setIsFeatured(data.isFeatured || false);
          }
        } catch (error) {
          console.error(error);
          toast.error("Failed to load category details.");
        }
      })();
    }
  }, [_id]);

  //for icon
  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIcon(e.target.files[0])
    }
  }

  //for update data
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (icon instanceof File) formData.append("icon", icon);
      formData.append("displayOrder", String(displayOrder));
      formData.append("isActive", String(isActive));
      formData.append("isFeatured", String(isFeatured));

      await updateCategory(_id as string, formData);
      toast.success("Category updated successfully!");
      navigate("/admin/categorylist");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update category.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-xl shadow-sm bg-white mt-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">Edit Category</h2>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="flex items-center gap-4">
          <Label htmlFor="name" className="w-32 text-sm font-semibold">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="flex-1"
          />
        </div>
        {/* //for icon */}
        {/* Icon input + preview */}
        <div className="flex items-center gap-4">
          <Label htmlFor="icon" className="w-32 text-sm font-semibold">Icon</Label>
          <div className="flex-1 flex items-center gap-4">
            <Input
              id="icon"
              type="file"
              accept="image/*"
              onChange={handleIconChange}
              className="flex-1"
            />

            {/* Show existing image if icon is a string (from DB) */}
            {typeof icon === "string" && (
              <img
                src={icon}
                alt="Current Icon"
                className="w-16 h-16 object-cover rounded-md border"
              />
            )}

            {/* Show preview if a new file is chosen */}
            {icon instanceof File && (
              <img
                src={URL.createObjectURL(icon)}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-md border"
              />
            )}

          </div>
        </div>

        {/* display order */}
        <div className="flex items-center gap-4">
          <Label htmlFor="displayOrder" className="w-32 text-sm font-semibold">Order</Label>
          <Input
            id="displayOrder"
            type="number"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(Number(e.target.value))}
            className="flex-1"
          />
        </div>
        {/* active */}
        <div className="flex items-center gap-4">
          <Label htmlFor="isActive" className="w-32 text-sm font-semibold">Active?</Label>
          <input
            id="isActive"
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="h-4 w-4"
          />
        </div>
        {/* featured */}
        <div className="flex items-center gap-4">
          <Label htmlFor="isFeatured" className="w-32 text-sm font-semibold">Featured?</Label>
          <input
            id="isFeatured"
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="h-4 w-4"
          />
        </div>
        {/* button */}
        <div className="flex justify-end gap-2">
          <Button type="submit" className="px-6 py-2 rounded-full font-semibold">
            Update
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate("/admin/categorylist")}
            className="px-6 py-2 rounded-full font-semibold"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
