import { SignUpValues } from "@/lib/validators/auth";
import { db } from "../index";
import { user } from "@/src/db/schema/auth-schema";
import { eq } from "drizzle-orm";

export const getAllUser = async () => {
    return db.query.user.findMany();
};

export const getUserById = async (id: string) => {
    return db.query.user.findFirst({
        where: eq(user.id, id),
    });
};

export const getUserByEmail = async (email: string) => {
    return db.query.user.findFirst({
        where: eq(user.email, email),
    });
};

export const createUser = async (
    data: Omit<typeof user.$inferInsert, "id">
) => {
    const id = crypto.randomUUID();
    return db.insert(user).values({ ...data, id });
};

export const updateUser = async (data: Partial<typeof user.$inferInsert>) => {
    return db.update(user).set(data);
};
export const deleteUser = async (id: string) => {
    return db.delete(user).where(eq(user.id, id));
};
