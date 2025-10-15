import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs';

const isDevelopment = process.env.NODE_ENV === 'development';

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: isDevelopment
      ? ['error','warn','info'] // 개발 환경에서는 모든 로그 로깅
      : ['error'], // 운영 환경에서는 에러만 로깅
    errorFormat: 'pretty',
  }).$extends({
    client: {
      $log: (s: string) => console.log(s)
    },
    query: {
      stockPriceHistory: {
        async findMany({ model, operation, args, query }: any) {
          if (args.where && args.where.regDate) {
            if (args.where.regDate.gte) {
              const gteDate = dayjs(args.where.regDate.gte);
              args.where.regDate.gte = gteDate.format();
            }

            if (args.where.regDate.lte) {
              const lteDate = dayjs(args.where.regDate.lte);
              args.where.regDate.lte = lteDate.format();
            }
          }

          return query(args)
        },
      },
    },
  });
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
