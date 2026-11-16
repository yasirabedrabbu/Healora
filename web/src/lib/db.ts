import { PrismaClient } from "@prisma/client";

/**
 * Single Prisma client for the app. In dev, Next.js hot-reloads modules,
 * so we stash the client on globalThis to avoid exhausting connections.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
