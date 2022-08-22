const User = require("../models/users");

const DEFAULT_ERROR = 500;
const NOT_FOUND_ERROR = 404;
const BAD_REQUEST_ERROR = 400;

// eslint-disable-next-line consistent-return
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(DEFAULT_ERROR).send({ message: "Ошибка на сервере" });
  }
};

// eslint-disable-next-line consistent-return
const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(200).send(user);
  } catch (errors) {
    if (errors.name === "CastError") {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: "Пользователь не найден" });
    }
    res.status(DEFAULT_ERROR).send({ message: "Ошибка на сервере" });
  }
};

// eslint-disable-next-line consistent-return
const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.status(200).send(user);
  } catch (errors) {
    if (errors.name.name === "ValidatorError") {
      return res
        .status(BAD_REQUEST_ERROR)
        .send({ message: "Некорректные данные пользователя" });
    }
    res.status(DEFAULT_ERROR).send({ message: "Ошибка на сервере" });
  }
};

// eslint-disable-next-line consistent-return
const updateUser = async (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true }
    );
    res.status(200).send(user);
  } catch (errors) {
    if (errors.name.name === "ValidatorError") {
      return res
        .status(BAD_REQUEST_ERROR)
        .send({ message: "Некорректные данные пользователя" });
    }
    if (errors.name === "CastError") {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: "Пользователь не найден" });
    }
    res.status(DEFAULT_ERROR).send({ message: "Ошибка на сервере" });
  }
};

// eslint-disable-next-line consistent-return
const updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(id, { avatar }, { new: true });
    res.status(200).send(user);
  } catch (errors) {
    if (errors.name.name === "ValidatorError") {
      return res
        .status(BAD_REQUEST_ERROR)
        .send({ message: "Некорректные данные пользователя" });
    }
    if (errors.name === "CastError") {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: "Пользователь не найден" });
    }
    res.status(DEFAULT_ERROR).send({ message: "Ошибка на сервере" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
