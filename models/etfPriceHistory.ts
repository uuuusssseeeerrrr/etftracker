import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface etfPriceHistoryAttributes {
  priceIdx: number;
  market?: string;
  stockCode?: string;
  open?: string;
  high?: string;
  low?: string;
  price?: string;
  lastDayPrice?: string;
  h52P?: string;
  l52P?: string;
  tXprc?: string;
  tXdif?: string;
  tXrat?: string;
  pXprc?: string;
  pXdif?: string;
  pXrat?: string;
  tRate?: string;
  regUnixtime?: number;
}

export type etfPriceHistoryPk = "priceIdx";
export type etfPriceHistoryId = etfPriceHistory[etfPriceHistoryPk];
export type etfPriceHistoryOptionalAttributes = "priceIdx" | "market" | "stockCode" | "open" | "high" | "low" | "price" | "lastDayPrice" | "h52P" | "l52P" | "tXprc" | "tXdif" | "tXrat" | "pXprc" | "pXdif" | "pXrat" | "tRate" | "regUnixtime";
export type etfPriceHistoryCreationAttributes = Optional<etfPriceHistoryAttributes, etfPriceHistoryOptionalAttributes>;

export class etfPriceHistory extends Model<etfPriceHistoryAttributes, etfPriceHistoryCreationAttributes> implements etfPriceHistoryAttributes {
  priceIdx!: number;
  market?: string;
  stockCode?: string;
  open?: string;
  high?: string;
  low?: string;
  price?: string;
  lastDayPrice?: string;
  h52P?: string;
  l52P?: string;
  tXprc?: string;
  tXdif?: string;
  tXrat?: string;
  pXprc?: string;
  pXdif?: string;
  pXrat?: string;
  tRate?: string;
  regUnixtime?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof etfPriceHistory {
    return etfPriceHistory.init({
    priceIdx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "인덱스",
      field: 'price_idx'
    },
    market: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "시장코드"
    },
    stockCode: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "종목코드",
      field: 'stock_code'
    },
    open: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "시가"
    },
    high: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "고가"
    },
    low: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "저가"
    },
    price: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "현재가"
    },
    lastDayPrice: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "전일종가",
      field: 'last_day_price'
    },
    h52P: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "52주최고가",
      field: 'h52p'
    },
    l52P: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "52주최저가",
      field: 'l52p'
    },
    tXprc: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "원환산당일가격",
      field: 't_xprc'
    },
    tXdif: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "원환산당일대비",
      field: 't_xdif'
    },
    tXrat: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "원환산당일등락",
      field: 't_xrat'
    },
    pXprc: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "원환산전일가격",
      field: 'p_xprc'
    },
    pXdif: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "원환산전일대비",
      field: 'p_xdif'
    },
    pXrat: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "원환산전일등락",
      field: 'p_xrat'
    },
    tRate: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "당일환율",
      field: 't_rate'
    },
    regUnixtime: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "등록시간",
      field: 'reg_unixtime'
    }
  }, {
    sequelize,
    tableName: 'etf_price_history',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "price_idx" },
        ]
      },
      {
        name: "market_stock_code",
        using: "BTREE",
        fields: [
          { name: "market" },
          { name: "stock_code" },
        ]
      },
      {
        name: "reg_date",
        using: "BTREE",
        fields: [
          { name: "reg_unixtime" },
        ]
      },
    ]
  });
  }
}
