const { Router } = require("express");
const router = Router();
const { Temperament } = require("../db.js");

router.get("/", async (req, res) => {
  try {
    const allTemperaments = await Temperament.findAll();
    return res.json(allTemperaments).status(200);
  } catch (err) {
    res.sendStatus(404);
  }
});

module.exports = router;
