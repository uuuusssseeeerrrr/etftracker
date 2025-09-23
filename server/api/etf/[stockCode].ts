import { sequelize, models } from "@@/models";
import { QueryTypes } from "sequelize";
import { etfList } from "@@/models/etfList";

type stockReturnData = {
    etfInfo?: etfList;
    stockInfo?: Object[];
};

export default defineEventHandler(async (event) => {
    if (event.node.req.method === 'GET') {
        const stockCode = getRouterParam(event, 'stockCode');
        const returnData: stockReturnData = {
            etfInfo: undefined,
            stockInfo: undefined
        };
    
        const etfListData = await models.etfList.findOne({
            where : {
                stockCode
            }
        });

        if(etfListData) {
            returnData.etfInfo = etfListData;
        } else {
            returnData.etfInfo = new etfList();
        }
        
    
        returnData.stockInfo = await sequelize.query(`select * from stock_price_info where etfStockCode = ?`, {
            type: QueryTypes.SELECT,
            replacements: [stockCode],
        });
        
        return returnData;
    } else {
        setResponseStatus(event, 405);
    }
});