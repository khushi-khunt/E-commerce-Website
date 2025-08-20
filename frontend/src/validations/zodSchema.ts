import type { ZodSchema } from "zod";

const zodToFormikValidate = (schema: ZodSchema) => (values: any) => {
    const result = schema.safeParse(values);
    const errors: Record<string, string> = {};
    if (!result.success) {
        for (const issue of result.error.issues) {
            errors[issue.path[0]] = issue.message;
        }
    }
    return errors;
};

export default zodToFormikValidate