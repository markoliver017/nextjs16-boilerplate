import {
    int,
    mysqlTable,
    serial,
    varchar,
    timestamp,
    boolean,
    mysqlEnum,
    text,
    primaryKey,
} from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";
import { user } from "./auth-schema";

// ==========================================
// 2. RBAC (ROLE BASED ACCESS CONTROL)
// ==========================================

export const roles = mysqlTable("roles", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 50 }).notNull().unique(), // 'super_admin', 'store_admin', 'employee'
    description: varchar("description", { length: 255 }),
});

export const userRoles = mysqlTable(
    "user_roles",
    {
        userId: varchar("user_id", { length: 36 })
            .notNull()
            .references(() => user.id),
        roleId: int("role_id")
            .notNull()
            .references(() => roles.id),
    },
    (t) => [primaryKey({ columns: [t.userId, t.roleId] })]
);
// ==========================================
// 3. CORE CONFIGURATION (Events & Stores)
// ==========================================

// The "Event" (e.g., 2024 Christmas Grocery)
export const incentiveEvents = mysqlTable("incentive_events", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(),
    registrationStart: timestamp("registration_start").notNull(), // Dec 09 [cite: 10]
    registrationEnd: timestamp("registration_end").notNull(), // Dec 10 [cite: 10]
    redemptionStart: timestamp("redemption_start").notNull(), // Dec 16 [cite: 13]
    redemptionEnd: timestamp("redemption_end").notNull(), // Dec 22 [cite: 13]
    isActive: boolean("is_active").default(true),
});

// Store Locations (WalterMart, Puregold)
export const storeLocations = mysqlTable("store_locations", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(), // e.g., "WalterMart - North Edsa"
    address: text("address").notNull(),
    contactNumber: varchar("contact_number", { length: 50 }),
    storeChain: mysqlEnum("store_chain", [
        "WalterMart",
        "Puregold",
        "PCMC_HQ",
    ]).notNull(),

    // LOGIC: Links a User (Store Admin) to this location
    // This allows checking: IF user has role 'store_admin' AND is in this column -> ACCESS GRANTED
    storeAdminUserId: varchar("store_admin_user_id", { length: 36 }).references(
        () => user.id
    ),
});

// ==========================================
// 4. ITEM MANAGEMENT & PACKAGES
// ==========================================

// Master Catalog of individual items (Ham, Rice, Cheese)
export const incentiveItems = mysqlTable("incentive_items", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 255 }).notNull(), // "Luncheon Meat"
    description: text("description"), // "340g, 25% lite"
    price: int("price").default(0), // Useful for budget reporting
    imageUrl: text("image_url"), // Optional for visual check
});

// The Bundles (e.g., "Christmas Grocery Package" or "Rice Sack")
export const packages = mysqlTable("packages", {
    id: int("id").primaryKey().autoincrement(),
    eventId: int("event_id")
        .notNull()
        .references(() => incentiveEvents.id),
    name: varchar("name", { length: 100 }).notNull(),

    // Eligibility: Who can see this package?
    // [cite: 11] Mentions Consultants, [cite: 15] Mentions Active/Job Orders
    eligibilityStatus: mysqlEnum("eligibility_status", [
        "Active",
        "Retiree",
        "Consultant",
        "Job Order",
        "All",
    ]),

    description: text("description"),
});

// The Recipe: What is inside a package?
// e.g., Grocery Package contains 2 Hams, 1 Cheese
export const packageItems = mysqlTable(
    "package_items",
    {
        packageId: int("package_id")
            .notNull()
            .references(() => packages.id),
        itemId: int("item_id")
            .notNull()
            .references(() => incentiveItems.id),
        quantity: int("quantity").notNull().default(1),
    },
    (t) => [primaryKey({ columns: [t.packageId, t.itemId] })]
);

// The Rules: Which stores can fulfill which package?
// [cite: 3] Grocery -> WalterMart, [cite: 4] Rice -> Puregold
export const packageStoreAssignments = mysqlTable("package_store_assignments", {
    id: int("id").primaryKey().autoincrement(),
    packageId: int("package_id")
        .notNull()
        .references(() => packages.id),
    storeId: int("store_id")
        .notNull()
        .references(() => storeLocations.id),
});

// ==========================================
// 5. EMPLOYEE & TRANSACTIONS
// ==========================================

