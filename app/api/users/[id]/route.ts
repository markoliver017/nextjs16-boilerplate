import { deleteUser, getUserById } from "@/src/modules/users/users.data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    try {
        const user = await getUserById(id);
        return NextResponse.json(user, {
            status: 200,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
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
