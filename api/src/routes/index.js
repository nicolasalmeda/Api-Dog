const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const dogs = require("./dogs.js");
const dog = require("./dog.js");
const temperaments = require("./temperaments.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs", dogs);
router.use("/dog", dog);
router.use("/temperaments", temperaments);

module.exports = router;
