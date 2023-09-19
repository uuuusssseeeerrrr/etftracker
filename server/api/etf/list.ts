import { defineEventHandler, readBody } from 'h3';

import models from '../../../models';

export default defineEventHandler(async (event) => {
    if (event.node.req.method === 'GET') {
        const body = await readBody(event);
        const market = body.market;
        
        return await models.etf.findAll({
            where: {
                market
            }
        });
    }
});
