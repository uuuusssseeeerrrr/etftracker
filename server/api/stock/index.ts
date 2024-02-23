/* eslint-disable import/namespace */
import { defineEventHandler, getQuery } from 'h3';

import { getJPStockData } from './tse';

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default defineEventHandler(async (event) => {
    const params = await getQuery(event);

    console.log(params);

    if(!params.market || !params.etfStockCode) {
        setResponseStatus(event, 204);
        return {msg : '필수값이 없습니다'};
    }

    if (event.node.req.method === 'GET') {
        if (params.market === "TSE") {
            return await getJPStockData(params.market, String(params.etfStockCode));
        }
    }
});
