const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;
const app = express();
const { UserRoutes } = require("./routes/users");
const { CardRoutes } = require("./routes/cards");

app.use((req, res, next) => {
  req.user = {
    _id: "63023f63b35df8b746b4b228",
  };

  next();
});

app.use(UserRoutes);

app.use(CardRoutes);

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mestodb", {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });

    await app.listen(PORT);
  } catch (error) {
    console.log(error);
  }
}

main();
