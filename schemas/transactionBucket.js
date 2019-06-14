const mongoose = require("mongoose");
const transactionSchema = require("./transaction");

const transactionBucketSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: new Date(Date.now.getUTCYFullYear(), Date.now.getUTCYMonth())
  },
  transactions: [transactionSchema]
});

module.exports = transactionBucketSchema;
