// src/types/next-auth.d.ts

import NextAuth from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name: string;
      role: Role; 
    };
  }

  interface User {
    email: string;
    name: string;
    role: Role; 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email: string;
    name: string;
    role: Role; 
  }
}