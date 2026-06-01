import { user } from "@/src/db/schema/auth-schema";
import {
    createInsertSchema,
    createSelectSchema,
    createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

//zod schema export
export const zUserSelectSchema = createSelectSchema(user);
export const zUserInsertSchema = createInsertSchema(user);
export const zUserUpdateSchema = createUpdateSchema(user);

export const signUpSchema = z.object({
    name: z
        .string()
        .min(2, "Please enter at least 2 characters")
        .max(80, "Name must be under 80 characters"),
    email: z.email("Enter a valid email address"),
    password: z
        .string()
        .min(8, "Password needs at least 8 characters")
        .max(64, "Password must be under 64 characters"),
    callbackURL: z.string().optional(),
});

export const signInSchema = z.object({
    email: z.email("Enter a valid email address"),
    password: z.string("Password is required").min(1, "Password is required"),
    rememberMe: z.boolean().optional(),
    callbackURL: z.string().optional(),
});

export const resendVerificationSchema = z.object({
    email: z.email("Enter a valid email address"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;
export type SignInValues = z.infer<typeof signInSchema>;
export type ResendVerificationValues = z.infer<typeof resendVerificationSchema>;
