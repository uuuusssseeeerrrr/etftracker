import { WebSocket } from 'ws';

import { etfstocklist } from '../../../models/etfstocklist';
import { StockReqData } from '../interface/StockReqData';

export const getJPStockData = function (allStockList: etfstocklist[], socketKey: string) {
    if (allStockList.length === 0) {
        return {};
    }

    let start = 0;
    const end = allStockList.length - 1;
    const ws = new WebSocket("ws://ops.koreainvestment.com:21000/tryitout/HDFSCNT0");
    const resultMap = new Map<string, object>;
    const testDataArr: string[] = [];

    for (let i = 0; i < end; i++) {
        testDataArr.push(allStockList[i].dataValues.stockCode);
    }

    ws.on('open', () => {
        ws.send(`{"header":{"approval_key": "${socketKey}","custtype":"P","tr_type":"1","content-type":"utf-8"},
                    "body":{"input":{"tr_id":"HDFSCNT0","tr_key":"DTSE${allStockList[0].dataValues.stockCode}"}}}`);
    });

    ws.on('message', (data) => {
        const dataStr = data.toString();
        console.log(dataStr);

        if(dataStr.includes("|")) {
            const mixedStrData = dataStr.substring(15);
            
            if (mixedStrData.includes("^")) {
                const stockData = new StockReqData(mixedStrData);
                resultMap.set(stockData.SYMB, stockData);
                console.log(start, stockData);
                // await models.stockpricehistory.create({
                //     market: stockObj.market,
                //     stockCode: stockObj.stockCode,
                //     priceDate: stockData.KYMD,
                //     priceTime: stockData.KHMS,
                //     openPrice: stockData.OPEN,
                //     lowPrice: stockData.LOW,
                //     highPrice: stockData.HIGH,
                //     price: stockData.LAST,
                //     betweenPrice: stockData.DIFF,
                //     priceSign: stockData.SIGN,
                //     betweenRate: stockData.RATE,
                // });
    
                start++;
                ws.send(`{"header":{"approval_key": "${socketKey}","custtype":"P","tr_type":"1","content-type":"utf-8"},
                    "body":{"input":{"tr_id":"HDFSCNT0","tr_key":"DTSE${allStockList[start].dataValues.stockCode}"}}}`);
    
                if (resultMap.get(stockData.SYMB)) {
                    console.log(start, "Called!!");
    
                    ws.send(`{"header":{"approval_key": "${socketKey}","custtype":"P","tr_type":"2","content-type":"utf-8"},
                    "body":{"input":{"tr_id":"HDFSCNT0","tr_key":"DTSE${stockData.SYMB}"}}}`);
    
                    if (start >= end) {
                        console.log("end!");
                        ws.close();
                    }
                }
            }
        } else if(dataStr.includes("PINGPONG")) {
            ws.ping();
        }
    });

    ws.on('close', () => {
        console.log(testDataArr);
        console.log(resultMap);
        return resultMap;
    });
}
