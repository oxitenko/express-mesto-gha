const express = require("express");
const CardRoutes = require("express").Router();
const {
  getCards,
  createCard,
  deleteCardById,
} = require("../controllers/cards");

CardRoutes.get("/cards", express.json(), getCards);
CardRoutes.post("/cards", express.json(), createCard);
CardRoutes.delete("/cards/:cardId", express.json(), deleteCardById);

module.exports = {
  CardRoutes,
};
