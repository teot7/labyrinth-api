import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({});

module.exports = mongoose.model("User", UserSchema);
