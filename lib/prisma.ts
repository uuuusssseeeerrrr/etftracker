import { PrismaClient } from '../.prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { env } from "prisma/config";

const isDevelopment = process.env.NODE_ENV === 'development';
const adapter = new PrismaMariaDb(env("DATABASE_URL"))
const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter,
    log: isDevelopment
      ? ['error', 'warn', 'info', 'query']
      : ['error'],
    errorFormat: 'pretty',
  });
}

declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

export default prisma
