const Card = require("../models/cards");
const DEFAULT_ERROR = 500;
const NOT_FOUND_ERROR = 404;
const BAD_REQUEST_ERROR = 400;

const getCards = async (req, res) => {
  try {
    const card = await Card.find({});
    res.status(200).send(card);
  } catch (err) {
    res.status(500).send({ message: "Ошибка на сервере" });
  }
};

const createCard = async (req, res) => {
  // const id = req.user._id;
  // const { name, link } = req.body;
  // try {
  //   const card = await Card.create({ name, link, owner: id });
  //   res.status(200).send(card);
  // } catch (err) {
  //   res.status(500).send({ message: "Ошибка на сервере" });
  // }
};

const deleteCardById = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await Card.findByIdAndDelete(id);
    res.status(200).send(card);
  } catch (err) {
    if (!id) {
      res.status(400).send({ message: "Такой карточки нет" });
      return;
    }
    res.status(500).send({ message: "Ошибка на сервере" });
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
};
