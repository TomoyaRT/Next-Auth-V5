import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // Doc: https://authjs.dev/guides/upgrade-to-v5#edge-compatibility
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
