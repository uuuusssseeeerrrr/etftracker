export const getKisApiData = async function (market: string, stockCode: string, accessToken: string) {
    const url = `https://openapi.koreainvestment.com:9443/uapi/overseas-price/v1/quotations/price-detail?
        AUTH=&EXCD=${market}&SYMB=${stockCode}`;
    const reqHeaders: HeadersInit = new Headers();
    
    reqHeaders.set("Content-Type", "application/json; charset=utf-8");
    reqHeaders.set("Authorization", `Bearer ${accessToken}`);
    reqHeaders.set("appkey", String(process.env.kisKey));
    reqHeaders.set("appsecret", String(process.env.kisSecret));
    reqHeaders.set("tr_id", "HHDFS76200200");
    reqHeaders.set("custtype", "P");

    const returnApiObj = await fetch(url, {
        method: 'GET',
        headers: reqHeaders
    }).then(res => res.json());

    console.log(returnApiObj);

    if(returnApiObj.rt_cd !== '0') {
        throw new Error('KisApi 연동에러');
    } else {
        return returnApiObj.output;
    }
}    
