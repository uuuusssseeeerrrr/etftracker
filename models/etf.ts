import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface etfAttributes {
  market: string;
  stockCode: string;
  stockNm?: string;
  companyName?: string;
  regDate?: Date;
}

export type etfPk = "market" | "stockCode";
export type etfOptionalAttributes = "stockNm" | "companyName" | "regDate";
export type etfCreationAttributes = Optional<etfAttributes, etfOptionalAttributes>;

export class etf extends Model<etfAttributes, etfCreationAttributes> implements etfAttributes {
  market!: string;
  stockCode!: string;
  stockNm?: string;
  companyName?: string;
  regDate?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof etf {
    return etf.init({
    market: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
      comment: "시장구분"
    },
    stockCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      comment: "종목코드"
    },
    stockNm: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "종목명"
    },
    companyName: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "회사명"
    },
    regDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "생성일"
    }
  }, {
    sequelize,
    tableName: 'etf',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "market" },
          { name: "stockCode" },
        ]
      },
    ]
  });
  }
}

export type etfId = etf[etfPk];