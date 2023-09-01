import { createApp, createRouter, useBase, sendError } from 'h3';

import { saveStockData } from '../../apis/stock/stock';

const app = createApp({
    debug: true,
    onError: (error, event) => {
        sendError(event, error);
    },
});
const router = createRouter();


//TODO : COMPLETE
router.post('/country/:country/code/:code', async (req, res) => {
    await saveStockData(req.context.params.country, req.context.params.code);

    res.statusCode = 200;
    return res;
});

app.use(router);
export default useBase('/', app);