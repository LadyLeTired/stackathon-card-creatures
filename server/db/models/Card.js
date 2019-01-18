const Sequelize = require("sequelize");
const db = require("../db");

const Card = db.define("card", {
  creatureImageUrl: {
    type: Sequelize.STRING
  },
  creatureName: {
    type: Sequelize.STRING
  },
  creatureType: {
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
  }
});

module.exports = Card;
