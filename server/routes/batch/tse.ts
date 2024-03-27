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
            tRate: stockDataObj.t_rate,
            regDate: today.toDate()
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
            tRate: stockDataObj.t_rate,
            eIcod: stockDataObj.e_icod,
            regDate: today.toDate()
        }).dataValues;
    }

    await models.stockPriceHistory.bulkCreate(stockPriceArr);
    return true;
}

// 종목 정보 입력 함수
export const runJpStockInfoBatch: runStockBatch = async (accessToken: string) => {
    const today = dayjs();
    let dataListArray: any[];

    // ETF 신규데이터 기타정보 가져오기(op.is가 잘 안되서 쿼리 직접실행)
    dataListArray = await sequelize.query(`select * from etf_list where STD_PDNO is null`, {
        type: QueryTypes.SELECT
    });

    for (let i = 0; i < dataListArray.length; i++) {
        const stockObj = dataListArray[i];
        const stockDataObj = await getKisInfoApiData(market, stockObj.stock_code, accessToken);

        await models.etfList.update({
            stdPdno : stockDataObj.std_pdno,
            tradingLot : stockDataObj.buy_unit_qty,
            modDate: today.toDate()
        }, {
            where: { stockCode: stockObj.stock_code }
        });
    }

    // 종목별 신규데이터 기타정보 가져오기
    dataListArray = await sequelize.query(`select * from stock_list where STD_PDNO is null`, {
        type: QueryTypes.SELECT
    });

    for (let i = 0; i < dataListArray.length; i++) {
        const stockObj = dataListArray[i];
        const stockDataObj = await getKisInfoApiData(market, stockObj.stock_code, accessToken);

        await models.stockList.update({
            stdPdno : stockDataObj.std_pdno,
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

