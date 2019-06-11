import { Schema } from "mongoose";
import transactionBucketSchema from "./transactionBucket";

var apartmentSchema = new Schema({
  name: String,
  members: [ObjectId],
  transactions: [transactionBucketSchema],
  debts: [{ from: ObjectId, to: ObjectId, amount: Number }]
});
