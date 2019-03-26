var express = require('express')
var router = express.Router()

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");

router.get("/", function(req, res) {// router to scrape singletrack web page
  db.Article.find({}, "artId")
  .then(function(artIds){
    let articleIds = []
    artIds.forEach(article =>{
      articleIds.push(article.artId);
    });
    axios.get("https://www.singletracks.com/").then(function(response) {
      var $ = cheerio.load(response.data);
      let results = [];
      $("#newsfeed > .nf_item_wrapper").each(function(i, element) {
        let result = {};
        result.artId = $(this).attr('id');
        result.title = $(this).find("h2 a").text();
        result.tag = $(this).find("h2 a").attr("href");
        result.text = $(this).find(".nf_preview_text").text();
        results.push(result);
        if (!articleIds.includes(result.artId)){
          db.Article.create(result)
            .then(function(dbArticle) {
              console.log(dbArticle);
            })
            .catch(function(err) {
              console.log(err);
          });//end catch of article create
        }//end if
      });//end each loop
      console.log("scrape complete");
      res.send(results);
    });//end of axios promise
  });//end article promise
});//end of scrape route

module.exports = router
