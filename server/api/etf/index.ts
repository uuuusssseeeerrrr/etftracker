import { defineEventHandler } from 'h3';
import { QueryTypes } from "sequelize";
import { sequelize } from '../../../models';

export default defineEventHandler(async (event) => {
    if (event.node.req.method === 'GET') {
        return await sequelize.query(`select * from ETF.ETF_PRICE_INFO`, { type: QueryTypes.SELECT });
    }
});
