import { defineEventHandler, readBody } from 'h3';

import { getJPStockData } from './jpStock';
import models from '../../../models';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default defineEventHandler(async (event) => {
    if (event.node.req.method === 'POST') {
        const body = await readBody(event);

        if (body.market.includes("TOKYO")) {
            let allStockList;
            const market = body.market;

            if (body.code) {
                allStockList = await models.etfstocklist.findAll({
                    where: {
                        market,
                        etfStockCode: body.code,
                    }
                });
            } else {
                allStockList = await models.etfstocklist.findAll({
                    where: {
                        market
                    }
                });
            }

            if (allStockList.length > 0) {
                return await getJPStockData(allStockList);
            }
        }
    }
});
