const router = require("express").Router();
const { Card } = require("../db/models");
module.exports = router;

//GET /api/cards
router.get("/", async (req, res, next) => {
  try {
    const allCards = await Card.findAll({});
    res.json(allCards);
  } catch (err) {
    next(err);
  }
});
