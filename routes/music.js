const express = require("express");
const Music = require("../model/Music");
const router = express.Router();
const User = require("../model/User");
const eA = require("../middleware/eA");

/* GET users listing. */
router.get("/:id", eA, function (req, res, next) {
  Music.findById(req.params.id, (err, musics) => {
    User.findById(musics.singer, (err, user) => {
      res.render("music", {
        title: "Musiqa sahifasi",
        musics,
        admin: user.name,
      });
    });
  });
});

module.exports = router;
