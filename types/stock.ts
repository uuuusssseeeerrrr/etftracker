import type { etfListAttributes } from '~/models/etfList';
import type { stockListAttributes } from '~/models/stockList';
import type { stockPriceHistoryAttributes } from '~/models/stockPriceHistory';

interface priceDetailData {
    "rsym": string,
    "zdiv": string,
    "curr": string,
    "vnit": string,
    "open": string,
    "high": string,
    "low": string,
    "last": string,
    "base": string,
    "pvol": string,
    "pamt": string,
    "uplp": string,
    "dnlp": string,
    "h52p": string,
    "h52d": string,
    "l52p": string,
    "l52d": string,
    "perx": string,
    "pbrx": string,
    "epsx": string,
    "bpsx": string,
    "shar": string,
    "mcap": string,
    "tomv": string,
    "t_xprc": string,
    "t_xdif": string,
    "t_xrat": string,
    "p_xprc": string,
    "p_xdif": string,
    "p_xrat": string,
    "t_rate": string,
    "p_rate": string,
    "t_xsgn": string,
    "p_xsng": string,
    "e_ordyn":string,
    "e_hogau":string,
    "e_icod": string,
    "e_parp": string,
    "tvol": string,
    "tamt": string,
    "etyp_nm": string
}

interface stockInfoData {
    "std_pdno" : string,
    "tr_crcy_cd" : string,
    "buy_unit_qty" : string,
    "prdt_name" : string
}

interface kisdefaultResponse {
    "rt_cd": string,
    "msg_cd": string,
    "msg1": string
}

interface kisPriceDetailResponse extends kisdefaultResponse{
    "output": priceDetailData
}

interface kisPriceInfoResponse extends kisdefaultResponse {
    "output": stockInfoData,
}

interface runStockBatch {
    (accessToken: string): Promise<{}>;
}

interface gIEtfList extends etfListAttributes {}
interface gIStockList extends stockListAttributes {}
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

export type { runStockBatch, priceDetailData, kisPriceDetailResponse, kisPriceInfoResponse, stockInfoData, gIEtfList, gIStockList, gIStockPriceHistory, gIStockWeightInfo };