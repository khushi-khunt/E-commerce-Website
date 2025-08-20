import { Card, CardHeader, CardTitle, CardContent } from "@/theme/components/ui/card";
import { Input } from "@/theme/components/ui/input";
import { Button } from "@/theme/components/ui/button";
import { Label } from "@/theme/components/ui/label";
import { Switch } from "@/theme/components/ui/switch";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useFormik } from "formik";
import { format } from "date-fns"

import { createCoupon } from "@/services/productService";
import { couponSchema } from "@/validations/productSchemas";
import zodToFormikValidate from "@/validations/zodSchema";

export default function AddCoupon() {
  const { mutate, isPending } = useMutation({
    mutationFn: createCoupon,
    onSuccess: () => {
      toast.success("Coupon created!");
      formik.resetForm(); //  Clear form after success
    },
    onError: (error: any) => {
      console.error("Create coupon failed..!", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to create coupon");
    },
  });

  const formik = useFormik({
    initialValues: {
      code: "",
      type: "percentage",
      discountPercent: undefined,
      discountAmount: undefined,
      minOrderValue: undefined,
      maxUsage: 1,
      onlyForFirstOrder: false,
      isActive: true,
      productCategory: "",
      startsAt: "",
      expiresAt: "",
    },
    validate: zodToFormikValidate(couponSchema),
    onSubmit: (values) => {
      const cleaned = { ...values };

      //  Format dates to DD/MM/YYYY
      if (cleaned.startsAt) {
        const start = new Date(cleaned.startsAt);
        cleaned.startsAt = format(start, "dd/MM/yyyy");
      }
      if (cleaned.expiresAt) {
        const end = new Date(cleaned.expiresAt);
        cleaned.expiresAt = format(end, "dd/MM/yyyy");
      }

      //  Remove irrelevant discount fields
      if (cleaned.type === "percentage") {
        delete cleaned.discountAmount;
      } else if (cleaned.type === "fixed") {
        delete cleaned.discountPercent;
      } else {
        delete cleaned.discountPercent;
        delete cleaned.discountAmount;
      }

      mutate(cleaned);
    },
  });

  return (
    <div className="max-w-xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create Coupon</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div>
              <Label>Coupon Code</Label>
              <Input
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
              />
              {formik.touched.code && formik.errors.code && (
                <p className="text-xs text-red-500">{formik.errors.code}</p>
              )}
            </div>

            <div>
              <Label>Coupon Type</Label>
              <select
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
                <option value="conditional">Conditional</option>
              </select>
            </div>

            <div>
              <Label>Discount Percent (%)</Label>
              <Input
                name="discountPercent"
                type="number"
                value={formik.values.discountPercent || ""}
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <Label>Discount Amount (₹)</Label>
              <Input
                name="discountAmount"
                type="number"
                value={formik.values.discountAmount || ""}
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <Label>Minimum Order Value</Label>
              <Input
                name="minOrderValue"
                type="number"
                value={formik.values.minOrderValue || ""}
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <Label>Max Usage</Label>
              <Input
                name="maxUsage"
                type="number"
                value={formik.values.maxUsage}
                onChange={formik.handleChange}
              />
              {formik.touched.maxUsage && formik.errors.maxUsage && (
                <p className="text-xs text-red-500">{formik.errors.maxUsage}</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Label>Only for First Order</Label>
              <Switch
                checked={formik.values.onlyForFirstOrder}
                onCheckedChange={(val) =>
                  formik.setFieldValue("onlyForFirstOrder", val)
                }
              />
            </div>

            <div>
              <Label>Active Status</Label>
              <Switch
                checked={formik.values.isActive}
                onCheckedChange={(val) =>
                  formik.setFieldValue("isActive", val)
                }
              />
            </div>

            <div>
              <Label>Product Category</Label>
              <Input
                name="productCategory"
                value={formik.values.productCategory}
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <Label>Start Date</Label>
              <Input
                name="startsAt"
                type="date"
                value={formik.values.startsAt}
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <Label>Expiry Date</Label>
              <Input
                name="expiresAt"
                type="date"
                value={formik.values.expiresAt}
                onChange={formik.handleChange}
              />
            </div>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Coupon"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
