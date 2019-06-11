import { Schema } from "mongoose";

const transactionSchema = new Schema({
  date: Date,
  amount: Number,
  payer: ObjectId,
  owners: [ObjectId],
  isDebtSettlement: Boolean,
  payee: ObjectId
});

export default transactionSchema;
