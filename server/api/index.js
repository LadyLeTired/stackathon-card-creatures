const router = require("express").Router();

module.exports = router;

router.use("/cards", require("./cards"));
router.use("/enemies", require("./enemies"));
router.use("/saves", require("./saveGame"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  console.log("REACHED AN ERROR");
  error.status = 404;
  next(error);
});
