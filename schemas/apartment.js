const mongoose = require("mongoose");
const debtSchema = require("./debt");
const _ = require("lodash");

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

apartmentSchema.methods.addMember = function(userId) {
  if (_.find(this.members, userId)) {
    return;
  } else {
    this.members.push(userId);
  }
};

module.exports = apartmentSchema;
