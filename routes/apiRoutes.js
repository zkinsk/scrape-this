var express = require('express')
var router = express.Router()

var db = require("../models");


// Route for grabbing a specific Article by id, populate it with it's notes
router.get("/article/:id", function(req, res) {//get article by id along with it's notes
  db.Article.findOne({"artId":req.params.id}).populate("notes").then(function(oneArticle){
    res.json(oneArticle)
  })
  .catch(function (err){
    res.json(err);
  });//end of fine one
});

router.delete("/articles", (req,res) =>{
  db.Article.find({"favorite": false},{"artId":1, "_id": 0})
  .then(artIds => {
    let idArr = artIds.map(id => id.artId)
    db.Note.remove({"artId": {$in: idArr} });
    // console.log(artIds);
  })
  db.Article.deleteMany({"favorite": false})
  .then(artResponse =>{
    // console.log(artResponse);
    res.end();
  })
});//

//route for adding or removing article to favorites list
router.patch("/articles/favorites/:id/:status", function(req, res){
  let status = req.params.status === "true";
  db.Article.findOneAndUpdate({'artId': req.params.id}, {$set: {'favorite': status}})
  .then(faveResponse => {
    // console.log("status: " + status);
    // if (!status){
    //   console.log("deleting");
    //   db.Note.deleteMany({'artId': req.params.id})
    //   .then(deleted => console.log(deleted));
    // }
    res.end();
  })
  .catch(function(err) {
    res.json(err);
  });//end of findOne
});//end of favorites patch

// Route for adding a new Article Note
router.post("/note/:artid", function(req, res) {
  // console.log(req.body);
  db.Note.create(req.body)
  .then(function(dbNote) {
    return db.Article.findOneAndUpdate(
      {'artId': req.params.artid},  
      { $push: { notes: dbNote._id } }, 
      { new: true });
  })
  .then(function(dbArticle) {
    // console.log(dbArticle);
    res.json(dbArticle);
  })
  .catch(function(err) {
    res.json(err);
  });
});//end fo saving note

// Route for deleting a note from an article
router.delete("/note/:artid/:noteid", function(req, res){
  db.Article.update(
    {'artId': req.params.artid},
    { $pull: { notes: req.params.noteid } }
  )
  .then(function(noteRemove){
    db.Note.deleteOne({'_id': req.params.noteid})
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