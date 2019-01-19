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

//GET /api/cards/:id
router.get("/:id", async (req, res, next) => {
  try {
    const selectedCard = await Card.findById(req.params.id);
    res.json(selectedCard);
  } catch (err) {
    next(err);
  }
});
