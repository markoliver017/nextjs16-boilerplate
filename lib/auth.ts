import { db } from "@/src/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sendEmail } from "@/lib/utils/mail.utils";
import { customSession } from "better-auth/plugins";
import { buildPCMCEmailHtml } from "./email-templates/email-auth";
import { logError } from "./utils/audit.utils";
import { getAppUrl } from "./utils/global.utils";

const APP_NAME = process.env.APP_NAME || "Next.js Boilerplate";
const APP_URL = getAppUrl();

const trustedOrigins = Array.from(
    new Set(
        [
            APP_URL,
            process.env.AUTH_TRUSTED_ORIGIN?.trim(),
            "http://localhost:3000",
        ].filter(Boolean) as string[]
    )
);

export const auth = betterAuth({
    trustedOrigins,
    database: drizzleAdapter(db, {
        provider: "mysql",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url, token }, request) => {
            const html = buildPCMCEmailHtml(
                APP_NAME,
                "Reset Your Password",
                `Hello ${user.name},<br/><br/>We received a request to reset the password for your PCMC Incentives account. If you did not make this request, please ignore this email.`,
                "Reset Password",
                url,
                "For security, this link is valid for 1 hour only."
            );
            void sendEmail({
                to: user.email,
                subject: `Reset your password - ${APP_NAME}`,
                text: `Click the link to reset your password: ${url}`,
                html,
            });
        },
        onPasswordReset: async ({ user }, request) => {
            // your logic here
            console.log(`Password for user ${user.email} has been reset.`);
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        },
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            const fallbackUrl = `${APP_URL}/auth/verify-email`;
            const verificationUrl = url || fallbackUrl;
            const name = user.name?.trim() || "there";
            const subject = `Verify your ${APP_NAME} email`;
            const text = `Hi ${name},\n\nConfirm your email by visiting: ${verificationUrl}\n\nIf you did not create an account, you can ignore this message.`;
            const html = buildPCMCEmailHtml(
                APP_NAME,
                "Confirm your email",
                `Hi ${name},<br /><br />Thanks for creating an account with ${APP_NAME}. Click the button below to verify your email address and finish setting up your account.`,
                "Verify email",
                verificationUrl
            );

            const res = await sendEmail({
                to: user.email,
                subject,
                text,
                html,
            });
            if (!res.success) {
                await logError(
                    "LvDJVJ8cCiKA3D7KFtizq2vDxKnLuSw7",
                    "auth",
                    "send_verification_email",
                    `${user.email} - ${
                        res.error || "Failed to send verification email"
                    }`
                );
            }
        },
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // Cache duration in seconds (5 minutes)
        },
        expiresIn: 60,
    },
    plugins: [
        customSession(async ({ user, session }) => {
            //modify session
            return {
                ...session,
                user,
            };
        }),
    ],
});
