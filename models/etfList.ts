import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { etfStockList, etfStockListId } from './etfStockList';

export interface etfListAttributes {
  market: string;
  stockCode: string;
  etfName?: string;
  companyName?: string;
  benchmarkIndex?: string;
  indexComment?: string;
  tradingLot?: string;
  trustFeeRate?: string;
  stdPdno?: string;
  regDate?: Date;
  modDate?: Date;
}

export type etfListPk = "market" | "stockCode";
export type etfListId = etfList[etfListPk];
export type etfListOptionalAttributes = "market" | "stockCode" | "etfName" | "companyName" | "benchmarkIndex" | "indexComment" | "tradingLot" | "trustFeeRate" | "stdPdno" | "regDate" | "modDate";
export type etfListCreationAttributes = Optional<etfListAttributes, etfListOptionalAttributes>;

export class etfList extends Model<etfListAttributes, etfListCreationAttributes> implements etfListAttributes {
  market!: string;
  stockCode!: string;
  etfName?: string;
  companyName?: string;
  benchmarkIndex?: string;
  indexComment?: string;
  tradingLot?: string;
  trustFeeRate?: string;
  stdPdno?: string;
  regDate?: Date;
  modDate?: Date;

  // etfList belongsToMany etfList via market and etfStockCode
  etfStockCodeEtfLists!: etfList[];
  getEtfStockCodeEtfLists!: Sequelize.BelongsToManyGetAssociationsMixin<etfList>;
  setEtfStockCodeEtfLists!: Sequelize.BelongsToManySetAssociationsMixin<etfList, etfListId>;
  addEtfStockCodeEtfList!: Sequelize.BelongsToManyAddAssociationMixin<etfList, etfListId>;
  addEtfStockCodeEtfLists!: Sequelize.BelongsToManyAddAssociationsMixin<etfList, etfListId>;
  createEtfStockCodeEtfList!: Sequelize.BelongsToManyCreateAssociationMixin<etfList>;
  removeEtfStockCodeEtfList!: Sequelize.BelongsToManyRemoveAssociationMixin<etfList, etfListId>;
  removeEtfStockCodeEtfLists!: Sequelize.BelongsToManyRemoveAssociationsMixin<etfList, etfListId>;
  hasEtfStockCodeEtfList!: Sequelize.BelongsToManyHasAssociationMixin<etfList, etfListId>;
  hasEtfStockCodeEtfLists!: Sequelize.BelongsToManyHasAssociationsMixin<etfList, etfListId>;
  countEtfStockCodeEtfLists!: Sequelize.BelongsToManyCountAssociationsMixin;
  // etfList belongsToMany etfList via etfStockCode and market
  marketEtfLists!: etfList[];
  getMarketEtfLists!: Sequelize.BelongsToManyGetAssociationsMixin<etfList>;
  setMarketEtfLists!: Sequelize.BelongsToManySetAssociationsMixin<etfList, etfListId>;
  addMarketEtfList!: Sequelize.BelongsToManyAddAssociationMixin<etfList, etfListId>;
  addMarketEtfLists!: Sequelize.BelongsToManyAddAssociationsMixin<etfList, etfListId>;
  createMarketEtfList!: Sequelize.BelongsToManyCreateAssociationMixin<etfList>;
  removeMarketEtfList!: Sequelize.BelongsToManyRemoveAssociationMixin<etfList, etfListId>;
  removeMarketEtfLists!: Sequelize.BelongsToManyRemoveAssociationsMixin<etfList, etfListId>;
  hasMarketEtfList!: Sequelize.BelongsToManyHasAssociationMixin<etfList, etfListId>;
  hasMarketEtfLists!: Sequelize.BelongsToManyHasAssociationsMixin<etfList, etfListId>;
  countMarketEtfLists!: Sequelize.BelongsToManyCountAssociationsMixin;
  // etfList hasMany etfStockList via market
  etfStockLists!: etfStockList[];
  getEtfStockLists!: Sequelize.HasManyGetAssociationsMixin<etfStockList>;
  setEtfStockLists!: Sequelize.HasManySetAssociationsMixin<etfStockList, etfStockListId>;
  addEtfStockList!: Sequelize.HasManyAddAssociationMixin<etfStockList, etfStockListId>;
  addEtfStockLists!: Sequelize.HasManyAddAssociationsMixin<etfStockList, etfStockListId>;
  createEtfStockList!: Sequelize.HasManyCreateAssociationMixin<etfStockList>;
  removeEtfStockList!: Sequelize.HasManyRemoveAssociationMixin<etfStockList, etfStockListId>;
  removeEtfStockLists!: Sequelize.HasManyRemoveAssociationsMixin<etfStockList, etfStockListId>;
  hasEtfStockList!: Sequelize.HasManyHasAssociationMixin<etfStockList, etfStockListId>;
  hasEtfStockLists!: Sequelize.HasManyHasAssociationsMixin<etfStockList, etfStockListId>;
  countEtfStockLists!: Sequelize.HasManyCountAssociationsMixin;
  // etfList hasMany etfStockList via etfStockCode
  etfStockCodeEtfStockLists!: etfStockList[];
  getEtfStockCodeEtfStockLists!: Sequelize.HasManyGetAssociationsMixin<etfStockList>;
  setEtfStockCodeEtfStockLists!: Sequelize.HasManySetAssociationsMixin<etfStockList, etfStockListId>;
  addEtfStockCodeEtfStockList!: Sequelize.HasManyAddAssociationMixin<etfStockList, etfStockListId>;
  addEtfStockCodeEtfStockLists!: Sequelize.HasManyAddAssociationsMixin<etfStockList, etfStockListId>;
  createEtfStockCodeEtfStockList!: Sequelize.HasManyCreateAssociationMixin<etfStockList>;
  removeEtfStockCodeEtfStockList!: Sequelize.HasManyRemoveAssociationMixin<etfStockList, etfStockListId>;
  removeEtfStockCodeEtfStockLists!: Sequelize.HasManyRemoveAssociationsMixin<etfStockList, etfStockListId>;
  hasEtfStockCodeEtfStockList!: Sequelize.HasManyHasAssociationMixin<etfStockList, etfStockListId>;
  hasEtfStockCodeEtfStockLists!: Sequelize.HasManyHasAssociationsMixin<etfStockList, etfStockListId>;
  countEtfStockCodeEtfStockLists!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof etfList {
    return etfList.init({
    market: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
      comment: "시장코드"
    },
    stockCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
      comment: "종목코드",
      field: 'stock_code'
    },
    etfName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "ETF명",
      field: 'etf_name'
    },
    companyName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "회사명",
      field: 'company_name'
    },
    benchmarkIndex: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "벤치마크인덱스명",
      field: 'benchmark_index'
    },
    indexComment: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "인덱스 소개",
      field: 'index_comment'
    },
    tradingLot: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "거래주수",
      field: 'trading_lot'
    },
    trustFeeRate: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "수수료",
      field: 'trust_fee_rate'
    },
    stdPdno: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "표준상품번호",
      field: 'std_pdno'
    },
    regDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "생성시간",
      field: 'reg_date'
    },
    modDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "수정시간",
      field: 'mod_date'
    }
  }, {
    sequelize,
    tableName: 'etf_list',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "market" },
          { name: "stock_code" },
        ]
      },
    ]
  });
  }
}
