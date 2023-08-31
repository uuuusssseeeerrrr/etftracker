import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface stocklistAttributes {
  market: string;
  stockCode: string;
  stockNm?: string;
  regDate?: Date;
}

export type stocklistPk = "market" | "stockCode";
export type stocklistOptionalAttributes = "stockNm" | "regDate";
export type stocklistCreationAttributes = Optional<stocklistAttributes, stocklistOptionalAttributes>;

export class stocklist extends Model<stocklistAttributes, stocklistCreationAttributes> implements stocklistAttributes {
  market!: string;
  stockCode!: string;
  stockNm?: string;
  regDate?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof stocklist {
    return stocklist.init({
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
    regDate: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "생성일"
    }
  }, {
    sequelize,
    tableName: 'stocklist',
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

export type stocklistId = stocklist[stocklistPk];