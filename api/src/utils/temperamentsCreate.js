const { Temperament, Dog } = require("../db");
const axios = require("axios");

const temperamentsCreate = async () => {
  try {
    var { data } = await axios.get("https://api.thedogapi.com/v1/breeds");
    var temperaments = [];
    data.forEach((e) => {
      if (typeof e.temperament === "string") {
        let res = e.temperament.split(",");
        res = res.map((e) => e.trim());
        temperaments = temperaments.concat(res);
      }
    });
    temperaments = Array.from(new Set(temperaments)).sort();
    // Set permite almacenar valores únicos de cualquier tipo para sacar los que se repiten.
    // Array.from crea una nueva instancia de Array a partir de un objeto iterable
    for await (var temp of temperaments) {
      Temperament.create({ name: temp });
    }
  } catch (err) {
    console.log("error" + err);
  }
};

module.exports = temperamentsCreate;
