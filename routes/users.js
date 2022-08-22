const express = require("express");
const UserRoutes = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");

UserRoutes.get("/users", express.json(), getUsers);
UserRoutes.get("/users/:userId", express.json(), getUserById);
UserRoutes.post("/users", express.json(), createUser);
UserRoutes.patch("/users/me", express.json(), updateUser);
UserRoutes.patch("/users/me/avatar", express.json(), updateUserAvatar);

module.exports = {
  UserRoutes,
};
