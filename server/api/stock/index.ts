import { defineEventHandler, readBody } from 'h3';

import { getJPStockData } from './jpStock';
import models from '../../../models';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default defineEventHandler(async (event) => {
    if (event.node.req.method === 'POST') {
        const body = await readBody(event);

        if (body.country === "japan") {
            const allStockList = await models.etfstocklist.findAll({
                where: {
                    market: "TSE",
                    etfStockCode: body.code,
                }
            });

            // 주식데이터 가져오기
            // for (let i = 0; i < allStockList.length; i++) {
            //     const stockObj = allStockList[i].dataValues;

            if(allStockList.length > 0) {
                return await getJPStockData(allStockList);
            }
        }
    }
});
