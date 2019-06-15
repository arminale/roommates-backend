const mongoose = require("mongoose");
const debtSchema = require("./debt");

var apartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: {
    // ObjectId references to users
    type: Array,
    validator: function(v) {
      return (
        v &&
        v.length > 0 &&
        array.every(v => typeof v === mongoose.SchemaTypes.ObjectId)
      );
    }
  },
  transactionBuckets: {
    // Array of ObjectId references to transactionBuckets
    type: Array,
    validator: function(v) {
      return (
        v &&
        v.length > 0 &&
        array.every(v => typeof v === mongoose.SchemaTypes.ObjectId)
      );
    }
  },
  debts: [debtSchema]
});

module.exports = apartmentSchema;
