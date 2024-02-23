import { QueryTypes } from "sequelize";

import { sequelize } from "~/models";

export const getJPStockData = async (market: string, etfStockCode: string) => {
    return await sequelize.query(`select * from price_info`, { type: QueryTypes.SELECT });
}
