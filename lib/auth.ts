import { db } from "@/src/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sendEmail } from "@/utils/mail.utils";
import { customSession } from "better-auth/plugins";

const getAppUrl = () => {
    const url = process.env.APP_URL?.trim() || "http://localhost:3000";
    return url.endsWith("/") ? url.slice(0, -1) : url;
};

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

const buildEmailBody = (
    heading: string,
    message: string,
    ctaLabel: string,
    ctaHref: string
) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${heading}</title>
    <style>
      body { font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif; background: #f4f4f5; color: #111; padding: 32px; }
      .wrapper { max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.12); }
      h1 { font-size: 20px; margin-bottom: 16px; }
      p { line-height: 1.6; margin-bottom: 24px; }
      a.btn { display: inline-block; padding: 12px 24px; border-radius: 9999px; background: #111827; color: #ffffff !important; text-decoration: none; font-weight: 600; }
      .footer { margin-top: 32px; font-size: 12px; color: #6b7280; text-align: center; }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <h1>${heading}</h1>
      <p>${message}</p>
      <a class="btn" href="${ctaHref}" target="_blank" rel="noopener noreferrer">${ctaLabel}</a>
      <p style="margin-top:24px; font-size: 13px; color:#6b7280;">If the button doesn't work, copy and paste this link into your browser:<br /><span style="word-break: break-all;">${ctaHref}</span></p>
      <div class="footer">Sent by ${APP_NAME}</div>
    </div>
  </body>
</html>`;

export const auth = betterAuth({
    trustedOrigins,
    database: drizzleAdapter(db, {
        provider: "mysql",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
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
            const html = buildEmailBody(
                "Confirm your email",
                `Hi ${name},<br /><br />Thanks for creating an account with ${APP_NAME}. Click the button below to verify your email address and finish setting up your account.`,
                "Verify email",
                verificationUrl
            );

            await sendEmail({
                to: user.email,
                subject,
                text,
                html,
            });
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
