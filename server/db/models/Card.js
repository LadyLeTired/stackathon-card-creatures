const Sequelize = require("sequelize");
const db = require("../db");

const Card = db.define("card", {
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    },
    defaultValue:
      "http://2.bp.blogspot.com/-5jg2YKt4eak/U3VMJLOvbTI/AAAAAAAABIQ/FsRnYKFp2UM/s1600/maleficent536ad1e43b29a.jpg"
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
  description: {
    type: Sequelize.TEXT
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 3
  }
});

module.exports = Card;
