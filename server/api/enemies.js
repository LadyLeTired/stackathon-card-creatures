const router = require("express").Router();
const { Enemy } = require("../db/models");
module.exports = router;

//GET /api/enemies
router.get("/", async (req, res, next) => {
  try {
    if (req.query.isDefeated) {
      if (req.query.isDefeated === "defeated") {
        const deadEnemies = await Enemy.findAll({
          where: { isDefeated: true }
        });
        res.json(deadEnemies);
      }
      if (req.query.isDefeated === "alive") {
        const aliveEnemies = await Enemy.findAll({
          where: { isDefeated: false }
        });
        res.json(aliveEnemies);
      }
    } else {
      const allEnemies = await Enemy.findAll();
      res.json(allEnemies);
    }
  } catch (err) {
    next(err);
  }
});

//GET /api/enemies/:id
router.get("/:id", async (req, res, next) => {
  try {
    const selectedEnemy = await Enemy.findById(req.params.id);
    res.json(selectedEnemy);
  } catch (err) {
    next(err);
  }
});
