import { describe, test, expect } from 'vitest'
import { models } from '../models';

describe('database Connect Test', () => {
    test('etfList table Test', async () => {
        const cnt: number = await models.etfList.count();
        expect(cnt).toBeGreaterThan(0);
    });

    test('etfStockList table Test', async () => {
        const cnt: number = await models.etfStockList.count();
        expect(cnt).toBeGreaterThan(0);
    });

    test('stockList table Test', async () => {
        const cnt: number = await models.stockList.count();
        expect(cnt).toBeGreaterThan(0);
    });
});
