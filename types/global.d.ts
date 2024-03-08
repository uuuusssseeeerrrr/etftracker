import type { etfListAttributes } from '~/models/etfList';
import type { stockListAttributes } from '~/models/stockList';
import type { stockPriceHistoryAttributes } from '~/models/stockPriceHistory';

declare global {
    interface gIEtfList extends etfListAttributes {}
    interface gIStockList extends stockListAttributes {}
    interface gIStockPriceHistory extends stockPriceHistoryAttributes {}
    interface gIStockPriceHistory extends stockPriceHistoryAttributes {}
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
}