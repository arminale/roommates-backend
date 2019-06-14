const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  payer: { type: ObjectId, required: true },
  owners: [ObjectId],
  isDebtSettlement: { type: Boolean, required: true },
  payee: {
    type: ObjectId,
    required: function() {
      return this.isDebtSettlement;
    }
  }
});

module.exports = transactionSchema;
