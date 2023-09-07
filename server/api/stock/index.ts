import { defineEventHandler, readBody, send } from 'h3';

import { getJPStockData } from './jpStock';
import { getKisSocketKey } from './kisSocket';
import models from '../../../models';

export default defineEventHandler(async (event) => {
    if (event.node.req.method === 'POST') {

        const body = await readBody(event);

        if (body.country === "japan") {
            const allStockList = await models.etfstocklist.findAll({
                where: {
                    market: "NAS",
                    etfStockCode: body.code
                }
            });

            // 소켓키, 소켓 생성
            const socketKey = await getKisSocketKey();

            // 주식데이터 가져오기
            // for (let i = 0; i < allStockList.length; i++) {
            //     const stockObj = allStockList[i].dataValues;
            await getJPStockData(allStockList, socketKey);
        }

        send(event);
    }
});
