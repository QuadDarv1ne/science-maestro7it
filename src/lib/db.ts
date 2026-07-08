import { PrismaLibSql } from "@prisma/adapter-libsql"
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const connectionString = process.env.DATABASE_URL ?? "file:./dev.db"
const adapter = new PrismaLibSql({ url: connectionString })

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["query"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db