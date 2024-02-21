import { Sequelize } from 'sequelize';

import { initModels } from './init-models';

const sequelize = new Sequelize(process.env.database || '', process.env.userNm || '', process.env.password || '', {
    dialect: 'mariadb',
    host: process.env.host,
    port: Number(process.env.port),
});

const models = initModels(sequelize);

export {
    models,
    sequelize
};
