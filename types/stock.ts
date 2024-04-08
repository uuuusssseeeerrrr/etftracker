interface priceDetailData {
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
    "t_rate": string,
    "t_xsgn": string,
    "e_ordyn":string,
    "e_hogau":string,
    "e_icod": string,
    "e_parp": string,
    "tvol": string,
    "tamt": string,
    "etyp_nm": string
}

interface stockInfoData {
    "std_pdno" : string,
    "tr_crcy_cd" : string,
    "buy_unit_qty" : string,
    "prdt_name" : string
}

interface runStockBatch {
    (accessToken: string): Promise<{}>;
}

export type { runStockBatch, priceDetailData, stockInfoData };