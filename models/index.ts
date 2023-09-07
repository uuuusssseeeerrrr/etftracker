import { Sequelize } from 'sequelize';

import { initModels } from './init-models';

const sequelize = new Sequelize(process.env.database || '', process.env.userNm || '', process.env.password || '', {
    host: process.env.host,
    dialect: 'mariadb'
});

const models = initModels(sequelize);

export default models;