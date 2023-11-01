const express = require("express");
const router = express.Router();
const appController = require("../controllers/appController");

router.get("/", appController.getLabyrinthsByUserId);

router.get("/:id", appController.getLabyrinthById);

router.post("/", appController.createLabyrinth);

router.put(
  "/:id/playfield/:x/:y/:type",
  appController.getLabyrinthToSetPoints,
  appController.setPlayfieldType
);

router.put(
  "/:id/start/:x/:y",
  appController.getLabyrinthToSetPoints,
  appController.setStartPoint
);

router.put(
  "/:id/end/:x/:y",
  appController.getLabyrinthToSetPoints,
  appController.setEndPoint
);

router.get("/:id/solution", appController.getSolution);

module.exports = router;
