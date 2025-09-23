import dayjs from 'dayjs';
import { getKisAccessToken, getKisInfoApiData } from './kisApi';
import { models, sequelize } from "@@/models";
import { QueryTypes } from "sequelize";

export default defineEventHandler(async (event) => {
    // 접근토큰 체크(미들웨어가 늦게 실행되서 먼저 실행)
    const authToken = getHeader(event, 'Authorization')?.substring(6).trim();
    const {batchToken} = useRuntimeConfig();

    // ETF 신규데이터 기타정보 가져오기(op.is가 잘 안되서 쿼리 직접실행)
    if(authToken && authToken === batchToken) { // 접근토큰 체크(미들웨어가 늦게 실행되서 먼저 실행)
        let dataListArray: any[];
    
        // ETF 신규데이터 기타정보 가져오기(op.is가 잘 안되서 쿼리 직접실행)
        dataListArray = await sequelize.query(`select * from etf_list where STD_PDNO is null or STD_PDNO = ''`, {
            type: QueryTypes.SELECT
        });

        // 데이터가 있어야만 실행
        if(dataListArray && dataListArray.length > 0) {
            const dateObj = dayjs().add(9, 'hour');
            const accessToken = await getKisAccessToken();
        
            for (let i = 0; i < dataListArray.length; i++) {
                const stockObj = dataListArray[i];
                const stockDataObj = await getKisInfoApiData(stockObj.market, stockObj.stock_code, accessToken);
        
                await models.etfList.update({
                    stdPdno : stockDataObj.std_pdno,
                    tradingLot : stockDataObj.buy_unit_qty,
                    modDate: dateObj.toDate()
                }, {
                    where: { stockCode: stockObj.stock_code }
                });
            }
        
            // 종목별 신규데이터 기타정보 가져오기
            dataListArray = await sequelize.query(`select * from stock_list where STD_PDNO is null or STD_PDNO = ''`, {
                type: QueryTypes.SELECT
            });
        
            for (let i = 0; i < dataListArray.length; i++) {
                const stockObj = dataListArray[i];
                const stockDataObj = await getKisInfoApiData(stockObj.market, stockObj.stock_code, accessToken);
        
                await models.stockList.update({
                    stdPdno : stockDataObj.std_pdno,
                    trCrcyCd : stockDataObj.tr_crcy_cd,
                    buyUnitQty : stockDataObj.buy_unit_qty,
                    prdtName : stockDataObj.prdt_name.indexOf(']') > -1 ? stockDataObj.prdt_name.split(']')[1] : stockDataObj.prdt_name,
                    modDate: dateObj.toDate()
                }, {
                    where: { stockCode: stockObj.stock_code }
                });
            }

            return { msg: "정상적으로 작업되었습니다" };
        } else {
            return { msg: "배치 대상이 없습니다" };
        }
    } else {
        setResponseStatus(event, 401);
        return { msg: "인증값이 올바르지 않습니다" };
    }
});