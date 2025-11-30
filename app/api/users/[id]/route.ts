import { deleteUser, getUserById } from "@/src/db/queries/users.queries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const user = await getUserById(id);

    return NextResponse.json(user, {
        status: 200,
    });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const user = await deleteUser(id);

    return NextResponse.json(user, {
        status: 200,
    });
}
