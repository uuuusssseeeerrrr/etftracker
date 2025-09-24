import dayjs from 'dayjs';
import { models, sequelize } from '@@/models';
import { Op } from "sequelize";
import { stockApiResponse, StockWeightInfo } from '@@/types';

export default defineEventHandler(async (event) => {
    const slug = event.context.params?.slug;
    const market: string = slug?.split("/")[0].toUpperCase() as string;
    const stockCode: string = slug?.split("/")[1] as string;
    let stockData: stockApiResponse = {
        stockInfo: null,
        stockPriceHistory: null,
        weightInfo: null
    };

    stockData.stockInfo = await models.stockList.findOne({
        where: {
            stockCode
        }
    });

    stockData.stockPriceHistory = await models.stockPriceHistory.findAll({
        where: {
            [Op.and]: [
                { market },
                { stockCode },
                {
                    regDate: {
                        [Op.between]: [dayjs().add(9, 'hour').subtract(3, 'day').toDate(), dayjs().add(9, 'hour').toDate()]
                    }
                }
            ]
        },
        order: [
            ['regDate', 'DESC']
        ]
    });

    const etfStockListResult = await models.etfStockList.findAll({
        attributes: [
            'market',
            'etfStockCode',
            'stockCode',
            [sequelize.fn('CONCAT', sequelize.fn('FORMAT', sequelize.literal('etf_percent * 100'), 2), '%'), 'etfPercent']
        ],
        where: {
            market,
            stockCode
        },
        include: [{
            model: models.etfList,
            as: "etfList",
            attributes: ['etfName', 'companyName', 'tradingLot', 'trustFeeRate', 'stdPdno'],
            required: true
        }]
    });

    stockData.weightInfo = etfStockListResult.map((item) =>
        item.get({ plain: true }) as StockWeightInfo
    );

    return stockData;
});
