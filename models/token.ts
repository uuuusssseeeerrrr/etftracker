import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface tokenAttributes {
  tokenIdx: number;
  regDate: string;
  token: string;
}

export type tokenPk = "tokenIdx";
export type tokenId = token[tokenPk];
export type tokenOptionalAttributes = "tokenIdx" | "regDate";
export type tokenCreationAttributes = Optional<tokenAttributes, tokenOptionalAttributes>;

export class token extends Model<tokenAttributes, tokenCreationAttributes> implements tokenAttributes {
  tokenIdx!: number;
  regDate!: string;
  token!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof token {
    return token.init({
    tokenIdx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'token_idx'
    },
    regDate: {
      type: DataTypes.CHAR(8),
      allowNull: false,
      defaultValue: "",
      field: 'reg_date'
    },
    token: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'token',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "token_idx" },
        ]
      },
    ]
  });
  }
}
