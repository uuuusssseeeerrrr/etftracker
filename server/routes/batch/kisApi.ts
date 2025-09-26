import dayjs from 'dayjs';
import prisma from '@@/lib/prisma';
import { priceDetailData, kisPriceDetailResponse, kisPriceInfoResponse, stockInfoData, kisTokenResponse } from '@@/types'

//초당 요청초과로 거절당할경우 방지하는 함수
function sleep() {
  return new Promise((resolve) => {
    setTimeout(resolve, 250);
  });
}

//접근토큰 발급용 함수
export const getKisAccessToken = async function () {
  const dateObj = dayjs();
  const { kisKey, kisSecret } = useRuntimeConfig();
  const tokenData = await prisma.token.findFirst({
    select: {
      regDate: true,
      token: true
    },
    where: {
      regDate: dateObj.format('YYYYMMDD')
    }
  });

  if (!tokenData) {
    const tokenResObj = await $fetch<kisTokenResponse>('https://openapi.koreainvestment.com:9443/oauth2/tokenP', {
      method: "POST",
      body: {
        "grant_type": "client_credentials",
        "appkey": kisKey,
        "appsecret": kisSecret
      },
      headers: {
        "Content-Type": "application/json"
      }
    });

    await prisma.token.create({
      data: {
        regDate: dateObj.format('YYYYMMDD'),
        token: tokenResObj.access_token
      }
    });

    return tokenResObj.access_token;
  }

  return tokenData.token;
};

//시세데이터 조회 함수
export const getKisApiData = async function (market: string, stockCode: string, accessToken: string): Promise<priceDetailData> {
  const { kisKey, kisSecret } = useRuntimeConfig();
  const kisPriceDetailResponseObj = await $fetch<kisPriceDetailResponse>('https://openapi.koreainvestment.com:9443/uapi/overseas-price/v1/quotations/price-detail', {
    method: "GET",
    headers: {
      "content-Type": "application/json; charset=utf-8",
      "authorization": `Bearer ${accessToken}`,
      "appkey": kisKey,
      "appsecret": kisSecret,
      "tr_id": "HHDFS76200200",
    },
    params: {
      'AUTH': '',
      'EXCD': market,
      'SYMB': stockCode
    }
  });

  if (kisPriceDetailResponseObj.rt_cd !== '0') {
    console.error(JSON.stringify(kisPriceDetailResponseObj));
    throw new Error('KisApi 연동에러');
  } else {
    await sleep();
    return kisPriceDetailResponseObj.output;
  }
}

//종목정보 조회 함수
export const getKisInfoApiData = async function (market: string, stockCode: string, accessToken: string): Promise<stockInfoData> {
  const PRDT_TYPE_CD = market === 'TSE' ? '515' : '512';
  const { kisKey, kisSecret } = useRuntimeConfig();

  const kisPriceInfoResponseObj = await $fetch<kisPriceInfoResponse>('https://openapi.koreainvestment.com:9443/uapi/overseas-price/v1/quotations/search-info', {
    headers: {
      "content-Type": "application/json; charset=utf-8",
      "authorization": `Bearer ${accessToken}`,
      "appkey": kisKey,
      "appsecret": kisSecret,
      "tr_id": "CTPF1702R",
      "custtype": "P"
    },
    params: {
      PRDT_TYPE_CD,
      'PDNO': stockCode
    }
  });

  if (kisPriceInfoResponseObj.rt_cd !== '0') {
    console.error(JSON.stringify(kisPriceInfoResponseObj));
    throw new Error('KisApi 연동에러');
  } else {
    await sleep();
    return kisPriceInfoResponseObj.output;
  }
}
