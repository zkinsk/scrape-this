var express = require('express')
var router = express.Router()

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");

router.get("/", function(req, res) {// router to scrape singletrack web page
  db.Article.find({}, "artId")
  .then(function(artIds){
    let articleIds = artIds.map(data => data.artId);
    
    axios.get("https://www.singletracks.com/").then(function(response) {
      var $ = cheerio.load(response.data);
      let results = [];
      $("#st_latest_news > .nf_item_wrapper").each(function(i, element) {
        let result = {};
        // result.artId = $(this).attr('id');
        result.artId = $(this).find("h2 a").attr("href");
        result.title = $(this).find("h2 a").text();
        result.tag = $(this).find("h2 a").attr("href");
        result.text = $(this).find(".nf_preview_text").text().trim();
        // result.image = $(this).find("a img").attr("src");
        // result.image = $(this).find(".col-md-5").css("background-image")
        result.image = $(this).find(".col-md-5").css("background-image").replace('url(\'','').replace('\')','').replace(/\"/gi, "")
        // result.image = "https://via.placeholder.com/150/FFFF00/000000/?text=WebsiteBuilders.com";
        // console.log("Title: " , result.title);
        // console.log("ID: " , result.tag);
        // console.log("tag: " , result.tag);
        // console.log("text: " , result.text);
        console.log("img: " , result.image);
        results.push(result);
        if (!articleIds.includes(result.artId)){
          db.Article.create(result)
            .then(function(dbArticle) {
              // console.log(dbArticle);
            })
            .catch(function(err) {
              console.log(err);
          });//end catch of article create
        }//end if
      });//end each loop
      console.log("scrape complete");
      // console.log("results ", results)
      res.send(results);
    });//end of axios promise
  });//end article promise
});//end of scrape route

module.exports = router
