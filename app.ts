import express, { Request, Response } from "express";
const connectDb = require("./config/db");
const dotenv = require("dotenv").config();
const routes = require("./routes/api");
const authentication = require("./middleware/auth");
const session = require("express-session");

connectDb();
const app = express();
const PORT = process.env.PORT || 3500;

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(authentication);
app.use("/labirynth", routes);

app.all("*", (req: Request, res: Response) => {
  res.status(400).json({ message: "Endpoint not valid" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
