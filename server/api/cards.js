const router = require("express").Router();
const { Card, Attack } = require("../db/models");
module.exports = router;

//GET /api/cards
router.get("/", async (req, res, next) => {
  try {
    const allCards = await Card.findAll({ include: [{ model: Attack }] });
    res.json(allCards);
  } catch (err) {
    next(err);
  }
});

//GET /api/cards/:id
router.get("/:id", async (req, res, next) => {
  try {
    const selectedCard = await Card.findById(req.params.id, {
      include: [{ model: Attack }]
    });
    res.json(selectedCard);
  } catch (err) {
    next(err);
  }
});
