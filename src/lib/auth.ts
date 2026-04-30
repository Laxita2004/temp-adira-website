import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return session.user;
}

export async function requireRole(allowedRoles: Role[]) {
  const user = await requireAuth();

  if (!allowedRoles.includes(user.role)) {
    throw NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }

  return user;
}