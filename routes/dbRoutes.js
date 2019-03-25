var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/singletrackDB", { useNewUrlParser: true });
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/singletrackDB";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true});
var db = require("../models");


module.exports = function(app){
  // Route for getting all Articles from the db
  app.get("/articles", function(req, res) {//get all articles
    db.Article.find().then(function(articles){
      res.json(articles);
    })
    .catch(function(err) {
      res.json(err);
    });//end of all articles
  });

  // Route for grabbing a specific Article by id, populate it with it's notes
  app.get("/articles/:id", function(req, res) {//get article by id along with it's notes
    db.Article.findOne({"_id":req.params.id}).populate("note").then(function(oneArticle){
      res.json(oneArticle)
    })
    .catch(function (err){
      res.json(err);
    });//end of fine one
  });

  app.get("/articles/favorites", function(req, res) {//get favorite articles
    db.Article.find({'favorite': true}).then(function(articles){
      res.json(articles);
    })
    .catch(function(err) {
      res.json(err);
    });//end of find
  });

  //route for adding or removing article to favorites list
  app.patch("articles/favorites/:id/:status", function(req, res){
    db.Article.findOneAndUpdate({'_id': req.params.id}, {$set: {'favorite': req.params.status}})
    .then(function(faveResponse){
      console.log(faveResponse);
      res.end();
    })
    .catch(function(err) {
      res.json(err);
    });//end of findOne
  });//end of favorites patch

  // Route for adding a new Article Note
  app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
      .then(function(dbNote) {
        console.log(req.params.id);
        console.log(dbNote._id)
        return db.Article.findOneAndUpdate({_id: req.params.id},  { $push: { notes: dbNote._id } }, { new: true });
      })
      .then(function(dbArticle) {
        // If the User was updated successfully, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });//end fo saving note

  // Route for deleting a note from an article
  app.delete("/articles/:id/:noteid", function(req, res){
    db.Article.update(
      {'_id': req.params.id},
      { $pull: { notes: req.params.noteid } }
    )
    .then(function(noteRemove){
      db.Note.deleteOne({'.id': req.params.noteid})
      .then(function(noteDelete){
        console.log("noteRemove: ", noteRemove)
        console.log("noteDelete: ", noteDelete);
        res.end();
      })
      .catch(function(err) {
        res.json(err);
      });//end of note delete
    })
    .catch(function(err) {
      res.json(err);
    });//end of note remove
  });//end of delete note

};//end of module exports