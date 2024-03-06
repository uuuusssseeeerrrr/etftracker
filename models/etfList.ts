import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface etfListAttributes {
  market: string;
  stockCode: string;
  etfName?: string;
  companyName?: string;
  regDate?: Date;
  benchmarkIndex?: string;
  indexComment?: string;
  tradingLot?: number;
  trustFeeRate?: string;
}

export type etfListPk = "market" | "stockCode";
export type etfListId = etfList[etfListPk];
export type etfListOptionalAttributes = "market" | "stockCode" | "etfName" | "companyName" | "regDate" | "benchmarkIndex" | "indexComment" | "tradingLot" | "trustFeeRate";
export type etfListCreationAttributes = Optional<etfListAttributes, etfListOptionalAttributes>;

export class etfList extends Model<etfListAttributes, etfListCreationAttributes> implements etfListAttributes {
  market!: string;
  stockCode!: string;
  etfName?: string;
  companyName?: string;
  regDate?: Date;
  benchmarkIndex?: string;
  indexComment?: string;
  tradingLot?: number;
  trustFeeRate?: string;


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
    regDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "생성일",
      field: 'reg_date'
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
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "거래주수",
      field: 'trading_lot'
    },
    trustFeeRate: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "수수료",
      field: 'trust_fee_rate'
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
