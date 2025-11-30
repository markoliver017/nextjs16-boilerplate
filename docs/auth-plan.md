# Auth Implementation Plan

> Update the checkboxes below as each task is completed. Sub-items are guidance and do not need their own checkbox unless you split them out later.

-   [x] **Pre-flight & Environment**

    -   Confirm required `.env` variables: `DATABASE_URL`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, SMTP creds, and frontend URLs.
    -   Verify TanStack Query provider is mounted (QueryClientProvider + Devtools optional).
    -   Ensure `next-themes` integration supports light/dark toggling.

-   [x] **Drizzle Schema & Migrations**

    -   Review `src/db/auth-schema.ts` for Better Auth tables and add helpful indexes (e.g., `account` composite indexes).
    -   Regenerate migrations with `drizzle-kit` after schema adjustments.

-   [x] **Better Auth Server Configuration**

    -   Extend `lib/auth.ts` email templates using `sendEmail` helper.
    -   Fine-tune session and trusted origin settings for local + production.
    -   Document required environment secrets.

-   [x] **Auth API Route Enhancements**

    -   Add error handling/logging around `toNextJsHandler` in `app/api/auth/[...all]/route.ts`.
    -   Consider rate limiting or middleware hooks for abuse prevention.

-   [ ] **Client Auth Utilities**

    -   Create TanStack Query mutation hooks (`useEmailSignUp`, `useEmailSignIn`, `useGoogleSignIn`, `useResendVerification`, `useSignOut`).
    -   Centralize Zod v4 schemas in `lib/validators/auth.ts`.
    -   Integrate toast/error helpers for UX feedback.

-   [x] **Theme Utility Class**

    -   Add global tailwind utility class (e.g., `.theme-surface`) in `app/globals.css` to harmonize light/dark surfaces.
    -   Ensure layout providers apply this class to `<body>` via `next-themes`.

-   [x] **Auth Layout Shell**

    -   Create `/app/(auth)/layout.tsx` with shared shell, metadata, and background using shadcn components.
    -   Reuse layout wrappers (`ThemeProvider`, `QueryClientProvider`).

-   [ ] **Reusable Auth UI Components**

    -   Build shadcn-based `AuthCard`, `SocialButton`, and `FormField` wrappers.
    -   Ensure components are accessible, responsive, and theme-aware.

-   [ ] **Email Sign-Up & Sign-In Forms**

    -   Implement `SignUpForm` and `SignInForm` with React Hook Form or controlled state + Zod validation.
    -   Connect submissions to TanStack Query hooks; show loading/success/error states.
    -   Provide post-signup messaging for verification-required flow.

-   [ ] **Google OAuth Integration**

    -   Add Google sign-in button leveraging `signIn({ provider: "google" })`.
    -   Handle redirect/popup flows and error messaging.

-   [ ] **Session Handling & Redirects**

    -   Utilize `useSession` for client guarding; redirect authenticated users away from auth pages.
    -   Add server-side protection helpers for secure routes.

-   [ ] **Email Verification & Recovery UX**

    -   Build verification pending screen with resend capability.
    -   Outline future password reset flow stubs for later implementation.

-   [ ] **Documentation & Tracking**
    -   Keep this checklist updated as tasks complete.
    -   Document migration steps, OAuth setup, and environment requirements for collaborators.
    -   Rule: If a shadcn UI component is missing under `components/ui`, run `pnpm dlx shadcn@latest add <component>` to scaffold it.
