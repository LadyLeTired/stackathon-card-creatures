const router = require("express").Router();
const { SaveGame, Card } = require("../db/models");
module.exports = router;

//GET /api/saves
router.get("/", async (req, res, next) => {
  try {
    const allSaves = await SaveGame.findAll({ include: [{ model: Card }] });
    res.json(allSaves);
  } catch (err) {
    next(err);
  }
});

//POST /api/saves/:playerName
router.post("/:id", async (req, res, next) => {
  try {
    const selectedEnemy = await Enemy.findById(req.params.id);
    res.json(selectedEnemy);
  } catch (err) {
    next(err);
  }
});
