const mongoose = require("mongoose");
const transactionBucketSchema = require("../schemas/transactionBucket");
const debug = require("debug")("r:controller:transaction");

const TransactionBucket = new mongoose.model(
  "Transaction Bucket",
  transactionBucketSchema
);

async function createTransactionBucket() {
  let beginBucketDate = new Date();
  beginBucketDate.setUTCDate(1);
  beginBucketDate.setHours(0, 0, 0, 0);
  let transactionBucket = new TransactionBucket({
    date: beginBucketDate,
    transactions: []
  });
  transactionBucketDoc = await transactionBucket.save();
  return transactionBucketDoc;
}
