import prisma from '@@/lib/prisma';

export default defineEventHandler(async () => {
    return await prisma.$queryRaw`select * from etf_price_info`;
});
