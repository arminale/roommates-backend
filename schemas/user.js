const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  apartment: ObjectId
});
