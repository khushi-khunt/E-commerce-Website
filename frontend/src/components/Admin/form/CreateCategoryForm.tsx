import React, { useRef } from "react";
import { Formik, Form, Field } from "formik";
import { useAddCategory } from "@/hooks/Mutation";
import { Button } from "@/theme/components/ui/button";
import { Input } from "@/theme/components/ui/input";
import { Label } from "@/theme/components/ui/label";
import { toast } from "sonner";

interface CategoryFormValues {
  name: string;
  icon: File | null;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
}

const initialValues: CategoryFormValues = {
  name: "",
  icon: null,
  isFeatured: false,
  isActive: false,
  displayOrder: 0,
};

const CreateCategoryForm: React.FC = () => {
  const { mutate ,isLoading} = useAddCategory();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (values: CategoryFormValues, { resetForm }: { resetForm: () => void }) => {
    if (!values.name || !values.icon) {
      toast.error("Please fill in the required fields (name & image).");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("icon", values.icon);
    formData.append("isFeatured", JSON.stringify(values.isFeatured));
    formData.append("isActive", JSON.stringify(values.isActive));
    formData.append("displayOrder", values.displayOrder.toString());

    mutate(formData, {
      onSuccess: () => {
        toast.success("Category created successfully!");
        resetForm();
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
      onError: (error) => {
        toast.error("Failed to create category. Please try again.");
        console.error(error);
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md border rounded-2xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">Create New Category</h2>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form className="space-y-6">
            {/* Name */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <Label htmlFor="name" className="sm:w-40 text-sm font-semibold">Category Titile</Label>
              <Field
                as={Input}
                id="name"
                name="name"
                placeholder="Enter category Title"
                className="flex-1"
              />
            </div>

            {/* Icon */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <Label htmlFor="icon" className="sm:w-40 text-sm font-semibold">Icon</Label>
              <div className="flex-1 flex items-center gap-4">
                <Input
                ref={fileInputRef}
                  id="icon"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.currentTarget.files) {
                      setFieldValue("icon", e.currentTarget.files[0]);
                    }
                  }}
                  className="flex-1"
                />

                {/* Show preview if an image is selected */}
                {values.icon && (
                  <img
                    src={URL.createObjectURL(values.icon)}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                )}
              </div>
            </div>


            {/* Featured */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <Label htmlFor="isFeatured" className="sm:w-40 text-sm font-semibold">Featured?</Label>
              <Input
                id="isFeatured"
                name="isFeatured"
                type="checkbox"
                checked={values.isFeatured}
                onChange={(e) => setFieldValue("isFeatured", e.target.checked)}
                className="h-4 w-4"
              />
            </div>

            {/* Active */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <Label htmlFor="isActive" className="sm:w-40 text-sm font-semibold">Active?</Label>
              <Input
                id="isActive"
                name="isActive"
                type="checkbox"
                checked={values.isActive}
                onChange={(e) => setFieldValue("isActive", e.target.checked)}
                className="h-4 w-4"
              />
            </div>

            {/* Display Order */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <Label htmlFor="displayOrder" className="sm:w-40 text-sm font-semibold">Stock</Label>
              <Input
                id="displayOrder"
                name="displayOrder"
                type="number"
                placeholder="Quantity"
                value={values.displayOrder}
                onChange={(e) => setFieldValue("displayOrder", Number(e.target.value))}
                className="flex-1"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" className="px-6 py-2 rounded-full font-semibold" disabled={isLoading}>
                {isLoading ? "creating" : "Create"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCategoryForm;
