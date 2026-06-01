"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
    resendVerificationSchema,
    ResendVerificationValues,
} from "@/lib/validators/auth";
import z from "zod";
import { UserSession } from "@/lib/global-types/globals";

export const resendVerificationEmail = async (
    values: ResendVerificationValues
) => {
    try {
        const validatedData = resendVerificationSchema.safeParse(values);

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

export const verifySession = async (): Promise<UserSession | null> => {
    const nextHeaders = await headers();
    const session = await auth.api.getSession({
        headers: nextHeaders,
    });

    if (!session?.user) return null;

    return {
        userId: session.user.id,
        name: session.user.name,
        email: session.user.email,
        roleId: (session.user as any).roleId,
        roleName: (session.user as any).roleName,
        roleLevel: (session.user as any).roleLevel,
    };
};
