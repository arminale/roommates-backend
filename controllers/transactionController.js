const mongoose = require("mongoose");
const transactionBucketSchema = require("../schemas/transactionBucket");
const transactionSchema = require("../schemas/transaction");
const debug = require("debug")("r:controller:transaction");

const Transaction = new mongoose.model("Transaction", transactionSchema);
const TransactionBucket = new mongoose.model(
  "Transaction Bucket",
  transactionBucketSchema
);

function createTransactionBucket(startDate) {
  startDate.setUTCDate(1);
  startDate.setHours(0, 0, 0, 0);
  let transactionBucket = new TransactionBucket({
    date: startDate,
    transactions: []
  });
  return transactionBucket;
}

function createTransaction(transactionInfo, apartment) {
  let transaction = new Transaction({
    date: new Date(transactionInfo.date),
    amount: parseFloat(transactionInfo.amount),
    payer: mongoose.Types.ObjectId(transactionInfo.userId)
  });

  if (transactionInfo.isDebtSettlement == "true") {
    transaction.isDebtSettlement = true;
    transaction.payee = mongoose.Types.ObjectId(transactionInfo.payeeId);
    transaction.owners = [mongoose.Types.ObjectId(transactionInfo.userId)];
  } else {
    transaction.isDebtSettlement = false;
    transaction.owners = apartment.members;
  }
  return transaction;
}

module.exports = { createTransactionBucket: createTransactionBucket };
