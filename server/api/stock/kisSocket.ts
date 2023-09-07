interface responseBody {
    approval_key: "string"
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const getKisSocketKey = async () => {
    const url = "https://openapivts.koreainvestment.com:29443/oauth2/Approval";
    const res = await $fetch<responseBody>(url, {
        method: 'POST',
        body: {
            grant_type: "client_credentials",
            appkey: process.env.kisKey,
            secretkey: process.env.kisSecret
        },
        headers: {
            "Content-type": "application/json; charset=utf-8"
        }
    });

    return res.approval_key;
};
