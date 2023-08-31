import { getJPStockData } from './jpStock';
import models from '../../models'

const getStockData = (countryCode: string) => {
    if (countryCode === "japan") {
        const query = `
        select * 
        from priceinfo
        where priceinfo.market = ${}
        and priceinfo.`;
    }
};

const saveStockData = async (countryCode: string, etfStockCode: string) => {
    if (countryCode === "japan") {
        const allStockList = await models.etfstocklist.findAll({
            where: {
                market: "TSE",
                etfStockCode
            }
        });

        for (const stockObj of allStockList) {
            const stockData = await getJPStockData(stockObj.stockCode);
            await models.stockpricehistory.create({
                market: stockObj.market,
                stockCode: stockObj.stockCode,
                priceDate: stockData.KYMD,
                priceTime: stockData.KHMS,
                openPrice: stockData.OPEN,
                lowPrice: stockData.LOW,
                highPrice: stockData.HIGH,
                price: stockData.LAST,
                betweenPrice: stockData.DIFF,
                priceSign: stockData.SIGN,
                betweenRate: stockData.RATE,
            });
        }
    }
};