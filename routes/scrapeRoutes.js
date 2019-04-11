var express = require('express')
var router = express.Router()

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");

router.get("/", function(req, res) {// router to scrape singletrack web page
  db.Article.find({}, "tag")
  .then(function(tags){
    let articleTags = tags.map(data => data.tag);
    
    axios.get("https://www.singletracks.com/").then(function(response) {
      var $ = cheerio.load(response.data);
      let results = [];
      $("#st_latest_news > .nf_item_wrapper").each(function(i, element) {
        let result = {};
        result.title = $(this).find("h2 a").text();
        result.tag = $(this).find("h2 a").attr("href");
        result.text = $(this).find(".nf_preview_text").text().trim();
        result.image = $(this).find(".col-md-5").css("background-image").replace('url(\'','').replace('\')','').replace(/\"/gi, "")
        console.log("img: " , result.image);
        // results.push(result);
        if (!articleTags.includes(result.tag)){
          results.push(result);
        }//end if
      });//end each loop
      db.Article.insertMany(results)
      .then(
        db.Article.find()
        .then(results => {res.send(results)})
      )
      console.log("scrape complete");
    });//end of axios promise
  });//end article promise
});//end of scrape route

module.exports = router
