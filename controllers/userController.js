const mongoose = require("mongoose");
const userSchema = require("../schemas/user");

const User = mongoose.model("User", userSchema);

async function isUserUnique(user) {
  return (await User.find({ username: user.username })).length !== 0;
}

async function createUser(userConfig) {
  let user = new User({ username: userConfig.username });
  debug(user);
  user = await user.save();
}

async function updateUser(userId, updatePackage) {
  return await User.findByIdAndUpdate(userId, updatePackage);
}

module.exports = {
  isUserUnique: isUserUnique,
  createUser: createUser,
  updateUser: updateUser
};
