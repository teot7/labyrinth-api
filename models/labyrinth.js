const mongoose = require("mongoose");

const LabyrinthSchema = new mongoose.Schema({
  playfield: { type: [[Number]], required: true },
  startPoint: { type: [Number] },
  endPoint: { type: [Number] },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Labyrinth", LabyrinthSchema);
