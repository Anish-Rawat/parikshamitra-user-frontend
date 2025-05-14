// next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
      accessToken?: string;
      refreshToken?: string;
      status?: "active" | "inactive";
    } & DefaultSession["user"]; // Keep the default session user properties while adding custom ones
  }

  interface User {
    refreshToken?: string;
    userName?: string;
    email?: string;
    accessToken?: string;
    _id?: string;
    status?: "active" | "inactive";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name?: string;
    email?: string;
    picture?: string;
    accessToken?: string;
    refreshToken?: string;
    id?: string;
  }
}

declare module "next-auth" {
  interface Profile {
    picture?: string; // Extend the Profile type to include the picture property
  }
}
