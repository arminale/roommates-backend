const mongoose = require("mongoose");
const transactionSchema = require("./transaction");

const transactionBucketSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  transactions: [transactionSchema]
});

module.exports = transactionBucketSchema;
