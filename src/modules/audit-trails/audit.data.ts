import { auditTrails } from "@/src/db/schema/schema";

import { db } from "@/src/db";
import { NewAuditTrailsType } from "./audit.types";

export const createAuditTrails = async (values: NewAuditTrailsType) => {
    await db.insert(auditTrails).values(values).returning();
};
