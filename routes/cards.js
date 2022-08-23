const CardRoutes = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

CardRoutes.get('/cards', getCards);
CardRoutes.post('/cards', createCard);
CardRoutes.delete('/cards/:cardId', deleteCardById);
CardRoutes.put('/cards/:cardId/likes', likeCard);
CardRoutes.delete('/cards/:cardId/likes', dislikeCard);

module.exports = {
  CardRoutes,
};
