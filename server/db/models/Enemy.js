const Sequelize = require("sequelize");
const db = require("../db");

const Enemy = db.define("enemy", {
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
  isDefeated: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Enemy;
