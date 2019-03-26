var express = require('express')
var router = express.Router()

var db = require("../models");

  // Route for getting all Articles from the db
  
router.get("/favorites", function(req, res) {//get favorite articles
  db.Article.find({'favorite': true}).then(function(articles){
    res.render("saved", {articles: articles});
  })
  .catch(function(err) {
    res.json(err);
  });//end of find
});

router.get("/", function(req, res) {//get all articles
  db.Article.find({}).then(function(articles){
    res.render("landing", {articles: articles});
  })
  .catch(function(err) {
    res.json(err);
  });
});//end of all articles
  
router.get('*', function(req, res){//404 not available
res.status(404).send("404 Not Available")
})

module.exports = router;