import { defineEventHandler } from 'h3';

import { runJpStockInfoBatch } from './tse';
import { getKisAccessToken } from './kisApi';

export default defineEventHandler(async (event) => {
    if (event.node.req.method === 'GET') {
        const token = await getKisAccessToken();
        await runJpStockInfoBatch(token);
    }
});