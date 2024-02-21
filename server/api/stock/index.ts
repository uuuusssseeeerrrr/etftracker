/* eslint-disable import/namespace */
import { defineEventHandler, readBody } from 'h3';

import { getJPStockData } from './tse';

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default defineEventHandler(async (event) => {
    if (event.node.req.method === 'POST') {
        const body = await readBody(event);

        if (body.market.includes("TSE")) {
            return await getJPStockData(body.market, body.etfStockCode);
        }
    }
});
