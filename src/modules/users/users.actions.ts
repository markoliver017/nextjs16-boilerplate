"use server";

import { verifySession } from "../auth/auth.actions";
import { getAllUser } from "./users.data";

export const fetchAllUsers = async () => {
    const session = await verifySession();
    if (!session) return null;

    const users = await getAllUser();

    return users;
};
