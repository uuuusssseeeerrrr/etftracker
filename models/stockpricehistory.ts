import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface stockpricehistoryAttributes {
  priceIdx: number;
  market: string;
  stockCode: string;
  priceDate: string;
  priceTime: string;
  openPrice: string;
  lowPrice: string;
  highPrice: string;
  price: string;
  betweenPrice: string;
  priceSign: string;
  betweenRate: string;
}

export type stockpricehistoryPk = "priceIdx";
export type stockpricehistoryOptionalAttributes = "priceIdx";
export type stockpricehistoryCreationAttributes = Optional<stockpricehistoryAttributes, stockpricehistoryOptionalAttributes>;

export class stockpricehistory extends Model<stockpricehistoryAttributes, stockpricehistoryCreationAttributes> implements stockpricehistoryAttributes {
  priceIdx!: number;
  market!: string;
  stockCode!: string;
  priceDate!: string;
  priceTime!: string;
  openPrice!: string;
  lowPrice!: string;
  highPrice!: string;
  price!: string;
  betweenPrice!: string;
  priceSign!: string;
  betweenRate!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof stockpricehistory {
    return stockpricehistory.init({
    priceIdx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "인덱스키"
    },
    market: {
      type: DataTypes.STRING(5),
      allowNull: false,
      comment: "시장구분"
    },
    stockCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "일반종목코드"
    },
    priceDate: {
      type: DataTypes.STRING(8),
      allowNull: false,
      comment: "한국일자"
    },
    priceTime: {
      type: DataTypes.STRING(6),
      allowNull: false,
      comment: "한국시간"
    },
    openPrice: {
      type: DataTypes.STRING(6),
      allowNull: false,
      comment: "시작가격"
    },
    lowPrice: {
      type: DataTypes.STRING(6),
      allowNull: false,
      comment: "저가"
    },
    highPrice: {
      type: DataTypes.STRING(6),
      allowNull: false,
      comment: "고가"
    },
    price: {
      type: DataTypes.STRING(6),
      allowNull: false,
      comment: "현재가"
    },
    betweenPrice: {
      type: DataTypes.STRING(8),
      allowNull: false,
      comment: "전일대비"
    },
    priceSign: {
      type: DataTypes.STRING(6),
      allowNull: false,
      comment: "등락구분"
    },
    betweenRate: {
      type: DataTypes.STRING(6),
      allowNull: false,
      comment: "등락율"
    }
  }, {
    sequelize,
    tableName: 'stockpricehistory',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "priceIdx" },
        ]
      },
      {
        name: "stock_price_history_idx1",
        using: "BTREE",
        fields: [
          { name: "market" },
          { name: "stockCode" },
          { name: "priceDate" },
          { name: "priceTime" },
        ]
      },
    ]
  });
  }
}

export type stockpricehistoryId = stockpricehistory[stockpricehistoryPk];