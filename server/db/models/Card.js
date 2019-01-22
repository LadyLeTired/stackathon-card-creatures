const Sequelize = require("sequelize");
const db = require("../db");

const Card = db.define("card", {
  imageUrl: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.ENUM("Fire", "Ice", "Earth")
  },
  hp: {
    type: Sequelize.INTEGER
  },
  mp: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  }
});

module.exports = Card;
