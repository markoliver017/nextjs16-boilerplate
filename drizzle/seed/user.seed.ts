import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import { user } from "@/src/db/schema/auth-schema";

async function main() {
    const db = drizzle(
        "postgresql://postgres:password@localhost:5432/my_nextjs_db"
    );
    await seed(db, { user });
}

main();
