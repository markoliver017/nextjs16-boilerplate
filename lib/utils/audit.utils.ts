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

/**
 * Log admin mutations (create, update, delete)
 */
export const logAdminMutation = async (
    userId: string,
    action: "create" | "update" | "delete",
    resourceType: string,
    resourceId?: number | string,
    details?: Record<string, any>
) => {
    await createAuditLog({
        userId,
        controller: "admin",
        action: `${action}_${resourceType}`,
        details: {
            resourceType,
            resourceId,
            ...details,
        },
    });
};

/**
 * Log authentication events
 */
export const logAuthEvent = async (
    userId: string,
    action:
        | "sign_up"
        | "sign_in"
        | "sign_out"
        | "password_reset"
        | "email_verify",
    details?: Record<string, any>
) => {
    await createAuditLog({
        userId,
        controller: "auth",
        action,
        details,
    });
};

/**
 * Log employee registration events
 */
export const logEmployeeAction = async (
    userId: string,
    action: "register" | "link_employee" | "profile_update",
    details?: Record<string, any>
) => {
    await createAuditLog({
        userId,
        controller: "employee",
        action,
        details,
    });
};

/**
 * Log package registration and redemption
 */
export const logRegistrationAction = async (
    userId: string,
    action: "create_registration" | "redeem_package" | "forfeit_package",
    registrationId?: number,
    details?: Record<string, any>
) => {
    await createAuditLog({
        userId,
        controller: "registrations",
        action,
        details: {
            registrationId,
            ...details,
        },
    });
};

/**
 * Log store admin actions
 */
export const logStoreAdminAction = async (
    userId: string,
    action:
        | "view_registrations"
        | "view_packages"
        | "view_package_details"
        | "validate_qr"
        | "confirm_redemption"
        | "update_package_status",
    details?: Record<string, any>
) => {
    await createAuditLog({
        userId,
        controller: "store_admin",
        action,
        details,
    });
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
