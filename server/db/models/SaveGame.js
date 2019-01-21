const Sequelize = require("sequelize");
const db = require("../db");

const SaveGame = db.define("savegame", {
  playerName: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = SaveGame;
