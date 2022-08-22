const express = require("express");
const CardRoutes = require("express").Router();
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

CardRoutes.get("/cards", express.json(), getCards);
CardRoutes.post("/cards", express.json(), createCard);
CardRoutes.delete("/cards/:cardId", express.json(), deleteCardById);
CardRoutes.put("/cards/:cardId/likes", express.json(), likeCard);
CardRoutes.delete("/cards/:cardId/likes", express.json(), dislikeCard);

module.exports = {
  CardRoutes,
};
