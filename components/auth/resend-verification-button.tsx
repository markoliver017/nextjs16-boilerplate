"use client";

import { resendVerificationEmail } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ResendVerificationButtonProps {
    email: string;
}

export default function ResendVerificationButton({
    email,
}: ResendVerificationButtonProps) {
    const handleResend = async () => {
        if (!email) return;
        const result = await resendVerificationEmail({ email });
        if (result.success) {
            toast.success("Verification email sent!");
        } else {
            toast.error(result.error);
        }
    };

    return <Button onClick={handleResend}>Resend Verification Email</Button>;
}
