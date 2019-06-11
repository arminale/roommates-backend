import { Schema } from "mongoose";
import transactionSchema from "./transaction";

const transactionBucketSchema = new Schema({
  date: date,
  transactions: [transactionSchema]
});

export default transactionBucketSchema;
