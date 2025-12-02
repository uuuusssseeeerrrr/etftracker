import prisma from '@@/lib/prisma';

export default defineEventHandler(async () => {
  return await prisma.etf_price_info.findMany();
});
