import { PrismaClient } from '@prisma/client'

const isDevelopment = process.env.NODE_ENV === 'development';
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: isDevelopment
      ? ['error','warn','info', 'query']
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
