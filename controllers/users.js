const User = require("../models/users");
const DEFAULT_ERROR = 500;
const NOT_FOUND_ERROR = 404;
const BAD_REQUEST_ERROR = 400;

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    if (err.name === "SomeErrorName")
      return res.status(DEFAULT_ERROR).send({ message: "Ошибка на сервере" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (err) {
    if (err.name === "ValidatorError") {
      return res
        .status(BAD_REQUEST_ERROR)
        .send({ message: "Пользователь не найден" });
    }
    res.status(500).send({ message: "Ошибка на сервере" });
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send({ message: "Некорректные данные пользователя" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
