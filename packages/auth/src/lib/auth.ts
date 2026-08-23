import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "@repo/storage";
import { account, session, user, verification } from "@repo/storage/schema/auth.schema";
import { type BetterAuthOptions, betterAuth } from "better-auth";
import { admin as adminPlugin, bearer, openAPI, username } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { ac, adminRole, customRole, userRole } from "./permission";
import { env } from "@repo/shared";

const schema = {
  session,
  account,
  verification,
  user,
};

const authOptions: BetterAuthOptions = {
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
    // customSyntheticUser: ({ coreFields, additionalFields, id }) => ({
    // 	...coreFields,
    // 	role: "user", // or your configured defaultRole
    // 	banned: false,
    // 	banReason: null,
    // 	banExpires: null,
    // 	...additionalFields,
    // 	id,
    // }),
  },
  trustedOrigins: ["https://*.ngrok-free.app"],
  plugins: [
    openAPI(),
    bearer(),
    username(),
    adminPlugin({
      ac,
      roles: {
        admin: adminRole,
        user: userRole,
        custom: customRole,
        superadmin: adminRole,
      },
      adminRoles: ["admin", "superadmin"],
    }),
    tanstackStartCookies(),
  ],
} satisfies BetterAuthOptions;

export const auth = betterAuth(authOptions) as ReturnType<typeof betterAuth<typeof authOptions>>;

export type Session = typeof auth.$Infer.Session;
