const Card = require('../models/cards');

const DEFAULT_ERROR = 500;
const NOT_FOUND_ERROR = 404;
const BAD_REQUEST_ERROR = 400;

const getCards = async (req, res) => {
  try {
    const card = await Card.find({});
    return res.status(200).send(card);
  } catch (error) {
    return res.status(DEFAULT_ERROR).send({ message: 'Ошибка на сервере' });
  }
};

const createCard = async (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner });
    return res.status(200).send(card);
  } catch (errors) {
    if (errors.name === 'ValidationError') {
      return res
        .status(BAD_REQUEST_ERROR)
        .send({ message: 'Некорректные данные карточки' });
    }
    return res.status(DEFAULT_ERROR).send({ message: 'Ошибка на сервере' });
  }
};

const deleteCardById = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: 'Такой карточки нет' });
    }
    return res.status(200).send(card);
  } catch (errors) {
    if (errors.name === 'CastError') {
      return res
        .status(BAD_REQUEST_ERROR)
        .send({ message: 'Некорректные данные запроса' });
    }
    return res.status(DEFAULT_ERROR).send({ message: 'Ошибка на сервере' });
  }
};

const likeCard = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!card) {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: 'Такой карточки нет' });
    }
    return res.status(200).send(card);
  } catch (errors) {
    if (errors.name === 'CastError') {
      return res
        .status(BAD_REQUEST_ERROR)
        .send({ message: 'Некорректные данные запроса' });
    }
    return res.status(DEFAULT_ERROR).send({ message: 'Ошибка на сервере' });
  }
};

const dislikeCard = async (req, res) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true, runValidators: true },
    );
    if (!card) {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: 'Такой карточки нет' });
    }
    return res.status(200).send(card);
  } catch (errors) {
    if (errors.name === 'CastError') {
      return res
        .status(BAD_REQUEST_ERROR)
        .send({ message: 'Некорректные данные запроса' });
    }
    return res.status(DEFAULT_ERROR).send({ message: 'Ошибка на сервере' });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
