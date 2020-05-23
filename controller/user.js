const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
module.exports.index = async function (req, res) {
  const { name, email, password, avatar } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "nguyenka1358@gmail.com",
      pass: "nguyen_1108",
    },
  });
  const user = await User.findOne({ email });
  if (user) {
    res.json({ msg: "email already exist" });
  } else {
    const user = new User({
      name,
      email,
      password,
      avatar: typeof avatar !== "object" ? null : avatar,
      very:false
    });
    bcrypt.genSalt(10, function (err, password) {
      bcrypt.hash(user.password, password, function (err, hash) {
        user.password = hash;
        user.save();
        res.json(user);
        var mailOptions = {
          from: '"xac thuc mail ?" <foo@blurdybloop.com>', // sender address
          to: user.email, // list of receivers
          subject: "very mail", // Subject line
          text: `Hello ${user.email}`, // plaintext body
          html: `xac thuc mail de dang nhap! \n http://localhost:4000/verymail/${user._id}`, // html body
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return console.log(error);
          }
          console.log("Message sent: " + info.response);
        });
      });
    });
  }
};

module.exports.login = async function (req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (user.very) {
      if (bcrypt.compareSync(password, user.password)) {
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
        };
        const token = jwt.sign(
          {
            data: payload,
          },
          process.env.secretToken,
          { expiresIn: "1d" }
        );
        res.json(token);
      } else {
        res.json({ msg: "password do not match" });
      }
    } else {
      res.json({ msg: "email not very" });
    }
  } else {
    res.json({ msg: "email not exist" });
  }
};

module.exports.profile = async function (req, res) {
  const user = await User.findById({ _id: req.user.data.id }).select(
    "-password"
  );
  res.json(user);
};
module.exports.veryfileMail = async function (req, res) {
  const id = req.params.id;
  const user = await User.findById({ _id: id });
  try {
    if (user) {
      user.very = true;
      user.save();
      res.redirect("http://localhost:3000/login");
    }
  } catch (error) {
    res.send("mail khong ton tai");
  }
};
