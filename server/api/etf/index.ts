import prisma from '@@/lib/prisma';

export default defineEventHandler(async (event) => {
    if (event.node.req.method === 'GET') {
        return await prisma.$queryRaw`select * from etf_price_info`;
    }
});
