import { sendEmail } from "@/lib/utils/mail.utils";
import { verifySession } from "@/src/modules/auth/auth.actions";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// 1. Define the validation schema
const sendEmailSchema = z.object({
    to: z.email({ message: "Invalid email address" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    text: z.string().optional(),
    html: z.string().optional(),
});

// Optional: Infer the type from the schema to replace your manual SendEmailProps
type SendEmailPayload = z.infer<typeof sendEmailSchema>;

export async function POST(req: NextRequest) {
    const session = await verifySession();
    // Check if the user is authenticated
    if (!session) {
        // User is not authenticated
        return NextResponse.json(null, { status: 401 });
    }

    const body: SendEmailPayload = await req.json();
    console.log("send-mail body: >>>>>>>>>>>>>>>>>>", body);

    // 2. Validate the body using safeParse
    const validation = sendEmailSchema.safeParse(body);

    // 3. Handle validation failure
    if (!validation.success) {
        const fieldErrors = z.flattenError(validation.error);
        return NextResponse.json(
            {
                message: "Validation failed",
                errors: fieldErrors,
                errorArr: Object.values(fieldErrors).flat(),
                // errors: z.treeifyError(validation.error),
            },
            { status: 400 }
        );
    }

    const { to, subject, text, html } = body;

    const res = await sendEmail({
        to,
        subject,
        text,
        html,
    });

    return NextResponse.json(res);
}
