import dayjs from 'dayjs';
import { models } from '../../../models';
import axios, { AxiosHeaders } from 'axios'
import {priceDetailData, kisPriceDetailResponse} from '../interface/stock'

//시세데이터 조회 함수
export const getKisApiData = async function (market: string, stockCode: string, accessToken: string): Promise<priceDetailData> {
    const reqHeaders = new AxiosHeaders();
    reqHeaders.set("content-Type", "application/json; charset=utf-8");
    reqHeaders.set("authorization", `Bearer ${accessToken}`);
    reqHeaders.set("appkey", String(process.env.kisKey));
    reqHeaders.set("appsecret", String(process.env.kisSecret));
    reqHeaders.set("tr_id", "HHDFS76200200");

    const returnApiObj = await axios.get('https://openapi.koreainvestment.com:9443/uapi/overseas-price/v1/quotations/price-detail', {
        headers : reqHeaders,
        params : {
            'AUTH' : '',
            'EXCD' : market,
            'SYMB' : stockCode
        }
    });
    const kisPriceDetailResponseObj: kisPriceDetailResponse = returnApiObj.data;

    if(kisPriceDetailResponseObj.rt_cd !== '0') {
        throw new Error('KisApi 연동에러');
    } else {
        await sleep();
        return kisPriceDetailResponseObj.output;
    }
}    

//초당 요청초과로 거절당할경우 방지하는 함수
function sleep() {
    return new Promise((resolve) => {
      setTimeout(resolve, 250);
    });
}

//접근토큰 발급용 함수
export const getKisAccessToken = async function () {
    const today = dayjs();
    const tokenData = await models.token.findOne({
        attributes: ['regDate', 'token'],
        where: {
            regDate: today.format('YYYYMMDD')
        }
    });

    if(!tokenData) {
        const tokenResObj = await axios.post('https://openapi.koreainvestment.com:9443/oauth2/tokenP', {
            "grant_type": "client_credentials",
            "appkey": process.env.kisKey,
            "appsecret": process.env.kisSecret
        }, {
            headers : {
                "Content-Type": "application/json"
            }
        });

        const tokenObj = tokenResObj.data;

        await models.token.create({
            regDate: today.format('YYYYMMDD'),
            token: tokenObj.access_token
        });

        return tokenObj.access_token;
    }

    return tokenData.dataValues.token;
};
