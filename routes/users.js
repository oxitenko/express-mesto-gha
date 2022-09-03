const UserRoutes = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

UserRoutes.get('/users', getUsers);
UserRoutes.get('/users/:userId', getUserById);
UserRoutes.patch('/users/me', updateUser);
UserRoutes.patch('/users/me/avatar', updateUserAvatar);

module.exports = {
  UserRoutes,
};
