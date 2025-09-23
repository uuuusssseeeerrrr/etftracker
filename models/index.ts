import { Sequelize } from 'sequelize';
import { etfList, etfStockList, initModels } from './init-models';

const {dbHost, dbPort, database, userNm, pwd} = useRuntimeConfig();
const sequelize = new Sequelize({
    dialect: 'mariadb',
    host: dbHost,
    port: Number(dbPort),
    database: database,
    username : userNm,
    password: String(pwd)
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
