import type { stockListAttributes } from '../models/stockList';
import { etfStockList } from '#models/etfStockList';
import type { stockPriceHistoryAttributes } from '../models/stockPriceHistory';

interface StockList extends stockListAttributes { }
interface StockPriceHistory extends stockPriceHistoryAttributes {
    "regDateStr": string
}
interface StockWeightInfo extends etfStockList {
    "market": string,
    "etfStockCode": string,
    "stockCode": string,
    "etfPercent": string,
    "etfList": {
        "etfName": string,
        "companyName": string,
        "tradingLot": string,
        "trustFeeRate": string
    }
}

interface stockApiResponse {
    stockInfo: StockList | null | undefined,
    stockPriceHistory: stockPriceHistoryAttributes[] | null | undefined,
    weightInfo: StockWeightInfo[] | null | undefined
}

export type { StockList, StockPriceHistory, StockWeightInfo, stockApiResponse };