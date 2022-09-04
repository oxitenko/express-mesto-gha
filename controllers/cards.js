const Card = require('../models/cards');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = async (req, res, next) => {
  try {
    const card = await Card.find({});
    return res.status(200).send(card);
  } catch (err) {
    return next(new ServerError('Ошибка на сервере'));
  }
};

const createCard = async (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner });
    return res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные карточки'));
    }
    return next(new ServerError('Ошибка на сервере'));
  }
};

const deleteCardById = async (req, res, next) => {
  const { cardId } = req.params;
  const id = req.user._id;
  try {
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      return next(new NotFoundError('Такой карточки нет'));
    }
    if (id !== card.owner.toString()) {
      return next(new ForbiddenError('Не твоя карточка'));
    }
    return res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Некорректные данные запроса'));
    }
    return next(new ServerError('Ошибка на сервере'));
  }
};

const likeCard = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!card) {
      return next(new NotFoundError('Такой карточки нет'));
    }
    return res.status(200).send(card);
  } catch (errors) {
    if (errors.name === 'CastError') {
      return next(new BadRequestError('Некорректные данные запроса'));
    }
    return next(new ServerError('Ошибка на сервере'));
  }
};

const dislikeCard = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!card) {
      return next(new NotFoundError('Такой карточки нет'));
    }
    return res.status(200).send(card);
  } catch (errors) {
    if (errors.name === 'CastError') {
      return next(new BadRequestError('Некорректные данные запроса'));
    }
    return next(new ServerError('Ошибка на сервере'));
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
