import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Role } from "@prisma/client";

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