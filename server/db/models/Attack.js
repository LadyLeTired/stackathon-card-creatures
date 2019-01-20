const Sequelize = require("sequelize");
const db = require("../db");

const Attack = db.define("attack", {
  name: {
    type: Sequelize.STRING
  },
  mpCost: {
    type: Sequelize.INTEGER
  },
  element: {
    type: Sequelize.ENUM("Fire", "Ice", "Earth")
  },
  damage: {
    type: Sequelize.INTEGER
  },
  description: {
    type: Sequelize.TEXT
  }
});

module.exports = Attack;
