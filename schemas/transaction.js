const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  payer: { type: mongoose.SchemaTypes.ObjectId, required: true },
  owners: [mongoose.SchemaTypes.ObjectId],
  isDebtSettlement: { type: Boolean, required: true },
  payee: {
    type: mongoose.SchemaTypes.ObjectId,
    required: function() {
      return this.isDebtSettlement;
    }
  }
});

module.exports = transactionSchema;
