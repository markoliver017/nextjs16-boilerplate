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
import { signInSchema, SignInValues } from "@/lib/validators/auth";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import PreloaderAlert from "../layout/PreloaderAlert";
import { MySwal, Toast } from "@/components/alerts/sweet-alert";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

export function SignInForm() {
    const [googleSigningIn, setGoogleSigningIn] = useState(false);
    // useEffect(() => {
    // MySwal.fire({
    //     title: "Success!",
    //     text: "Login was successful",
    //     icon: "success",
    //     confirmButtonText: "Great!",
    //     toast: true,
    // });
    //     Toast.fire({
    //         icon: "success",
    //         title: "Signed in successfully",
    //     });
    // }, []);

    const {
        mutate: signIn,
        isPending,
        error,
        isError,
    } = useMutation({
        mutationFn: async (values: SignInValues) => {
            const response = await authClient.signIn.email(values);

            if (response.error) {
                throw response.error;
            }
            return {
                success: true,
                message: "Sign in successful",
            };
        },
        onSuccess: (response) => {
            /** note: the return data will be accessible in the debugger
             *so no need to console the onSuccess(data) here **/
            // Invalidate the posts query to refetch the updated list
            toast.success(response.message);
            setTimeout(() => {
                redirect("/dashboard");
            }, 2000);
        },
        onError: (error) => {
            Toast.fire({
                icon: "error",
                title: error.message,
            });
        },
    });

    const handleLoginProvider = async () => {
        setGoogleSigningIn(true);
        try {
            const res = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
                errorCallbackURL: "/auth-error",
                newUserCallbackURL: "/auth-welcome",
                disableRedirect: false,
            });
            setGoogleSigningIn(false);

            console.log("Better Auth Response:", res);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const form = useForm<SignInValues>({
        mode: "onChange",
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: SignInValues) {
        signIn(values);
    }

    return (
        <Form {...form}>
            {isError && (
                <div className="alert alert-error flex gap-2">
                    <AlertCircle />
                    <span>{error?.message}</span>
                </div>
            )}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h1>Sign In</h1>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your email"
                                    {...field}
                                />
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
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending || googleSigningIn}
                >
                    {isPending ? "Signing in..." : "Sign In"}
                </Button>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    disabled={isPending || googleSigningIn}
                    onClick={handleLoginProvider}
                >
                    {googleSigningIn ? (
                        <>
                            <svg
                                className="mr-2 h-4 w-4 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Signing in...
                        </>
                    ) : (
                        <>
                            <svg
                                className="mr-2 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                width="48px"
                                height="48px"
                            >
                                <path
                                    fill="#FFC107"
                                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                ></path>
                                <path
                                    fill="#FF3D00"
                                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                ></path>
                                <path
                                    fill="#4CAF50"
                                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                ></path>
                                <path
                                    fill="#1976D2"
                                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.712,35.636,44,28.7,44,20C44,22.659,43.862,21.35,43.611,20.083z"
                                ></path>
                            </svg>
                            Sign in with Google
                        </>
                    )}
                </Button>
            </form>
            <PreloaderAlert isLoading={isPending} />
        </Form>
    );
}
