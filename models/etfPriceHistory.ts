import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface etfPriceHistoryAttributes {
  priceIdx: number;
  market: string;
  stockCode: string;
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
  tRate?: string;
  regDate?: Date;
}

export type etfPriceHistoryPk = "priceIdx";
export type etfPriceHistoryId = etfPriceHistory[etfPriceHistoryPk];
export type etfPriceHistoryOptionalAttributes = "priceIdx" | "open" | "high" | "low" | "price" | "lastDayPrice" | "h52P" | "l52P" | "tXprc" | "tXdif" | "tXrat" | "tRate" | "regDate";
export type etfPriceHistoryCreationAttributes = Optional<etfPriceHistoryAttributes, etfPriceHistoryOptionalAttributes>;

export class etfPriceHistory extends Model<etfPriceHistoryAttributes, etfPriceHistoryCreationAttributes> implements etfPriceHistoryAttributes {
  priceIdx!: number;
  market!: string;
  stockCode!: string;
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
  tRate?: string;
  regDate?: Date;


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
    tRate: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "당일환율",
      field: 't_rate'
    },
    regDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "등록시간",
      field: 'reg_date'
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
      }
    ]
  });
  }
}
