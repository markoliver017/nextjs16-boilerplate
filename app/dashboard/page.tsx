"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function AuthWelcome() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <h1>Dashboard Page</h1>
            <Button onClick={() => authClient.signOut()}>Logout</Button>
        </div>
    );
}