// The Masterlist (Imported Excel Data)
export const employees = mysqlTable("employees", {
    id: varchar("id", { length: 50 }).primaryKey(), // The Employee ID (e.g., "EMP-1001")
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(), // Used for validation
    eligibilityStatus: mysqlEnum("eligibility_status", [
        "Active",
        "Retiree",
        "Consultant",
        "Job Order",
    ]).notNull(),

    // LOGIC: This starts NULL.
    // It is filled when an existing Better-Auth User "Claims" this employee record.
    userId: varchar("user_id", { length: 36 })
        .unique()
        .references(() => user.id),
});

// The Registration/Redemption Record
export const registrations = mysqlTable("registrations", {
    id: int("id").primaryKey().autoincrement(),

    // Links
    userId: varchar("user_id", { length: 36 })
        .notNull()
        .references(() => user.id),
    employeeId: varchar("employee_id", { length: 50 })
        .notNull()
        .references(() => employees.id),
    packageId: int("package_id")
        .notNull()
        .references(() => packages.id),
    selectedStoreId: int("selected_store_id")
        .notNull()
        .references(() => storeLocations.id),

    // Security [cite: 17]
    qrToken: varchar("qr_token", { length: 64 }).notNull().unique(),

    // Status Flow
    status: mysqlEnum("status", [
        "Registered",
        "Redeemed",
        "Forfeited",
    ]).default("Registered"),

    // Audit Trail
    createdAt: timestamp("created_at").defaultNow(),
    redeemedAt: timestamp("redeemed_at"),

    // Who scanned it? (Store Admin)
    redeemedByUserId: varchar("redeemed_by_user_id", { length: 36 }).references(
        () => user.id
    ),
});

// ==========================================
// 6. RELATIONS (For Easy Drizzle Queries)
// ==========================================

export const usersRelations = relations(user, ({ many, one }) => ({
    roles: many(userRoles),
    employeeProfile: one(employees, {
        fields: [user.id],
        references: [employees.userId],
    }),
    registrations: many(registrations, { relationName: "user_registrations" }),
    managedStore: one(storeLocations, {
        fields: [user.id],
        references: [storeLocations.storeAdminUserId],
    }),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
    user: one(user, { fields: [userRoles.userId], references: [user.id] }),
    role: one(roles, { fields: [userRoles.roleId], references: [roles.id] }),
}));

export const employeesRelations = relations(employees, ({ one, many }) => ({
    user: one(user, { fields: [employees.userId], references: [user.id] }),
    registrations: many(registrations),
}));

export const packagesRelations = relations(packages, ({ many, one }) => ({
    items: many(packageItems),
    validStores: many(packageStoreAssignments),
    event: one(incentiveEvents, {
        fields: [packages.eventId],
        references: [incentiveEvents.id],
    }),
}));

export const packageItemsRelations = relations(packageItems, ({ one }) => ({
    package: one(packages, {
        fields: [packageItems.packageId],
        references: [packages.id],
    }),
    item: one(incentiveItems, {
        fields: [packageItems.itemId],
        references: [incentiveItems.id],
    }),
}));

export const registrationsRelations = relations(registrations, ({ one }) => ({
    employee: one(employees, {
        fields: [registrations.employeeId],
        references: [employees.id],
    }),
    package: one(packages, {
        fields: [registrations.packageId],
        references: [packages.id],
    }),
    selectedStore: one(storeLocations, {
        fields: [registrations.selectedStoreId],
        references: [storeLocations.id],
    }),
    redeemedBy: one(user, {
        fields: [registrations.redeemedByUserId],
        references: [user.id],
    }),
}));

// ==========================================
//  AUDIT-TRAILS
// ==========================================

export const auditTrails = mysqlTable("audit_trails", {
    id: int("id").primaryKey().autoincrement(),

    // UUID handling in MySQL is usually done via varchar(36)
    userId: varchar("user_id", { length: 36 })
        .notNull()
        // This handles the onDelete: 'CASCADE' logic at the database level
        .references(() => user.id, { onDelete: "cascade" }),

    controller: varchar("controller", { length: 255 }).notNull(),
    action: varchar("action", { length: 255 }).notNull(),

    isError: boolean("is_error").default(false),

    details: text("details"),

    // 45 is standard length for IPv6 support
    ipAddress: varchar("ip_address", { length: 45 }),

    // Sequelize STRING defaults to 255.
    // If your User Agents are longer, consider using text() instead.
    userAgent: varchar("user_agent", { length: 255 }),

    stackTrace: text("stack_trace"),

    // Drizzle equivalent of { timestamps: true }
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

// Define Application-level Relations
export const auditTrailRelations = relations(auditTrails, ({ one }) => ({
    user: one(user, {
        fields: [auditTrails.userId],
        references: [user.id],
    }),
}));
