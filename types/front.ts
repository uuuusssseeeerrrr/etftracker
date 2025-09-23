import type { stockListAttributes } from '../models/stockList';
import type { stockPriceHistoryAttributes } from '../models/stockPriceHistory';

interface StockList extends stockListAttributes { }
interface StockPriceHistory extends stockPriceHistoryAttributes {
    "regDateStr": string
}
interface StockWeightInfo {
    "market": string,
    "etfStockCode": string,ß
    "stockCode": string,
    "etfPercent": string,
    "etfList": {
        "etfName": string,
        "companyName": string,
        "tradingLot": string,
        "trustFeeRate": string
    }
}

interface TableHeader {
    "key": string;
    "label": string;
}

export type { StockList, StockPriceHistory, StockWeightInfo, TableHeader };