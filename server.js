const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const app = express();

mongoose
  .connect(process.env.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log(err));

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use("/publish", express.static("publish/upload"));

const register = require("./router/register");
const login = require("./router/login");
const post = require("./router/post");
app.get("/", function (req, res) {
  res.render("index");
});
app.use("/", register);
app.use("/", login);
app.use("/", post);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("started port 4000"));
