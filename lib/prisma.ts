import { PrismaClient } from '@prisma/client'

const isDevelopment = process.env.NODE_ENV === 'development';

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: isDevelopment
    ? [
        { emit: 'event', level: 'query' }, 
        'error', 
        'warn'
      ]
    : ['error'], // 운영 환경에서는 에러만 로깅
    errorFormat: 'pretty',
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

prisma.$on('query', (e) => {
  console.log(`\n================================`);
  console.log(`[PRISMA QUERY]`);
  console.log(`SQL: ${e.query}`);
  console.log(`Params: ${e.params}`);
  console.log(`Duration: ${e.duration}ms`);
  console.log(`================================\n`);
});

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
