import {
    pgTable,
    serial,
    text,
    timestamp,
    boolean,
    primaryKey,
    uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./auth-schema"; // Ensure auth-schema uses uuid for id

// ==========================================
// 2. RBAC (ROLE BASED ACCESS CONTROL)
// ==========================================

export const roles = pgTable("roles", {
    id: serial("id").primaryKey(), // serial is the standard PG auto-increment
    name: text("name").notNull().unique(), // 'super_admin', 'store_admin', etc.
    description: text("description"),
});

export const userRoles = pgTable(
    "user_roles",
    {
        userId: uuid("user_id") // Must match the uuid type in auth-schema
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        roleId: serial("role_id")
            .notNull()
            .references(() => roles.id, { onDelete: "cascade" }),
    },
    (t) => [primaryKey({ columns: [t.userId, t.roleId] })]
);

// Relations remain largely the same regardless of dialect
export const usersRelations = relations(user, ({ many }) => ({
    roles: many(userRoles),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
    user: one(user, { fields: [userRoles.userId], references: [user.id] }),
    role: one(roles, { fields: [userRoles.roleId], references: [roles.id] }),
}));

// ==========================================
//  AUDIT-TRAILS
// ==========================================

export const auditTrails = pgTable("audit_trails", {
    id: serial("id").primaryKey(),

    userId: uuid("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),

    controller: text("controller").notNull(),
    action: text("action").notNull(),

    isError: boolean("is_error").default(false),

    details: text("details"),

    // IPv6 support works perfectly with text in PG
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),

    stackTrace: text("stack_trace"),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .defaultNow()
        .$onUpdate(() => new Date()), // PG equivalent of onUpdateNow
});

export const auditTrailRelations = relations(auditTrails, ({ one }) => ({
    user: one(user, {
        fields: [auditTrails.userId],
        references: [user.id],
    }),
}));
