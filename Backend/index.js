const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();
const port = 5000;

app.use(cors());
app.use(fileUpload());
app.use(require("./routes/index"));

const run = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://code:code@cluster0.cnyps.mongodb.net/web-shop?retryWrites=true&w=majority", {
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
      }
    );
    app.listen(port, () => console.log("Сервер запустился"))
  } catch (e) {
    console.log("Something went wrong...", e);
  }
};

run();