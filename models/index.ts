import { Sequelize } from 'sequelize';

import { etfList, etfStockList, initModels } from './init-models';

const sequelize = new Sequelize({
    dialect: 'mariadb',
    host: process.env.dbHost,
    port: Number(process.env.dbPort),
    database : process.env.database,
    username : process.env.userNm,
    password : process.env.password,
});

const models = initModels(sequelize);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
});

models.etfList.hasMany(etfStockList, { as: 'etfStockList' });
models.etfStockList.belongsTo(etfList, { as: 'etfList',
    targetKey: 'stockCode',
    foreignKey: 'etfStockCode'
});

export {
    models,
    sequelize
};
