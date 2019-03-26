var express = require('express')
var router = express.Router()

var db = require("../models");


// Route for grabbing a specific Article by id, populate it with it's notes
router.get("/article/:id", function(req, res) {//get article by id along with it's notes
  db.Article.findOne({"_id":req.params.id}).populate("note").then(function(oneArticle){
    res.json(oneArticle)
  })
  .catch(function (err){
    res.json(err);
  });//end of fine one
});


//route for adding or removing article to favorites list
router.patch("/articles/favorites/:id/:status", function(req, res){
  db.Article.findOneAndUpdate({'artId': req.params.id}, {$set: {'favorite': req.params.status}})
  .then(function(faveResponse){
    res.end();
  })
  .catch(function(err) {
    res.json(err);
  });//end of findOne
});//end of favorites patch

// Route for adding a new Article Note
router.post("/note/:artid", function(req, res) {
  db.Note.create(req.body)
  .then(function(dbNote) {
    return db.Article.findOneAndUpdate(
      {'_id': req.params.artid},  
      { $push: { notes: dbNote._id } }, 
      { new: true });
  })
  .then(function(dbArticle) {
    res.json(dbArticle);
  })
  .catch(function(err) {
    res.json(err);
  });
});//end fo saving note

// Route for deleting a note from an article
router.delete("/note/:artid/:noteid", function(req, res){
  db.Article.update(
    {'_id': req.params.artid},
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


module.exports = router