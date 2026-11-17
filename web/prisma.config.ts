import path from "node:path";

/**
 * Prisma 7 config: connection URL lives here, not in the schema file.
 * Loaded by the CLI (generate/migrate) and can be re-used by runtime
 * tooling. DATABASE_URL comes from .env (see .env.example).
 */
export default {
  schema: path.join(__dirname, "prisma/schema.prisma"),
  migrations: {
    path: path.join(__dirname, "prisma/migrations"),
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "postgresql://localhost:5432/healora",
  },
};
