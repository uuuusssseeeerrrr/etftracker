import express from 'express';

import { saveStockData } from './stock/stock';

const app = express();

app.get('/stockApi/country/:country/code/:code', (req) => {
    saveStockData(req.params.country, req.params.code).then((response) => {
        return response;
    });
})