import type { stockListAttributes } from '#models/stockList';
import { etfStockList } from '#models/etfStockList';
import type { etfList, stockPriceHistory } from '#models/init-models';

interface StockList extends stockListAttributes { }
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
    stockPriceHistory: stockPriceHistory[] | null | undefined,
    weightInfo: StockWeightInfo[] | null | undefined
}

interface stockPriceInfo {
    marketCode: string;
    etfStockCode: string;
    etfName: string;
    stockCode: string;
    stockNm: string;
    open: string;
    high: string;
    low: string;
    price: string;
    lastDayPrice: string;
    tomv: string;
    h52p: string;
    l52p: string;
    perx: string;
    pbrx: string;
    epsx: string;
    bpsx: string;
    tXprc: string;
    tXdif: string;
    tXrat: string;
    tRate: string;
    eIcod: string;
    buyUnitQty: string;
    trCrcyCd: string;
    prdtName: string;
    etfPercent: string;
    regDate: string;
}

interface stockReturnData {
    etfInfo?: etfList;
    stockInfo?: stockPriceInfo[];
};

export type { StockList, StockWeightInfo, stockApiResponse, stockPriceInfo, stockReturnData, stockPriceHistory as StockPriceHistory };