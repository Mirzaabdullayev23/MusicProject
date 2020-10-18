const express = require("express");
const User = require("../model/User");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.get("/registr", function (req, res, next) {
  res.render("registr", { title: "Ro'yxatdan o'tish sahifasi" });
});

router.post("/registr", function (req, res, next) {
  req.checkBody("name", "Iltimos ismingizni yozing").notEmpty();
  req.checkBody("username", "Iltimos usernamemingiz yozing").notEmpty();
  req.checkBody("email", "Iltimos emailingizni yozing").notEmpty();
  req.checkBody("password", "Iltimos parolingizni yozing").notEmpty();
  req
    .checkBody("password2", "Iltimos parolingizni tasdiqlang")
    .equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    res.render("registr", {
      errors: errors,
    });
  } else {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    const newUser = new User({
      name: name,
      username: username,
      email: email,
      password: password,
    });

    bcrypt.genSalt(10, (err, pass) => {
      bcrypt.hash(newUser.password, pass, (err, hash) => {
        if (err) console.log(err);
        newUser.password = hash;
        newUser.save((err) => {
          if (err) console.log(err);
          else {
            req.flash("success", "Royxatdan otdingiz");
            res.redirect("/login");
          }
        });
      });
    });
  }
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Saytga kirish" });
});

module.exports = router;