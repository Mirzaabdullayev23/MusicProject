const express = require("express");
const Music = require("../model/Music");
const router = express.Router();
const eA = require("../middleware/eA");

/* GET users listing. */
router.get("/edit/:id", eA, function (req, res, next) {
  Music.findById(req.params.id, (err, musics) => {
    res.render("musicEdit", {
      title: "Musiqa o'zgartirish sahifasi",
      musics,
    });
  });
});

router.post("/edit/:id", (req, res) => {
  const music = {};
  music.name = req.body.name;
  music.singer = req.body.singer;
  music.comment = req.body.comment;

  const query = { _id: req.params.id };

  Music.update(query, music, (err) => {
    if (err) console.log(err);
    res.redirect("/");
  });
});

module.exports = router;
