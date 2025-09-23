import { describe, test, expect, beforeEach } from 'vitest'
import { Sequelize } from 'sequelize';
import { initModels } from '~/models/init-models';

describe('database Connect Test', () => {
    let models: any = null;

    beforeEach(async () => {
        const sequelize = new Sequelize({
            dialect: 'mariadb',
            host: process.env.VITE_DB_HOST,
            port: Number(process.env.VITE_DB_PORT),
            database: process.env.VITE_DATABASE,
            username : process.env.VITE_USER_NM,
            password: process.env.VITE_PWD
        });

        models = initModels(sequelize);
    });

    test('db connection Test', async () => {
        expect(models).not.toBeNull();
    });

    test('etfList table Read Test', async () => {
        const cnt: number = await models?.etfList.count();
        expect(cnt).toBeGreaterThan(0);
    });

    test('etfStockList table Read Test', async () => {
        const cnt: number = await models?.etfStockList.count();
        expect(cnt).toBeGreaterThan(0);
    });

    test('stockList table Read Test', async () => {
        const cnt: number = await models?.stockList.count();
        expect(cnt).toBeGreaterThan(0);
    });
});
