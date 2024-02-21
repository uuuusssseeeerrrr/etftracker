import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface etfListAttributes {
  market: string;
  stockCode: string;
  etfName?: string;
  companyName?: string;
  regDate?: Date;
}

export type etfListPk = "market" | "stockCode";
export type etfListId = etfList[etfListPk];
export type etfListOptionalAttributes = "market" | "stockCode" | "etfName" | "companyName" | "regDate";
export type etfListCreationAttributes = Optional<etfListAttributes, etfListOptionalAttributes>;

export class etfList extends Model<etfListAttributes, etfListCreationAttributes> implements etfListAttributes {
  market!: string;
  stockCode!: string;
  etfName?: string;
  companyName?: string;
  regDate?: Date;


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
