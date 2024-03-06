import { sequelize } from "~/models";
import { QueryTypes } from "sequelize";
import { models } from '../../../models';
import { etfList } from "~/models/etfList";

type stockReturnData = {
    etfInfo?: etfList | null;
    stockInfo?: Object[];
};

export default defineEventHandler(async (event) => {
    if (event.node.req.method === 'GET') {
        const stockCode = getRouterParam(event, 'stockCode');
        const returnData: stockReturnData = {};
    
        returnData.etfInfo = await models.etfList.findOne({
            where : {
                stockCode
            }
        });
    
        returnData.stockInfo = await sequelize.query(`select * from price_info where etfStockCode = ?`, {
            type: QueryTypes.SELECT,
            replacements: [stockCode],
        });
    
        if(returnData.etfInfo?.dataValues.market) {
            switch(returnData.etfInfo?.dataValues.market) {
                case "TSE":
                    returnData.etfInfo.dataValues.market = `도쿄증권거래소(${returnData.etfInfo?.dataValues.market})`
                    break;
            }
        }
        
        return returnData;
    } else {
        setResponseStatus(event, 405);
    }
});