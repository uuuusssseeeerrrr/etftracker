import type { Sequelize } from "sequelize";
import { etfList as _etfList } from "./etfList";
import type { etfListAttributes, etfListCreationAttributes } from "./etfList";
import { etfStockList as _etfStockList } from "./etfStockList";
import type { etfStockListAttributes, etfStockListCreationAttributes } from "./etfStockList";
import { stockList as _stockList } from "./stockList";
import type { stockListAttributes, stockListCreationAttributes } from "./stockList";
import { stockPriceHistory as _stockPriceHistory } from "./stockPriceHistory";
import type { stockPriceHistoryAttributes, stockPriceHistoryCreationAttributes } from "./stockPriceHistory";
import { token as _token } from "./token";
import type { tokenAttributes, tokenCreationAttributes } from "./token";

export {
  _etfList as etfList,
  _etfStockList as etfStockList,
  _stockList as stockList,
  _stockPriceHistory as stockPriceHistory,
  _token as token,
};

export type {
  etfListAttributes,
  etfListCreationAttributes,
  etfStockListAttributes,
  etfStockListCreationAttributes,
  stockListAttributes,
  stockListCreationAttributes,
  stockPriceHistoryAttributes,
  stockPriceHistoryCreationAttributes,
  tokenAttributes,
  tokenCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const etfList = _etfList.initModel(sequelize);
  const etfStockList = _etfStockList.initModel(sequelize);
  const stockList = _stockList.initModel(sequelize);
  const stockPriceHistory = _stockPriceHistory.initModel(sequelize);
  const token = _token.initModel(sequelize);


  return {
    etfList: etfList,
    etfStockList: etfStockList,
    stockList: stockList,
    stockPriceHistory: stockPriceHistory,
    token: token,
  };
}
