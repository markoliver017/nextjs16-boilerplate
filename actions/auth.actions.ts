"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
// import { db } from "@/src/db";
// import { user } from "@/src/db/auth-schema";
// import { eq } from "drizzle-orm";

import { resendVerificationSchema } from "@/lib/validators/auth";
import z from "zod";

export const resendVerificationEmail = async (values: { email: string }) => {
    try {
        const validatedData = resendVerificationSchema.safeParse(values);
        console.log("Validated Data", validatedData);
        if (!validatedData.success) {
            const { fieldErrors } = z.flattenError(validatedData.error);
            return { error: "Validation failed: " + fieldErrors?.email };
        }
        await auth.api.sendVerificationEmail({
            body: {
                email: validatedData.data.email,
                callbackURL: "/auth-welcome",
            },
        });
        return { success: true };
    } catch (error: any) {
        return { error: error.message || "An unknown error occurred." };
    }
};

export const verifySession = async () => {
    const nextHeaders = await headers();
    const session = await auth.api.getSession({
        headers: nextHeaders,
    });

    if (!session?.user) {
        redirect("/sign-in");
    }

    return { isAuth: true, userId: session.user.id };
};
