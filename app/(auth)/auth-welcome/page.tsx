import { getUserByEmail } from "@/src/db/queries/user.queries";
import ResendVerificationButton from "@/components/auth/resend-verification-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AuthWelcomePage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const emailParam = (await searchParams).email;
    // Ensure email is a string, not an array
    const email = Array.isArray(emailParam) ? emailParam[0] : emailParam;

    if (!email) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold">Invalid Request</h1>
                <p className="mt-2 text-muted-foreground">No email provided.</p>
            </div>
        );
    }

    const user = await getUserByEmail(email);

    if (!user) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold">Registration Not Found</h1>
                <p className="mt-2 text-muted-foreground">
                    We couldn't find a registration associated with{" "}
                    <strong>{email}</strong>.
                </p>
            </div>
        );
    }

    if (user.emailVerified) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold">Welcome!</h1>
                <p className="mt-2 text-muted-foreground">
                    Your email <strong>{email}</strong> has been verified.
                </p>
                <div className="mt-6">
                    <Button asChild>
                        <Link href="/sign-in">Proceed to Sign In</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold">Check your email</h1>
            <p className="mt-2 text-muted-foreground">
                We've sent a verification link to <strong>{email}</strong>.
            </p>
            <p className="mt-4">
                Please check your inbox to complete the sign-up process.
            </p>
            <div className="mt-6">
                <ResendVerificationButton email={email} />
            </div>
            <div className="mt-6">
                <Button asChild>
                    <Link href="/sign-in">Proceed to Sign In</Link>
                </Button>
            </div>
        </div>
    );
}
