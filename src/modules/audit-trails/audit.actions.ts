import { headers } from "next/headers";
import { AuditLogParams } from "./audit.types";
import { createAuditTrails } from "./audit.data";

/**
 * Create an audit log entry for tracking user actions
 * @param params - Audit log parameters
 * @returns Promise<void>
 */
export const createAuditLog = async (params: AuditLogParams) => {
    const headerList = await headers();
    const ipAddress = headerList.get("x-forwarded-for") || "unknown";
    const userAgent = headerList.get("user-agent") || "unknown";

    try {
        await createAuditTrails({
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

/**
 * Log error events with stack trace
 */
export const logError = async (
    userId: string,
    controller: string,
    action: string,
    error: Error | unknown,
    details?: Record<string, any>
) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const stackTrace = error instanceof Error ? error.stack : undefined;

    await createAuditLog({
        userId,
        controller,
        action,
        isError: true,
        details: {
            errorMessage,
            ...details,
        },
        stackTrace,
    });
};
