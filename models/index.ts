import { Sequelize } from 'sequelize';

import { initModels } from './init-models';

const sequelize = new Sequelize(process.env.database || '', process.env.username || '', process.env.password || '', {});

const models = initModels(sequelize);

export default models;