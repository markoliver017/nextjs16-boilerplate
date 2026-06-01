export interface UserSession {
    userId: string;
    name?: string;
    email: string;
    roleId: number | string;
    roleName: string;
    roleLevel: string | number;
}
