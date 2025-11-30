import nodemailer from "nodemailer";
import { z } from "zod";

export interface SendEmailProps {
    to: string;
    subject: string;
    html?: string;
    text?: string;
    attachFiles?: string[];
}

// 1. Define the validation schema
const sendEmailSchema = z.object({
    to: z.email({ message: "Invalid email address" }),
    subject: z.string().min(1, { message: "Subject is required" }),
    text: z.string().optional(),
    html: z.string().optional(),
    attachFiles: z.array(z.string()).optional(),
});

// Optional: Infer the type from the schema to replace your manual SendEmailProps
type SendEmailPayload = z.infer<typeof sendEmailSchema>;

export async function sendEmail({
    to,
    subject,
    html = "",
    text = "",
    attachFiles = [],
}: SendEmailPayload) {
    // 2. Validate the body using safeParse
    const validation = sendEmailSchema.safeParse({
        to,
        subject,
        html,
        text,
        attachFiles,
    });

    // 3. Handle validation failure
    if (!validation.success) {
        const fieldErrors = z.flattenError(validation.error);
        return {
            message: "Validation failed",
            errors: fieldErrors,
            errorArr: Object.values(fieldErrors).flat(),
            // errors: z.treeifyError(validation.error),
        };
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            // host: "smtp-relay.brevo.com",
            // port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD, // Consider using env vars for security
            },
        });

        const mailOptions = {
            from: `"pcmc-notification" <${process.env.SMTP_USER}>`, // sender address
            to,
            subject,
            text,
            html,
            attachments: attachFiles.length > 0 ? attachFiles : [],
        };

        const info = await transporter.sendMail(mailOptions as any);

        return {
            success: true,
            messageId: info.messageId,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
        };
    }
}
