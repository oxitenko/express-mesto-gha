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
UserRoutes.patch('/users/me/avatar', updateUserAvatar);

module.exports = {
  UserRoutes,
};
