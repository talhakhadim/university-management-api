const bcrypt = require("bcrypt");

//function to hash password

const genHashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  return hashedPassword;
};
const comparePassword = async (enteredPassword, savedPassword) => {
  const isMatched = await bcrypt.compare(enteredPassword, savedPassword);
  if (!isMatched) {
    return false;
  }
  return true;
};

module.exports = { genHashedPassword, comparePassword };
