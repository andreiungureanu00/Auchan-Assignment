const db = require("../config/models");

const User = db.users;

const validateUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (user) {
      return res.status(409).send("Username is already in use");
    }

    const email = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (email) {
      return res.status(409).send("Email is already in use");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  validateUser,
};
