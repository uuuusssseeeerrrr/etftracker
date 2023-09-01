interface responseBody {
    approval_key: "string"
}

export const getKisSocketKey = async () => {
    const res = await $fetch<responseBody>(process.env.kisUrl || '', {
        method: 'POST',
        body: {
            grant_type: "client_credentials",
            appkey: process.env.kisKey,
            secretkey: process.env.kisSecret
        },
        headers : {
            "Content-type" : "application/json"
        }
    });

    return res.approval_key;
};
