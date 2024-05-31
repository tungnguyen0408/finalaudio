"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    static associate(models) {
      // Định nghĩa mối quan hệ ở đây nếu có
    }
  }
  Song.init(
    {
      name: DataTypes.STRING,
      author: DataTypes.STRING,
      singer: DataTypes.STRING,
      genre: DataTypes.STRING,
      lyrics: DataTypes.TEXT,
      iframeUrl: DataTypes.STRING,
      countSeen: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Song",
    }
  );
  return Song;
};
