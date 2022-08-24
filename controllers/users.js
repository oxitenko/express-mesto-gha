const User = require('../models/users');

const DEFAULT_ERROR = 500;
const NOT_FOUND_ERROR = 404;
const BAD_REQUEST_ERROR = 400;

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (err) {
    return res.status(DEFAULT_ERROR).send({ message: 'Ошибка на сервере' });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: 'Пользователь не найден' });
    }
    return res.status(200).send(user);
  } catch (errors) {
    if (errors.name === 'CastError') {
      return res
        .status(BAD_REQUEST_ERROR)
        .send({ message: 'Некорректные данные пользователя' });
    }
    return res.status(DEFAULT_ERROR).send({ message: 'Ошибка на сервере' });
  }
};

const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    return res.status(200).send(user);
  } catch (errors) {
    if (errors.name === 'ValidationError') {
      return res
        .status(BAD_REQUEST_ERROR)
        .send({ message: 'Некорректные данные пользователя' });
    }
    return res.status(DEFAULT_ERROR).send({ message: 'Ошибка на сервере' });
  }
};

const updateUser = async (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: 'Пользователь не найден' });
    }
    return res.status(200).send(user);
  } catch (errors) {
    if (errors.name === 'ValidationError') {
      return res
        .status(BAD_REQUEST_ERROR)
        .send({ message: 'Некорректные данные пользователя' });
    }
    return res.status(DEFAULT_ERROR).send({ message: 'Ошибка на сервере' });
  }
};

const updateUserAvatar = async (req, res) => {
  const { avatar } = req.body;
  const id = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: 'Пользователь не найден' });
    }
    return res.status(200).send(user);
  } catch (errors) {
    if (errors.name === 'ValidationError') {
      return res
        .status(BAD_REQUEST_ERROR)
        .send({ message: 'Некорректные данные пользователя' });
    }
    return res.status(DEFAULT_ERROR).send({ message: 'Ошибка на сервере' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
