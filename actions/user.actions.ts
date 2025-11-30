"use server";

import { getAllUser } from "@/src/db/queries/users.queries";
import { verifySession } from "./auth.actions";

export const fetchAllUsers = async () => {
    const session = await verifySession();
    if (!session) return null;

    const users = await getAllUser();

    return users;
};
