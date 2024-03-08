import dayjs from 'dayjs';

import { getKisApiData, getKisInfoApiData } from './kisApi';
import { runStockBatch } from '~/types'
import { models } from '../../../models';
import { sequelize } from "~/models";
import { QueryTypes } from "sequelize";

const market = "TSE";

// ETF 가격 입력 함수
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

// 주식 가격 입력 함수
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

// 종목 정보 입력 함수
export const runJpStockInfoBatch: runStockBatch = async (accessToken: string) => {
    const today = dayjs();

    // op.is null 오류 발생으로 직접 쿼리실행
    const stockListArray: any[] = await sequelize.query(`select * from stock_list where prdt_name is null`, {
        type: QueryTypes.SELECT
    });

    for (let i = 0; i < stockListArray.length; i++) {
        const stockObj = stockListArray[i];
        const stockDataObj = await getKisInfoApiData(market, stockObj.stock_code, accessToken);
        await models.stockList.update({
            trCrcyCd : stockDataObj.tr_crcy_cd,
            buyUnitQty : stockDataObj.buy_unit_qty,
            prdtName : stockDataObj.prdt_name.indexOf(']') > -1 ? stockDataObj.prdt_name.split(']')[1] : stockDataObj.prdt_name,
            modDate: today.toDate()
        }, {
            where: { stockCode: stockObj.stock_code }
        });
    }

    return true;
}