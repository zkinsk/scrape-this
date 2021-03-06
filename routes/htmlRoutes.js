var express = require('express')
var router = express.Router()

var db = require("../models");

  // Route for getting all Articles from the db

router.get("/favorites", function(req, res) {//get favorite articles
  db.Article.find({'favorite': true}).lean().then(function(articles){
    res.render("saved", {articles: articles, title: "Saved", saved: "true", titleCard: "Save This"});
  })
  .catch(function(err) {
    res.json(err);
  });//end of find
});

router.get("/", function(req, res) {//get all articles
  db.Article.find({}).lean().then(function(articles){
    res.render("landing", {articles: articles, title: "Scape This!", home:"true", titleCard: "Scrape This"});
  })
  .catch(function(err) {
    res.json(err);
  });
});//end of all articles

router.get('*', function(req, res){//404 not available
res.status(404).send("404 Not Available")
})

module.exports = router;