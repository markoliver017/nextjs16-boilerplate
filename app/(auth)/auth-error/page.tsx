import Link from "next/link";

export default function AuthError() {
    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold">Authentication Error</h1>
            <p className="mt-2 text-muted-foreground">
                An error occurred during the authentication process.
            </p>
            <p className="mt-4">Please try again.</p>
            <div className="mt-6">
                <Link
                    href="/sign-in"
                    className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
                >
                    Return to Sign In
                </Link>
            </div>
        </div>
    );
}
