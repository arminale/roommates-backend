const mongoose = require("mongoose");

const debtSchema = new mongoose.Schema({
  from: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  to: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = debtSchema;
