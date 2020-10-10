var express = require("express");
const Music = require("../model/Music");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // const musics = [
  //   {
  //     id: 1,
  //     name: 'Gudki',
  //     singer: 'MOT',
  //     commets: 'Juda zor musiqa'
  //   },
  //   {
  //     id: 2,
  //     name: 'Gudki2',
  //     singer: 'MOT2',
  //     commets: 'Juda zor musiqa2'
  //   },
  //   {
  //     id: 3,
  //     name: 'Gudki3',
  //     singer: 'MOT3',
  //     commets: 'Juda zor musiqa3'
  //   },
  // ]

  Music.find({}, (err, musics)=>{
    if(err) console.log(err);
    else{
      res.render("index", { title: "Bosh sahifa", musics });
    }
  })
});

module.exports = router;
