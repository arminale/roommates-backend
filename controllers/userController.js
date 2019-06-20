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

module.exports = { isUserUnique: isUserUnique, createUser: createUser };
