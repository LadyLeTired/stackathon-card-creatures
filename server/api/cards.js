const router = require("express").Router();
const { Card, Attack } = require("../db/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
module.exports = router;

//GET /api/cards
router.get("/", async (req, res, next) => {
  try {
    const allCards = await Card.findAll({
      where: { quantity: { [Op.gt]: 0 } },
      include: [{ model: Attack }]
    });
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

//PUT /api/cards/id
router.put("/:id", async (req, res, next) => {
  try {
    const cardIdRequest = Number(req.params.id);
    const cardToUpdate = await Card.findByPk(cardIdRequest);
    cardToUpdate.quantity -= 1;
    if (cardToUpdate.quantity === 0) {
      cardToUpdate.quantity = 0;
    }
    await cardToUpdate.save();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
