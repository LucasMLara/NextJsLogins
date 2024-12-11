import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./lib/db";
import { compareSync } from "bcrypt-ts";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  providers: [Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: {  label: "Password", type: "password" },
    },
    async authorize({password, email})  {
      if(!email || !password) {
        return null;
      }

      const user = await db.user.findUnique({
        where: {
          email: email as string,
        },
      })
      if(!user) {
        return null;
      }

      const matches = compareSync(password as string, user.password ?? '');
      if(matches) {
        return user;
      }
      return null;
    }
  })],
});



