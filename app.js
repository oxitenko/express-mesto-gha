const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

const cookieParser = require('cookie-parser');
const { UserRoutes } = require('./routes/users');
const { CardRoutes } = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const NOT_FOUND_ERROR = 404;
const DEFAULT_ERROR = 500;
app.use(express.json());
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

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
