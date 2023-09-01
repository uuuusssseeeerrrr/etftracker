import { getKisSocketKey } from './kisSocket';
import { stockReqData } from '../interface/stockReqData';

export const getJPStockData = async function (stockCode: string) {
    const url = `${process.env.kisUrl}/tryitout/HDFSCNT0`;
    const socketKey = await getKisSocketKey();
    const reqData = await $fetch<stockReqData>(url || '', {
        method: 'POST',
        body: {
            tr_id: "HDFSCNT0",
            tr_key: `DTSE${stockCode}`
        },
        headers: {
            "approval_key": socketKey,
            "tr_type": "1",
            "custtype": "P",
            "Content-type": "application/json; charset=utf-8"
        }
    });

    return reqData;
}
