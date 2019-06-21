const mongoose = require("mongoose");
const debug = require("debug")("r:controller:user");
const userSchema = require("../schemas/user");

const User = mongoose.model("User", userSchema);

async function isUserUnique(user) {
  return (await User.find({ username: user.username })).length !== 0;
}

function createUser(userConfig) {
  let user = new User({ username: userConfig.username });
  debug(user);
  return user;
}

async function updateUser(userIdString, updatePackage) {
  return await User.findByIdAndUpdate(userIdString, updatePackage, {
    new: true
  });
}

async function getUser(userIdString) {
  return await User.findById(mongoose.Types.ObjectId(userIdString));
}

async function addApartment(userIdString, apartmentIdString) {
  const user = await getUser(userIdString);
  if (!user.apartment) {
    user.apartment = mongoose.Types.ObjectId(apartmentIdString);
    return { user: user };
  } else {
    return { error: new Error("User alread has an apartment!") };
  }
}
module.exports = {
  isUserUnique: isUserUnique,
  createUser: createUser,
  updateUser: updateUser,
  addApartment: addApartment
};
