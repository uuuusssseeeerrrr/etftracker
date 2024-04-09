import dayjs from 'dayjs';
import { runJpEtfBatch, runJpStockBatch } from './tse';
import { getKisAccessToken } from './kisApi';

export default defineEventHandler(async (event) => {
    // 장마감인데 배치가 들어올경우 생략
    if((dayjs().get('hour') > 15) || (dayjs().hour() >= 15 && dayjs().minute() > 20)) {
        setResponseStatus(event, 200);
        console.log("wkd")
        return { msg: "장이 마감되었습니다" };
    }

    const authToken = getHeader(event, 'Authorization')?.substring(6).trim();
    const {batchToken} = useRuntimeConfig();

    if(authToken && authToken === batchToken) { // 접근토큰 체크(미들웨어가 늦게 실행되서 먼저 실행)
        const queryParam = await readBody(event);

        if (queryParam && queryParam.market === "TSE") {
            console.log("jp 배치 시작");
            const accessToken = await getKisAccessToken();

            await runJpEtfBatch(accessToken);
            await runJpStockBatch(accessToken);
    
            console.log("jp 배치 종료");
            setResponseStatus(event, 200);
            return { msg: "정상적으로 작업되었습니다" };
        } else {
            setResponseStatus(event, 204);
            return { msg: "배치 대상이 없습니다" };
        }
    } else {
        setResponseStatus(event, 401);
        return { msg: "인증값이 올바르지 않습니다" };
    }
});
