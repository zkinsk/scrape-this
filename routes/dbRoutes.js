var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/singletrackDB", { useNewUrlParser: true });
// let newParser = "{ user}"
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/singletrackDB";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true});
var db = require("../models");


module.exports = function(app){
  // Route for getting all Articles from the db
  app.get("/articles", function(req, res) {
    // TODO: Finish the route so it grabs all of the articles
    db.Article.find().then(function(articles){
      // res.json(articles);
    })
  });
  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/articles/:id", function(req, res) {
    db.Article.findOne({"_id":req.params.id}).populate("note").then(function(oneArticle){
      res.json(oneArticle)
    })
    .catch(function (err){
      res.json(err);
    })
  });
  // Route for saving/updating an Article's associated Note
  app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
      .then(function(dbNote) {
        console.log(req.params.id);
        console.log(dbNote._id)
        return db.Article.findOneAndUpdate({_id: req.params.id}, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        // If the User was updated successfully, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });
};//end of module exports