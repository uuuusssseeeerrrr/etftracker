import { Sequelize } from 'sequelize';

import { etfList, etfStockList, initModels } from './init-models';

const sequelize = new Sequelize({
    username : process.env.userNm,
    password : process.env.password,
    dialect: 'oracle',
    dialectOptions : {
        connectString: process.env.tnsString
    },
    timezone : process.env.TZ
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
