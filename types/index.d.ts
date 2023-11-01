import express from "express";
import { HydratedDocument } from "mongoose";

export interface ILabyrinth {
  playfield: number[][];
  startPoint: number[];
  endPoint: number[];
  userId: mongoose.Schema.Types.ObjectId;
}

export type pathType = number[] | [number, number][];

declare module "express-session" {
  export interface SessionData {
    isAuth: boolean;
    userId: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      labyrinth: HydratedDocument<ILabyrinth>;
    }
  }
}
