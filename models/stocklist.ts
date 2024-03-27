import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface stockListAttributes {
  market: string;
  stockCode: string;
  stockName?: string;
  trCrcyCd?: string;
  buyUnitQty?: string;
  prdtName?: string;
  stockComment?: string;
  stdPdno?: string;
  regDate?: Date;
  modDate?: Date;
}

export type stockListPk = "market" | "stockCode";
export type stockListId = stockList[stockListPk];
export type stockListOptionalAttributes = "market" | "stockCode" | "stockName" | "trCrcyCd" | "buyUnitQty" | "prdtName" | "stockComment" | "stdPdno" | "regDate" | "modDate";
export type stockListCreationAttributes = Optional<stockListAttributes, stockListOptionalAttributes>;

export class stockList extends Model<stockListAttributes, stockListCreationAttributes> implements stockListAttributes {
  market!: string;
  stockCode!: string;
  stockName?: string;
  trCrcyCd?: string;
  buyUnitQty?: string;
  prdtName?: string;
  stockComment?: string;
  stdPdno?: string;
  regDate?: Date;
  modDate?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof stockList {
    return stockList.init({
    market: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
      comment: "마켓코드"
    },
    stockCode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "",
      primaryKey: true,
      comment: "주식종목코드",
      field: 'stock_code'
    },
    stockName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "주식명",
      field: 'stock_name'
    },
    trCrcyCd: {
      type: DataTypes.STRING(3),
      allowNull: true,
      comment: "거래통화코드",
      field: 'tr_crcy_cd'
    },
    buyUnitQty: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "매수단위수량",
      field: 'buy_unit_qty'
    },
    prdtName: {
      type: DataTypes.STRING(60),
      allowNull: true,
      comment: "주식명(한글)",
      field: 'prdt_name'
    },
    stockComment: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "종목소개",
      field: 'stock_comment'
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
      comment: "등록시간",
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
