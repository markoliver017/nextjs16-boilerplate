import { user } from "@/src/db/schema/auth-schema";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type UserType = InferSelectModel<typeof user>;
export type NewUserType = InferInsertModel<typeof user>;
