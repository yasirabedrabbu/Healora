import path from "node:path";

/**
 * Prisma 7 config: connection URLs live here, not in the schema file.
 * Loaded by the CLI (generate/migrate) and can be re-used by runtime tooling.
 *
 * Neon best practice (per neon-postgres skill):
 * - Runtime app traffic uses the POOLED url (DATABASE_URL, PgBouncer, -pooler host).
 * - Migrations need SESSION-level state → use the DIRECT url
 *   (DATABASE_URL_UNPOOLED, no -pooler) or Prisma Migrate breaks with
 *   "prepared statement already exists" / read-only-transaction errors.
 */
const config = {
  schema: path.join(__dirname, "prisma/schema.prisma"),
  migrations: {
    path: path.join(__dirname, "prisma/migrations"),
  },
  datasource: {
    url:
      process.env.DATABASE_URL_UNPOOLED ??
      process.env.DATABASE_URL ??
      "postgresql://localhost:5432/healora",
  },
};

export default config;
