"use server";

import { db } from "@/src/db";
import { auditTrails } from "@/src/db/schema/schema";
import { headers } from "next/headers";

interface AuditLogParams {
    userId: string;
    controller: string;
    action: string;
    details?: Record<string, any>;
    isError?: boolean;
    stackTrace?: string;
}

export const createAuditLog = async (params: AuditLogParams) => {
    const headerList = await headers();
    const ipAddress = headerList.get("x-forwarded-for") || "unknown";
    const userAgent = headerList.get("user-agent") || "unknown";

    try {
        await db.insert(auditTrails).values({
            ...params,
            details: params.details
                ? JSON.stringify(params.details)
                : undefined,
            ipAddress,
            userAgent,
        });
    } catch (error) {
        console.error("Failed to create audit log:", error);
        // Optionally, handle the error (e.g., log to a different service)
    }
};
