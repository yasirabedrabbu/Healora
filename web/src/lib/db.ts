import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Single Prisma client for the app.
 *
 * Prisma 7 (client v7.10.1) requires a driver adapter at instantiation —
 * `@prisma/adapter-pg` with the connection string from .env. In dev,
 * Next.js hot-reloads modules, so the client is stashed on globalThis
 * to avoid exhausting connections.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const adapter = new PrismaPg({
  connectionString:
    process.env.DATABASE_URL ?? "postgresql://localhost:5432/healora",
});

export const db = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
