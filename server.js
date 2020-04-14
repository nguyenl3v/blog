const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

mongoose
  .connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(bodyParser.json());

const register = require("./router/register");
const login = require("./router/login");

app.use("/", register);
app.use("/", login);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("started port 4000"));
