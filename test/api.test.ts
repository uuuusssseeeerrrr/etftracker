import { test } from '@jest/globals'

import { getKisSocketKey } from '../apis/stock/kisSocket';

test('소켓키가져오기', () => {
    getKisSocketKey().then(key => console.log(key));
});
