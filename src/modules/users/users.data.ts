import { db } from "@/src/db";
import { user } from "@/src/db/schema/auth-schema";
import { eq } from "drizzle-orm";
import { NewUserType } from "./users.types";

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
    data: NewUserType
    // data: Omit<typeof user.$inferInsert, "id">
) => {
    return db.insert(user).values(data);
};

export const updateUser = async (data: Partial<NewUserType>) => {
    return db.update(user).set(data);
};
export const deleteUser = async (id: string) => {
    return db.delete(user).where(eq(user.id, id));
};
