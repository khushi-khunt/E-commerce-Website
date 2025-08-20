import { Formik, Form, ErrorMessage } from "formik";
import { Button } from "@/theme/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/theme/components/ui/card";
import { Input } from "@/theme/components/ui/input";
import { useSaveLocation } from "@/hooks/Mutation";
import { z } from "zod";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/store";
import { fetchUserCart } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

// Zod schema
export const LocationSchema = z.object({
  address: z
    .string()
    .min(5, { message: "Address is too short" })
    .nonempty({ message: "Address is required" }),

  zipCode: z
    .string()
    .min(4, { message: "Zip code is too short" })
    .nonempty({ message: "Zip code is required" }),

  confirmLocation: z
    .string()
    .min(3, { message: "Please provide more details" })
    .nonempty({ message: "Confirm location is required" }),
});

const zodValidate = (schema) => (values) => {
  const result = schema.safeParse(values);
  if (result.success) return {};
  return Object.fromEntries(
    Object.entries(result.error.format()).map(([k, v]) => [k, v?._errors?.[0] || "Invalid"])
  );
};

export default function LocationPage({ onLocationSaved }) {
  const navigate = useNavigate();

  const userId = useSelector((state: RootState) => state.auth.id);
  const { data: cart } = useQuery({
    queryKey: ["user-cart", userId],
    queryFn: () => fetchUserCart(userId!),
    enabled: !!userId,
  });

  const { mutate, isLoading } = useSaveLocation();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Enter Your Delivery Location</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              address: "",
              zipCode: "",
              confirmLocation: "",
            }}
            validate={zodValidate(LocationSchema)}
            onSubmit={(values, { resetForm: resetform }) => {
              mutate(
                {
                  userId,
                  address: values.address,
                  zipCode: values.zipCode,
                  confirmLocation: values.confirmLocation,
                },
                { 
                  onSuccess: () => {
                    onLocationSaved?.();
                    resetform();
                    navigate("/user/checkout", { state: { cartItems: cart.items, userId ,location:{
                      address:values.address,
                      zipCode:values.zipCode,
                      confirmLocation:values.confirmLocation
                    }} });
                  },
                }
              );
            }}
          >
            {({ handleChange, values }) => (
              <Form className="space-y-4">
                {/* Address Field */}
                <div>
                  <Input
                    name="address"
                    placeholder="A-7, xyz street, Ahmedabad"
                    value={values.address}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="address"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Zip Code Field */}
                <div>
                  <Input
                    name="zipCode"
                    placeholder="Zip Code(example-382350)"
                    value={values.zipCode}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="zipCode"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Confirm Location Field */}
                <div>
                  <Input
                    name="confirmLocation"
                    placeholder="Near ABC School, Opposite XYZ Mall"
                    value={values.confirmLocation}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="confirmLocation"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Location"}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
