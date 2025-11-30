# MIGRATIONS

Edit schema →
Generate migration →
Review migration →
Run migration →
Commit migration →
Deploy

# Proper workflow recap

Step 1 — Edit schema
You update your TS schema files manually.
Step 2 — Generate migration
npx drizzle-kit generate
Step 3 — Run migration
npx drizzle-kit up
Step 4 — Database is updated
Now your database matches your schema.

# Use drizzle-kit push (Closest to auto-sync)

npx drizzle-kit push

What it does:
Compares your TS schema to the database
Auto-generates SQL migration
Automatically applies changes
No migration files are created

# Use push --force (DANGEROUS but works like "sync")

npx drizzle-kit push --force

What it does:
Drops and recreates tables to match your schema
Forces sync even when destructive
Completely resets database structure
