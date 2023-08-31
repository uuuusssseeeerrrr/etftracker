import https from "https";

import axios from 'axios';

const requestBody = {
    grant_type : "client_credentials",
    appkey : process.env.kisKey,
    secretkey : process.env.kisSecret
};

const options = {
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
};

interface responseBody {
    approval_key : "string"
}

export const getKisSocketKey = async () => {
    const response = await axios.post<responseBody>(process.env.kisUrl || "", requestBody, options);
    return response.data.approval_key;
};
