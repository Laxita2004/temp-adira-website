import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        // Find user
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email.toLowerCase(),
          },
        });

        // User not found
        if (!user) {
          throw new Error("Invalid credentials");
        }

        // Email not verified
        if (!user.isEmailVerified) {
          throw new Error("Email not verified");
        }

        // Compare password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        // Return minimal user object
        return {
          id: user.email,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
/**
 * Custom API Error class
 * Used to throw structured errors from anywhere in backend logic
 */
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;

    // Maintains proper stack trace (important for debugging)
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Ensures user is authenticated
 * @returns user object from session
 * @throws ApiError (401) if not authenticated
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new ApiError("Unauthorized", 401);
  }

  return session.user;
}

/**
 * Ensures user has one of the allowed roles
 * @param allowedRoles array of roles allowed to access the route
 * @returns user object
 * @throws ApiError (403) if role not allowed
 */
export async function requireRole(allowedRoles: Role[]) {
  const user = await requireAuth();

  if (!allowedRoles.includes(user.role)) {
    throw new ApiError("Forbidden", 403);
  }

  return user;
}