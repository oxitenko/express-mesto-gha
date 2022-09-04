const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const AuthError = require('../errors/AuthError');
const ConflictError = require('../errors/ConflictError');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).send(users);
  } catch (err) {
    return next(new ServerError('Ошибка на сервере'));
  }
};

const getUserInfo = async (req, res, next) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return next(new NotFoundError('Пользователь не найден'));
    }
    return res.status(200).send(user);
  } catch (err) {
    return next(new ServerError('Ошибка на сервере'));
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoundError('Пользователь не найден'));
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Некорректные данные пользователя'));
    }
    return next(new ServerError('Ошибка на сервере'));
  }
};

const createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные пользователя'));
    }
    if (err.code === 11000) {
      return next(new ConflictError('Пользователь с таким email уже существует'));
    }
    return next(new ServerError('Ошибка на сервере'));
  }
};

const updateUser = async (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new NotFoundError('Пользователь не найден'));
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные пользователя'));
    }
    return next(new ServerError('Ошибка на сервере'));
  }
};

const updateUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new NotFoundError('Пользователь не найден'));
    }
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные пользователя'));
    }
    return next(new ServerError('Ошибка на сервере'));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AuthError('Неправильные почта или пароль'));
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return next(new AuthError('Неправильные почта или пароль'));
    }

    const token = jwt.sign(
      { _id: user._id },
      'SECRETCODE',
      { expiresIn: '7d' },
    );
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: true,
    });
    return res.status(200).send(user);
  } catch (err) {
    return next(new ServerError('Ошибка на сервере'));
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getUserInfo,
};
