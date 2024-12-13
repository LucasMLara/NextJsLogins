import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./lib/db";
import { compareSync } from "bcrypt-ts";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy :'jwt',
  },
  providers: [Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize({ password, email }) {
      if (!email || !password) {
        return null;
      }

      const user = await db.user.findUnique({
        where: {
          email: email as string,
        },
      })
      if (!user) {
        return null;
      }

      const matches = compareSync(password as string, user.password ?? '');
      if (matches) {
        return user;
      }
      return null;
    }
  }),
  GitHub({})],
});



