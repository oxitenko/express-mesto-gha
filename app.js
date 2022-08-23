const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

const { UserRoutes } = require('./routes/users');
const { CardRoutes } = require('./routes/cards');

const NOT_FOUND_ERROR = 404;
const DEFAULT_ERROR = 500;

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '63023f63b35df8b746b4b228',
  };

  next();
});

app.use(UserRoutes);

app.use(CardRoutes);

app.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Страница не найдена' });
});

async function main(req, res) {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });

    await app.listen(PORT);
  } catch (error) {
    res.status(DEFAULT_ERROR).send({ message: 'Ошибка на сервере' });
  }
}

main();
