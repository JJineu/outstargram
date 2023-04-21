import { User } from "@/model/user";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  // interface Session {
  //   user: {
  //     username: string;
  //   } & DefaultSession["user"];
  // }
  interface Session {
    user: User;
  }
}
