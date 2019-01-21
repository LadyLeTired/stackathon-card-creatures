const Sequelize = require("sequelize");
const db = require("../db");

const Enemy = db.define("enemy", {
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    },
    defaultValue: "https://i.imgur.com/tTCUtxH.jpg"
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  type: {
    type: Sequelize.ENUM("Fire", "Ice", "Earth", "Cypher"),
    defaultValue: "Cypher"
  },
  hp: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  mp: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  isDefeated: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Enemy;
