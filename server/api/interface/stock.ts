type priceDetailData = {
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

type kisPriceDetailResponse = {
    "output": priceDetailData,
    "rt_cd": string,
    "msg_cd": string,
    "msg1": string
}

interface getStockData {
    (accessToken: string): Promise<{}>;
}

export { getStockData, priceDetailData, kisPriceDetailResponse };