import { db } from "@/src/db";
import { user } from "@/src/db/schema/auth-schema";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
    try {
        const existingUser = await db.query.user.findFirst({
            where: eq(user.email, email),
        });
        return existingUser;
    } catch (error) {
        console.error("Error fetching user by email:", error);
        return null;
    }
};
