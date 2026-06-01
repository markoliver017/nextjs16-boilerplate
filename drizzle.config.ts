import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";
dotenv.config({ path: ".env" });

export default defineConfig({
    out: "./drizzle",
    schema: ["./src/db/schema/auth-schema.ts", "./src/db/schema/schema.ts"],
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
