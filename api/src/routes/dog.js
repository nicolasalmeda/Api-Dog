const { Router } = require("express");
const { Dog, Temperament } = require("../db.js");
const router = Router();

/********************** [ ] POST /dog: **********************/

router.post("/", async (req, res) => {
  const {
    name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    life_span_min,
    life_span_max,
    image,
    createdInDb,
    temperament,
  } = req.body;
  console.log(temperament);
  try {
    let dogCreated = await Dog.create({
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_span_min,
      life_span_max,
      image,
      createdInDb,
    });

    let tempsDb = await Temperament.findAll({
      where: { name: temperament },
    });
    dogCreated.addTemperament(tempsDb);
    res.json(dogCreated);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
