const bcrypt = require("bcrypt");
const db = require("../config/models");
const jwt = require("jsonwebtoken");

const User = db.users;

const register = async (req, res) => {
  try {
    const { username, email, password, location, firstname, lastname } =
      req.body;

    const user = await User.create({
      username,
      password: await bcrypt.hash(password, 10),
      email,
      firstname,
      lastname,
      location,
    });

    if (user) {
      return res.status(201).send(user);
    } else {
      return res.status(401).send("User does not exist");
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.secretKey, {
          expiresIn: 8640000,
        });

        return res.status(200).json({
          token: token,
          id: user.id,
          username: user.username,
        });
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.error(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  if (!id) res.status(404).send("Please provide an id as parameter");

  try {
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User does not exist");
    }
  } catch (error) {
    console.error(error);
  }
};

const checkToken = async (req, res) => {
  res.status(200).json({ message: "Token is valid", user: req.user });
};

module.exports = {
  register,
  login,
  getUsers,
  getUser,
  checkToken,
};
