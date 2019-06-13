const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: Date,
  amount: Number,
  payer: ObjectId,
  owners: [ObjectId],
  isDebtSettlement: Boolean,
  payee: ObjectId
});

module.exports = transactionSchema;
