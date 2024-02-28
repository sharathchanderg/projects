const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Note = sequelize.define(
  "Note",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false, // This ensures id is required
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, // This ensures title is required
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false, // This ensures content is required
    },
  },
  { timestamps: true }
);

module.exports = Note;
