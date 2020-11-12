const express = require("express");
const Music = require("../model/Music");
const router = express.Router();
const eA = require("../middleware/eA");

/* GET users listing. */
router.get("/add", eA, function (req, res, next) {
  res.render("musicAdd", { title: "Musiqa qoshish sahifasi" });
});

router.post("/add", eA, function (req, res, next) {
  req.checkBody("name", "Iltimos musiqa nomini yozing").notEmpty();
  // req.checkBody("singer", "Iltimos musiqa avtorini yozing").notEmpty();
  req.checkBody("comment", "Iltimos musiqaga izoh yozing").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    res.render("musicAdd", {
      title: "Musiqa qoshishda validator ishliyapti",
      errors: errors,
    });
  } else {
    const music = new Music();
    music.name = req.body.name;
    music.singer = req.user._id;
    music.comment = req.body.comment;

    music.save((err) => {
      if (err) console.log(err);
      else {
        req.flash("success", "Musiqa qoshildi");
        res.redirect("/");
      }
    });
  }
});

module.exports = router;
