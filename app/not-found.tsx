import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
            <h1 className="text-6xl font-bold">404</h1>
            <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
            <p className="mt-2 text-muted-foreground">
                Could not find the requested page.
            </p>
            <Link
                href="/"
                className="mt-6 rounded-md bg-primary px-4 py-2 text-primary-foreground"
            >
                Return Home
            </Link>
        </div>
    );
}
