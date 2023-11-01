import mongoose from "mongoose";
import { ILabyrinth } from "../types";

const LabyrinthSchema = new mongoose.Schema<ILabyrinth>({
  playfield: { type: [[Number]], required: true },
  startPoint: { type: [Number] },
  endPoint: { type: [Number] },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Labyrinth", LabyrinthSchema);
