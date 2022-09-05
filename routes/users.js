const UserRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getUserInfo,
} = require('../controllers/users');

UserRoutes.get('/users', getUsers);
UserRoutes.get('/users/me', getUserInfo);

UserRoutes.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

UserRoutes.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);

UserRoutes.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
    // eslint-disable-next-line no-useless-escape
      .regex(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)
      .default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  }),
}), updateUserAvatar);

module.exports = {
  UserRoutes,
};
