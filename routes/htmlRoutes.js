var db = require("../models");

module.exports = function (app){
  // Route for getting all Articles from the db
  
  app.get("/articles/favorites", function(req, res) {//get favorite articles
    db.Article.find({'favorite': true}).then(function(articles){
      res.render("landing", {articles: articles});
    })
    .catch(function(err) {
      res.json(err);
    });//end of find
  });
  
  app.get("/", function(req, res) {//get all articles
    db.Article.find({}).then(function(articles){
      res.render("landing", {articles: articles});
    })
    .catch(function(err) {
      res.json(err);
    });//end of all articles
  });
  
}//end of module exports