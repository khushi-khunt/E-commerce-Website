import { z } from "zod";

export const productSchema = z.object({
    title: z.string().min(3, "Title is required"),
    slug: z.string().optional(),
    price: z.number().positive(),
    salePercent: z.number().min(0).max(100),
    onSale: z.boolean().optional(),
    saleEndsAt: z.string().optional(),
    stock: z.number().min(0),
    description: z.string().optional(),
    category: z.string().min(1),
    brand: z.string().optional(),
    tags: z.string().array().optional(),
    rating: z.number().min(0).max(5).optional().default(0),
    numReviews: z.number().int().min(0).optional().default(0),
    isFeatured: z.boolean().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    variants: z.array(
        z.object({
            size: z.string().optional(),
            color: z.string().optional(),
            stock: z.number().optional(),
            price: z.number().optional(),
        })
    ).optional(),
    specs: z.array(
        z.object({
            key: z.string(),
            value: z.string(),
        })
    ).optional(),
    weight: z.number().optional(),
    dimensions: z.object({
        length: z.number().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
    }).optional(),
    imageUrl: z
        .any()
        .refine((files) => Array.isArray(files) && files.every((file) => file instanceof File), {
            message: "Each image must be a valid file",
        }),
})

export const categorySchema = z.object({
    name: z.string().min(3, "Category name is required"),
    image: z.any()
})

export const couponSchema = z.object({
    code: z.string().min(3),
    type: z.enum(["percentage", "fixed", "conditional"]),
    discountPercent: z.number().optional(),
    discountAmount: z.number().optional(),
    minOrderValue: z.number().optional(),
    onlyForFirstOrder: z.boolean(),
    productCategory: z.string().optional(),
    maxUsage: z.number().min(1),
    expiresAt: z.string().optional(),
}).refine((data) => {
    if (data.type === "percentage") return data.discountPercent !== undefined;
    if (data.type === "fixed") return data.discountAmount !== undefined;
    return true;
}, {
    message: "Provide the correct discount value based on type",
    path: ["discountPercent"]
});