const Labyrinth = require("../models/labyrinth");
const {
  generateLabyrinth,
  getErrorMessage,
  resolveLabyrinth,
} = require("../utils/utils");
import { Request, Response, NextFunction } from "express";

const getLabyrinthsByUserId = async (req: Request, res: Response) => {
  const userId = req.session.userId;

  try {
    const labyrinths = await Labyrinth.find({ userId });
    res.status(200).json(labyrinths);
  } catch (error: unknown) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

const getLabyrinthById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.session.userId;

  try {
    const labyrinth = await Labyrinth.findOne({ _id: id, userId });

    if (!labyrinth) {
      return res.status(404).json({ message: "Labyrinth not found" });
    }

    res.status(200).json({ labyrinth });
  } catch (error: unknown) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

const createLabyrinth = async (req: Request, res: Response) => {
  const playfield = generateLabyrinth();
  const userId = req.session.userId;

  try {
    const labyrinth = new Labyrinth({ playfield, userId });
    await labyrinth.save();
    res.status(201).json({ labirinthId: labyrinth.id });
  } catch (error: unknown) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

const setPlayfieldType = async (req: Request, res: Response) => {
  const x: number = Number(req.params.x);
  const y: number = Number(req.params.y);
  const column = x - 1;
  const row = y - 1;
  const type = req.params.type === "filled" ? 1 : 0;

  if (req.params.type !== "filled" && req.params.type !== "empty") {
    return res
      .status(400)
      .json({ message: "Param type must be filled or empty" });
  }

  try {
    const labyrinth = req.labyrinth;

    labyrinth.playfield[row][column] = type;
    await labyrinth.save();

    res.status(200).json({ message: "Playfield updated" });
  } catch (error: unknown) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

const setStartPoint = async (req: Request, res: Response) => {
  const x: number = Number(req.params.x);
  const y: number = Number(req.params.y);
  const column = x - 1;
  const row = y - 1;

  try {
    const labyrinth = req.labyrinth;

    labyrinth.startPoint = [row, column];
    await labyrinth.save();

    res.status(200).json({ message: "Start point updated" });
  } catch (error: unknown) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

const setEndPoint = async (req: Request, res: Response) => {
  const x: number = Number(req.params.x);
  const y: number = Number(req.params.y);
  const column = x - 1;
  const row = y - 1;

  try {
    const labyrinth = req.labyrinth;

    labyrinth.endPoint = [row, column];
    await labyrinth.save();

    res.status(200).json({ message: "End point updated" });
  } catch (error: unknown) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

const getSolution = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.session.userId;

  try {
    const labyrinth = await Labyrinth.findOne({ _id: id, userId });

    if (!labyrinth) {
      return res.status(404).json({ message: "Labyrinth not found" });
    }

    if (labyrinth.startPoint.length !== 2 || labyrinth.endPoint.length !== 2) {
      return res
        .status(500)
        .json({ message: "You have to set the start point and the end point" });
    }

    const path = resolveLabyrinth(
      labyrinth.playfield,
      labyrinth.startPoint,
      labyrinth.endPoint
    );

    if (path === undefined) {
      return res
        .status(400)
        .json({ message: "It is not possible resolve this labyrinth" });
    }

    const directions = [];

    for (let i = 1; i < path.length; i++) {
      const [prevRow, prevCol] = path[i - 1];
      const [row, col] = path[i];

      if (row < prevRow) {
        directions.push("up");
      }

      if (row > prevRow) {
        directions.push("down");
      }

      if (col < prevCol) {
        directions.push("left");
      }

      if (col > prevCol) {
        directions.push("right");
      }
    }

    res.status(200).send({ directions });
  } catch (error: unknown) {
    res.status(500).json({ message: getErrorMessage(error) });
  }
};

const getLabyrinthToSetPoints = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const x: number = Number(req.params.x);
  const y: number = Number(req.params.y);
  const userId = req.session.userId;

  if (x <= 0 || x > 7) {
    return res
      .status(400)
      .json({ message: "X params must be between 1 and 7" });
  }

  if (y <= 0 || y > 4) {
    return res
      .status(400)
      .json({ message: "Y params must be between 1 and 4" });
  }

  try {
    const labyrinth = await Labyrinth.findOne({ _id: id, userId });

    if (!labyrinth) {
      return res.status(404).json({ message: "Labyrinth not found" });
    }

    req.labyrinth = labyrinth;
  } catch (error: unknown) {
    res.status(500).json({ message: getErrorMessage(error) });
  }

  next();
};

module.exports = {
  getLabyrinthsByUserId,
  getLabyrinthById,
  createLabyrinth,
  setPlayfieldType,
  setStartPoint,
  setEndPoint,
  getSolution,
  getLabyrinthToSetPoints,
};
