import { etf as _etf } from "./etf";
import { etfstocklist as _etfstocklist } from "./etfstocklist";
import { stocklist as _stocklist } from "./stocklist";
import { stockpricehistory as _stockpricehistory } from "./stockpricehistory";

import type { etfAttributes, etfCreationAttributes } from "./etf";
import type { etfstocklistAttributes, etfstocklistCreationAttributes } from "./etfstocklist";
import type { stocklistAttributes, stocklistCreationAttributes } from "./stocklist";
import type { stockpricehistoryAttributes, stockpricehistoryCreationAttributes } from "./stockpricehistory";
import type { Sequelize } from "sequelize";

export {
  _etf as etf,
  _etfstocklist as etfstocklist,
  _stocklist as stocklist,
  _stockpricehistory as stockpricehistory,
};

export type {
  etfAttributes,
  etfCreationAttributes,
  etfstocklistAttributes,
  etfstocklistCreationAttributes,
  stocklistAttributes,
  stocklistCreationAttributes,
  stockpricehistoryAttributes,
  stockpricehistoryCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const etf = _etf.initModel(sequelize);
  const etfstocklist = _etfstocklist.initModel(sequelize);
  const stocklist = _stocklist.initModel(sequelize);
  const stockpricehistory = _stockpricehistory.initModel(sequelize);

  return {
    etf,
    etfstocklist,
    stocklist,
    stockpricehistory,
  };
}
