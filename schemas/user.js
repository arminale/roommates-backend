import { Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
  apartment: ObjectId
});
