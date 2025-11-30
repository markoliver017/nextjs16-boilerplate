"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema, SignUpValues } from "@/lib/validators/auth";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SignUpForm() {
    const router = useRouter();
    const {
        mutate: signUp,
        isPending,
        error,
        isError,
    } = useMutation({
        mutationFn: async (values: SignUpValues) => {
            const response = await authClient.signUp.email(values);
            console.log("response", response);
            if (response.error) {
                throw response.error;
            }
            return {
                success: true,
                message: "Sign up successful",
            };
        },
        onSuccess: (response, variables) => {
            toast.success(response.message);
            router.push(`/auth-welcome?email=${variables.email}`);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    const form = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            // image: "", //optional
            callbackURL: "/about", // A URL to redirect to after the user verifies their email (optional)
        },
    });

    function onSubmit(values: SignUpValues) {
        signUp(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Signing up..." : "Sign Up"}
                </Button>
            </form>
        </Form>
    );
}
