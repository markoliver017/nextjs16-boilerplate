import { auditTrails } from "@/src/db/schema/schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export interface AuditLogParams {
    userId: string;
    controller: string;
    action: string;
    details?: Record<string, any>;
    isError?: boolean;
    stackTrace?: string;
}

export type AuditTrailsType = InferSelectModel<typeof auditTrails>;
export type NewAuditTrailsType = InferInsertModel<typeof auditTrails>;
