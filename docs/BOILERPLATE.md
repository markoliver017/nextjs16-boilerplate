############################

### Next.js Boilerplate

##### Installation

#########################

```bash
npx create-next-app@latest
```

## Usage

```bash
npm run dev
```

############

## Shadcn

############

```bash
pnpm dlx shadcn@latest init
```

# Add Shadcn components

```bash
pnpm dlx shadcn@latest add button
```

###############

### Drizzle

###############

```bash
pnpm add drizzle-orm mysql2 dotenv
pnpm add -D drizzle-kit tsx
```

# Drizzle connection

```typescript
import { drizzle } from "drizzle-orm/mysql2";
import * as dotenv from "dotenv";
import * as authSchema from "./auth-schema";
import * as appSchema from "./schema";

dotenv.config({ path: ".env" });

const schema = { ...authSchema, ...appSchema };

export const db = drizzle(process.env.DATABASE_URL || "", {
    schema,
    mode: "default",
});
```

# Drizzle config

```typescript
// drizzle.config.ts
import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
dotenv.config({ path: ".env" });

export default defineConfig({
    out: "./drizzle",
    schema: ["./src/db/auth-schema.ts", "./src/db/schema.ts"],
    dialect: "mysql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
```

# Drizzle schema

```typescript
// src/db/schema.ts
import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    age: int().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});
```

```bash
# Drizzle CLI commands

# Pushes the schema to the database
npx drizzle-kit push
# Generates the schema from the database
npx drizzle-kit generate
# Creates a new migration file
npx drizzle-kit migrate
```

### BETTER-AUTH - FOR AUTHENTICATION

```bash
pnpm add better-auth
```

```.env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
```

##Create A Better Auth Instance

#Create a file named auth.ts:

#Project root - lib/ folder

# auth.ts

```typescript
import { db } from "@/src/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "mysql", // or "mysql", "sqlite"
    }),
    emailAndPassword: {
        enabled: true,
    },
});
```

#Better Auth CLI commands

```bash
#Generate: This command generates an ORM schema or SQL migration file.
npx @better-auth/cli generate

#Migrate: This command creates the required tables directly in the database. (Available only for the built-in Kysely adapter)
npx @better-auth/cli migrate
```

#Mount Handler

#Create /app/api/auth/[...all]/route.ts

```typescript
import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
```

#Create Client Instance
#lib/auth-client.ts

```typescript
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:3000",
});
```

##Better Auth Usage
###Email&Password
####sign-up.tsx

```typescript
import { authClient } from "@/lib/auth-client"; //import the auth client

const { data, error } = await authClient.signUp.email(
    {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        image, // User image URL (optional)
        callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
    },
    {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },
    }
);
```

#By default, the users are automatically signed in after they successfully sign up. To disable this behavior you can set autoSignIn to false.

#auth.ts

```typescript
import { betterAuth } from "better-auth";
export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        autoSignIn: false, //defaults to true
    },
});
```

#Sign In - Client Side

```typescript
const { data, error } = await authClient.signIn.email(
    {
        /**
         * The user email
         */
        email,
        /**
         * The user password
         */
        password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/dashboard",
        /**
         * remember the user session after the browser is closed.
         * @default true
         */
        rememberMe: false,
    },
    {
        //callbacks
    }
);
```

#Sign In - Server Side

```typescript
import { auth } from "./auth"; // path to your Better Auth server instance

const response = await auth.api.signInEmail({
    body: {
        email,
        password,
    },
    asResponse: true, // returns a response object instead of data
});
```

##Social Sign-On
#auth.ts

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        },
    },
});
```

#Sign in with social providers
#sign-in.tsx

```typescript
import { authClient } from "@/lib/auth-client"; //import the auth client

await authClient.signIn.social({
    /**
     * The social provider ID
     * @example "github", "google", "apple"
     */
    provider: "github",
    /**
     * A URL to redirect after the user authenticates with the provider
     * @default "/"
     */
    callbackURL: "/dashboard",
    /**
     * A URL to redirect if an error occurs during the sign in process
     */
    errorCallbackURL: "/error",
    /**
     * A URL to redirect if the user is newly registered
     */
    newUserCallbackURL: "/welcome",
    /**
     * disable the automatic redirect to the provider.
     * @default false
     */
    disableRedirect: true,
});
```

#Signout
#sign-out.tsx

```typescript
import { authClient } from "@/lib/auth-client"; //import the auth client

await authClient.signOut();
//or
await authClient.signOut({
    fetchOptions: {
        onSuccess: () => {
            router.push("/login"); // redirect to login page
        },
    },
});
```

//To be continue using better-auth session
https://www.better-auth.com/docs/basic-usage#get-session

//React Query

```bash
pnpm add @tanstack/react-query

#optional for development
pnpm add -D @tanstack/eslint-plugin-query
```
