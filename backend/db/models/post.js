'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: "user_id" });
      this.hasMany(models.Comment, { foreignKey: "post_id", onDelete: 'CASCADE', hooks: true })
      this.hasMany(models.Like, { foreignKey: "post_id", onDelete: 'CASCADE', hooks: true })
    }
  };
  Post.init(
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      photo_url: {
        allowNull: false,
        type: DataTypes.STRING
      }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
