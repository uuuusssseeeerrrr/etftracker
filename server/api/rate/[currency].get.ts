import prisma from '@@/lib/prisma';
import type { rateChartSQLResult, rateChartResponse } from '@@/types/rate';

export default defineEventHandler(async (event) => {
  const currency = getRouterParam(event, 'currency');

  if (currency === undefined ||
    (currency !== 'USD' && currency !== 'JPY' && currency !== 'EUR' && currency !== 'SGD')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid currency parameter'
    });
  }

  const rateChartData = await prisma.$queryRawUnsafe<rateChartSQLResult[]>(`
    WITH DAT_TABLE AS (SELECT DATE(REG_DATE) REGDATE,
                          MIN(RATE_IDX)  OPEN_RATE_IDX,
                          MAX(RATE_IDX)  CLOSE_RATE_IDX
                        FROM rate
                        WHERE rate.REG_DATE BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND DATE_ADD(CURDATE(), INTERVAL 1 DAY)
                        GROUP BY DATE(REG_DATE))
    SELECT DATE(rate.REG_DATE)                                                     DAY,
          MAX(${currency}_RATE)                                                    MAX_RATE,
          MIN(${currency}_RATE)                                                    MIN_RATE,
          MAX(CASE WHEN RATE_IDX = DAT_TABLE.OPEN_RATE_IDX THEN ${currency}_RATE END)  AS OPEN_RATE,
          MAX(CASE WHEN RATE_IDX = DAT_TABLE.CLOSE_RATE_IDX THEN ${currency}_RATE END) AS CLOSE_RATE
    FROM rate
    JOIN DAT_TABLE ON DATE(rate.REG_DATE) = DAT_TABLE.REGDATE
    WHERE rate.REG_DATE BETWEEN DATE_SUB(CURDATE(), INTERVAL 1 YEAR) AND DATE_ADD(CURDATE(), INTERVAL 1 DAY)
    GROUP BY DATE(rate.REG_DATE)
  `);

  return rateChartData.map((item): rateChartResponse => {
    return {
      x: item.DAY ? item.DAY.toString() : '',
      y: [
        item.OPEN_RATE ? item.OPEN_RATE : '0',
        item.MAX_RATE ? item.MAX_RATE : '0',
        item.MIN_RATE ? item.MIN_RATE : '0',
        item.CLOSE_RATE ? item.CLOSE_RATE : '0'
      ],
    };
  });
});