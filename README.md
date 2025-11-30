# Next.js Boilerplate

## Installation

```bash
npx create-next-app@latest
```

## Usage

```bash
npm run dev
```

## Shadcn

```bash
pnpm dlx shadcn@latest init
```

# Add Shadcn components

```bash
pnpm dlx shadcn@latest add button
```

# Drizzle

```bash
pnpm add drizzle-orm mysql2 dotenv
pnpm add -D drizzle-kit tsx
```

# Drizzle connection

```typescript
// src/db/index.ts
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.development" });

const poolConnection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
drizzle({ client: poolConnection });

// or if you need client connection
async function main() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    drizzle({ client: connection });
}
main();
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
