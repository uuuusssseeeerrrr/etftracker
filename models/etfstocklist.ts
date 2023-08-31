import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface etfstocklistAttributes {
  market: string;
  etfStockCode: string;
  stockCode: string;
  regDate?: Date;
}

export type etfstocklistPk = "market" | "etfStockCode" | "stockCode";
export type etfstocklistOptionalAttributes = "regDate";
export type etfstocklistCreationAttributes = Optional<etfstocklistAttributes, etfstocklistOptionalAttributes>;

export class etfstocklist extends Model<etfstocklistAttributes, etfstocklistCreationAttributes> implements etfstocklistAttributes {
  market!: string;
  etfStockCode!: string;
  stockCode!: string;
  regDate?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof etfstocklist {
    return etfstocklist.init({
    market: {
      type: DataTypes.STRING(5),
      allowNull: false,
      primaryKey: true,
      comment: "시장구분"
    },
    etfStockCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      comment: "ETF종목코드"
    },
    stockCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      comment: "일반종목코드"
    },
    regDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "생성일"
    }
  }, {
    sequelize,
    tableName: 'etfstocklist',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "market" },
          { name: "etfStockCode" },
          { name: "stockCode" },
        ]
      },
    ]
  });
  }
}

export type etfstocklistId = etfstocklist[etfstocklistPk];