const mongoose = require("mongoose");
const transactionSchema = require("./transaction");

const transactionBucketSchema = new mongoose.Schema({
  date: date,
  transactions: [transactionSchema]
});

module.exports = transactionBucketSchema;
