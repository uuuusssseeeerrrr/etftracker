import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { etfList, etfListId } from './etfList';

export interface etfStockListAttributes {
  market: string;
  etfStockCode: string;
  stockCode: string;
  regDate?: Date;
  etfPercent?: number;
}

export type etfStockListPk = "market" | "etfStockCode" | "stockCode";
export type etfStockListId = etfStockList[etfStockListPk];
export type etfStockListOptionalAttributes = "market" | "etfStockCode" | "stockCode" | "regDate" | "etfPercent";
export type etfStockListCreationAttributes = Optional<etfStockListAttributes, etfStockListOptionalAttributes>;

export class etfStockList extends Model<etfStockListAttributes, etfStockListCreationAttributes> implements etfStockListAttributes {
  market!: string;
  etfStockCode!: string;
  stockCode!: string;
  regDate?: Date;
  etfPercent?: number;

  // etfStockList belongsTo etfList via market
  marketEtfList!: etfList;
  getMarketEtfList!: Sequelize.BelongsToGetAssociationMixin<etfList>;
  setMarketEtfList!: Sequelize.BelongsToSetAssociationMixin<etfList, etfListId>;
  createMarketEtfList!: Sequelize.BelongsToCreateAssociationMixin<etfList>;
  // etfStockList belongsTo etfList via etfStockCode
  etfStockCodeEtfList!: etfList;
  getEtfStockCodeEtfList!: Sequelize.BelongsToGetAssociationMixin<etfList>;
  setEtfStockCodeEtfList!: Sequelize.BelongsToSetAssociationMixin<etfList, etfListId>;
  createEtfStockCodeEtfList!: Sequelize.BelongsToCreateAssociationMixin<etfList>;

  static initModel(sequelize: Sequelize.Sequelize): typeof etfStockList {
    return etfStockList.init({
    market: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
      comment: "시장코드",
      references: {
        model: 'etf_list',
        key: 'market'
      }
    },
    etfStockCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
      comment: "ETF종목코드",
      references: {
        model: 'etf_list',
        key: 'stock_code'
      },
      field: 'etf_stock_code'
    },
    stockCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
      comment: "주식종목코드",
      field: 'stock_code'
    },
    regDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "생성일",
      field: 'reg_date'
    },
    etfPercent: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "ETF 비율",
      field: 'etf_percent'
    }
  }, {
    sequelize,
    tableName: 'etf_stock_list',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "market" },
          { name: "etf_stock_code" },
          { name: "stock_code" },
        ]
      },
    ]
  });
  }
}
