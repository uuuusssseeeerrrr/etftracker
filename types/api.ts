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

export type { kisPriceDetailResponse, kisPriceInfoResponse };