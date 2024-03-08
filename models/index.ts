import { Sequelize } from 'sequelize';

import { etfList, etfStockList, initModels } from './init-models';

const sequelize = new Sequelize(process.env.database || '', process.env.userNm || '', process.env.password || '', {
    dialect: 'mariadb',
    host: process.env.host,
    port: Number(process.env.port),
});

const models = initModels(sequelize);

models.etfList.hasMany(etfStockList, { as: 'etfStockList' });
models.etfStockList.belongsTo(etfList, { as: 'etfList',
    targetKey: 'stockCode',
    foreignKey: 'etfStockCode'
});

export {
    models,
    sequelize
};
