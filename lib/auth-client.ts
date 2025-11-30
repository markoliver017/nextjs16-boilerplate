/**  If you're using a different base path other than /api/auth make sure to pass the whole URL including the path. (e.g. http://localhost:3000/custom-path/auth)

Tip: You can also export specific methods if you prefer: 
export const { signIn, signUp, useSession } = createAuthClient()
 */

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const { signIn, signUp, useSession, signOut } = authClient;
