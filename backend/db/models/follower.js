"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "followerId",
        through: "Followers",
        as: "followers"
      });
      this.belongsTo(models.User, {
        foreignKey: "followingId",
        through: "Followers",
        as: "following"
      });
    }
  }
  Follower.init(
    {
      followerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      followingId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Follower",
    }
  );
  return Follower;
};
