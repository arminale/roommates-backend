const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  apartment: mongoose.SchemaTypes.ObjectId
});

module.exports = userSchema;
