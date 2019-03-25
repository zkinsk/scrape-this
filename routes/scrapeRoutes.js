var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/singletrackDB";
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
// mongoose.connect("mongodb://localhost/singletrackDB", { useNewUrlParser: true });
var db = require("../models");

module.exports = function(app) {
  app.get("/scrape", function(req, res) {
    axios.get("https://www.singletracks.com/").then(function(response) {
      var $ = cheerio.load(response.data);
      let results = [];
      $("#newsfeed .nf_item_wrapper").each(function(i, element) {
        let result = {};
        result.title = $(this).find("h2 a").text();
        result.tag = $(this).find("h2 a").attr("href");
        result.artId = $(this).attr('id');
        result.text = $(this).find(".nf_preview_text").text();
        results.push(result);
        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          });
      });
      res.send(results);
    });//end of axios promise
  });//end of scrape route
};//end of module.exports

