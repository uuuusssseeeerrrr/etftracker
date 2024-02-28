import dayjs from 'dayjs';

import { getKisApiData } from './kisApi';
import { runStockBatch } from '~/interface'
import { models } from '../../../models';

const market = "TSE";

export const runJpEtfBatch: runStockBatch = async (accessToken: string) => {
    const today = dayjs();
    const etfStockListArray = await models.etfList.findAll({
        where: {
            market
        }
    });

    const stockPriceArr = new Array(etfStockListArray.length);

    for (let i = 0; i < etfStockListArray.length; i++) {
        const stockObj = etfStockListArray[i].dataValues;
        const stockDataObj = await getKisApiData(market, stockObj.stockCode, accessToken);

        stockPriceArr[i] = new models.etfPriceHistory({
            market: 'TSE',
            stockCode: stockObj.stockCode,
            open: stockDataObj.open,
            high: stockDataObj.high,
            low: stockDataObj.low,
            price: stockDataObj.last,
            lastDayPrice: stockDataObj.base,
            h52P: stockDataObj.h52p,
            l52P: stockDataObj.l52p,
            tXprc: stockDataObj.t_xprc,
            tXdif: stockDataObj.t_xdif,
            tXrat: stockDataObj.t_xrat,
            pXprc: stockDataObj.p_xprc,
            pXdif: stockDataObj.p_xdif,
            pXrat: stockDataObj.p_xrat,
            tRate: stockDataObj.t_rate,
            regUnixtime: today.unix()
        }).dataValues;
    }

    await models.etfPriceHistory.bulkCreate(stockPriceArr);
    return true;
}

export const runJpStockBatch: runStockBatch = async (accessToken: string) => {
    const today = dayjs();
    const stockListArray = await models.stockList.findAll({
        where: {
            market
        }
    });

    const stockPriceArr = new Array(stockListArray.length);

    for (let i = 0; i < stockListArray.length; i++) {
        const stockObj = stockListArray[i].dataValues;
        const stockDataObj = await getKisApiData(market, stockObj.stockCode, accessToken);

        stockPriceArr[i] = new models.stockPriceHistory({
            market: 'TSE',
            stockCode: stockObj.stockCode,
            open: stockDataObj.open,
            high: stockDataObj.high,
            low: stockDataObj.low,
            price: stockDataObj.last,
            lastDayPrice: stockDataObj.base,
            tomv: stockDataObj.tomv,
            h52P: stockDataObj.h52p,
            l52P: stockDataObj.l52p,
            perx: stockDataObj.perx,
            pbrx: stockDataObj.pbrx,
            epsx: stockDataObj.epsx,
            bpsx: stockDataObj.bpsx,
            tXprc: stockDataObj.t_xprc,
            tXdif: stockDataObj.t_xdif,
            tXrat: stockDataObj.t_xrat,
            pXprc: stockDataObj.p_xprc,
            pXdif: stockDataObj.p_xdif,
            pXrat: stockDataObj.p_xrat,
            tRate: stockDataObj.t_rate,
            eIcod: stockDataObj.e_icod,
            regUnixtime: today.unix()
        }).dataValues;
    }

    await models.stockPriceHistory.bulkCreate(stockPriceArr);
    return true;
}
