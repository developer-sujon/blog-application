//external import
const User = require("../model/User");
exports.existingUser = async (userName) => {
  try {
    const user = await User.aggregate([
      {
        $match: { userName: userName },
      },
    ]);

    if (user && user.length > 0) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
