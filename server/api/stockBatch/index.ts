import dayjs from 'dayjs';
import { defineEventHandler, getQuery } from 'h3';

// eslint-disable-next-line import/namespace
import { getTSEStockData } from './tse';
import { models } from '../../../models';

export default defineEventHandler(async (event) => {
    if (event.node.req.method === 'GET') {
        const queryParam = await getQuery(event);
        
        if (queryParam.market === "TSE") {
            const token = await getAccessToken();

            getTSEStockData(token);
        }
    }
});

const getAccessToken = async function () {
    const today = dayjs();
    const tokenData = await models.token.findOne({
        attributes: ['regDate', 'token'],
        where: {
            regDate: today.format('YYYYMMDD')
        }
    });

    if(!tokenData) {
        const url = `https://openapi.koreainvestment.com:9443/oauth2/tokenP`;
        const tokenObj = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "grant_type": "client_credentials",
                "appkey": process.env.kisKey,
                "appsecret":  process.env.kisSecret
            })
        }).then(res => res.json());

        await models.token.create({
            regDate: today.format('YYYYMMDD'),
            token: tokenObj.access_token
        });

        return tokenObj.access_token;
    }

    return tokenData.token;
};