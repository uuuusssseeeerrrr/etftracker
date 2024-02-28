import { defineEventHandler, getQuery } from 'h3';

// eslint-disable-next-line import/namespace
import { runJpEtfBatch, runJpStockBatch } from './tse';
import { getKisAccessToken } from './kisApi';

export default defineEventHandler(async (event) => {
    if (event.node.req.method === 'GET') {
        const queryParam = await getQuery(event);
        
        if (queryParam.market === "TSE") {
            const token = await getKisAccessToken();

            await runJpEtfBatch(token);
            await runJpStockBatch(token);
        }
    }
});
