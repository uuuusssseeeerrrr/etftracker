import { QueryTypes } from "sequelize";
import { sequelize } from '../../../models';

export default defineEventHandler(async (event) => {
    if (event.node.req.method === 'GET') {
        return await sequelize.query(`select * from etf_price_info`, { type: QueryTypes.SELECT });
    }
});
