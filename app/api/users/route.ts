import { getAllUser } from "@/src/db/queries/users.queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const users = await getAllUser();

    return NextResponse.json(users, {
        status: 200,
    });
}
