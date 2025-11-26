import mongoose from "mongoose";
import { useVirtualId } from "../db/database.mjs";

const userSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  url: String,
});

useVirtualId(userSchema);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function findByUserid(userid) {
  return User.findOne({ userid });
}

export async function findById(id) {
  return User.findById(id);
}

export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}
