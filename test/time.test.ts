import { test } from 'vitest'
import today from '~/server/plugins/today';

test('time Test', async () => {
    console.log(today().toDate());
});
