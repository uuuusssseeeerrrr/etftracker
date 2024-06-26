import type { etfListAttributes } from '~/models/etfList';
import type { stockListAttributes } from '~/models/stockList';
import type { stockPriceHistoryAttributes } from '~/models/stockPriceHistory';

interface gIEtfList extends etfListAttributes {}
interface gIStockList extends stockListAttributes {}
interface gIStockPriceHistory extends stockPriceHistoryAttributes {
    "regDateStr": string
}
interface gIStockWeightInfo {
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

export type { gIEtfList, gIStockList, gIStockPriceHistory, gIStockWeightInfo };