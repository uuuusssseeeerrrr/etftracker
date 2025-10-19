import prisma from '@@/lib/prisma';

const pageSize = 100;

export default defineEventHandler(async (event) => {
  const rateIdx = Number(getRouterParam(event, 'rateIdx'));

  if (rateIdx) {
    return await prisma.rate.findMany({
      take: pageSize,
      skip: 1,
      cursor: {
        rate_idx: rateIdx,
      },
      orderBy: {
        rate_idx: 'asc',
      }
    });
  } else {
    return await prisma.rate.findMany({
      take: pageSize,
      orderBy: {
        rate_idx: 'desc',
      }
    });
  }
});
