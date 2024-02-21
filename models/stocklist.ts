import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface stockListAttributes {
  market: string;
  stockCode: string;
  stockName?: string;
  regDate?: Date;
}

export type stockListPk = "market" | "stockCode";
export type stockListId = stockList[stockListPk];
export type stockListOptionalAttributes = "market" | "stockCode" | "stockName" | "regDate";
export type stockListCreationAttributes = Optional<stockListAttributes, stockListOptionalAttributes>;

export class stockList extends Model<stockListAttributes, stockListCreationAttributes> implements stockListAttributes {
  market!: string;
  stockCode!: string;
  stockName?: string;
  regDate?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof stockList {
    return stockList.init({
    market: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "",
      primaryKey: true
    },
    stockCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
      field: 'stock_code'
    },
    stockName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'stock_name'
    },
    regDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'reg_date'
    }
  }, {
    sequelize,
    tableName: 'stock_list',
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
