const express = require("express");
const UserRoutes = require("express").Router();
const { getUsers, getUserById, createUser } = require("../controllers/users");

UserRoutes.get("/users", express.json(), getUsers);
UserRoutes.get("/users/:userId", express.json(), getUserById);
UserRoutes.post("/users", express.json(), createUser);

module.exports = {
  UserRoutes,
};
