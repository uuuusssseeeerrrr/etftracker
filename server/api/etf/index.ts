// import { defineEventHandler, getQuery } from 'h3';

// import models from '../../../models';

// export default defineEventHandler(async (event) => {
//     if (event.node.req.method === 'GET') {
//         const query = await getQuery(event);

//         console.log(query);

//         return await models.etf.findAll({
//             where: {
//                 market: query.market as string
//             }
//         });
//     }
// });
