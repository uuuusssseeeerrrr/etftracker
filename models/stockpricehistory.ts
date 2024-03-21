import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface stockPriceHistoryAttributes {
  priceIdx: number;
  market: string;
  stockCode: string;
  open?: string;
  high?: string;
  low?: string;
  price?: string;
  lastDayPrice?: string;
  tomv?: string;
  h52P?: string;
  l52P?: string;
  perx?: string;
  pbrx?: string;
  epsx?: string;
  bpsx?: string;
  tXprc?: string;
  tXdif?: string;
  tXrat?: string;
  tRate?: string;
  eIcod?: string;
  regUnixtime?: number;
}

export type stockPriceHistoryPk = "priceIdx";
export type stockPriceHistoryId = stockPriceHistory[stockPriceHistoryPk];
export type stockPriceHistoryOptionalAttributes = "priceIdx" | "open" | "high" | "low" | "price" | "lastDayPrice" | "tomv" | "h52P" | "l52P" | "perx" | "pbrx" | "epsx" | "bpsx" | "tXprc" | "tXdif" | "tXrat" | "tRate" | "eIcod" | "regUnixtime";
export type stockPriceHistoryCreationAttributes = Optional<stockPriceHistoryAttributes, stockPriceHistoryOptionalAttributes>;

export class stockPriceHistory extends Model<stockPriceHistoryAttributes, stockPriceHistoryCreationAttributes> implements stockPriceHistoryAttributes {
  priceIdx!: number;
  market!: string;
  stockCode!: string;
  open?: string;
  high?: string;
  low?: string;
  price?: string;
  lastDayPrice?: string;
  tomv?: string;
  h52P?: string;
  l52P?: string;
  perx?: string;
  pbrx?: string;
  epsx?: string;
  bpsx?: string;
  tXprc?: string;
  tXdif?: string;
  tXrat?: string;
  tRate?: string;
  eIcod?: string;
  regUnixtime?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof stockPriceHistory {
    return stockPriceHistory.init({
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
      allowNull: false,
      comment: "시장코드"
    },
    stockCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
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
    tomv: {
      type: DataTypes.STRING(16),
      allowNull: true,
      comment: "시가총액"
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
    perx: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "PER"
    },
    pbrx: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "PBR"
    },
    epsx: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "EPS"
    },
    bpsx: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "BPS"
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
    tRate: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "당일환율",
      field: 't_rate'
    },
    eIcod: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "업종(섹터)",
      field: 'e_icod'
    },
    regUnixtime: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "등록시간",
      field: 'reg_unixtime'
    }
  }, {
    sequelize,
    tableName: 'stock_price_history',
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
