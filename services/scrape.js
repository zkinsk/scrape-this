var axios = require('axios');
var cheerio = require('cheerio');
var db = require('../models');

// const { saveFile } = require('../utils/savePage.js');

// function saveFile (file) {
//     fs.writeFile('output.html', file, (err, res) => {
//       if (err) {
//         return console.error(err);
//       }
//       return console.log(res);
//     });
//     console.log('saving a file');
//   }

module.exports = {
  scrape: function () {
    return new Promise((resolve, reject) => {
      db.Article.find({})
        .then(function (allArticles) {
          let articleTags = allArticles.map((data) => data.tag); // gets all articles stored in DB so we don't scrape duplicates.

          axios.get('https://www.singletracks.com/').then(function (response) {
            // saveFile(response.data);
            var $ = cheerio.load(response.data);
            let results = [];
            $('#st_latest_news > .nf_item_wrapper').each(function (i, element) {
              let result = {};
              result.title = $(this).find('h2 a').text();
              result.tag = $(this).find('h2 a').attr('href');
              result.text = $(this).find('.nf_preview_text').text().trim();
              result.image = $(this)
                .find('.lazy')
                .attr('data-bg')
                .replace("url('", '')
                .replace("')", '')
                .replace(/\"/gi, '');
              console.log(result.image);
              if (!articleTags.includes(result.tag)) { // conditional to verify that this article doesn't already exist in the db. 
                results.push(result);
                allArticles.push(result);
              }
            });
            db.Article.insertMany(results).then(() => {
              console.log(results);
              resolve(allArticles);
            });
            console.log('scrape complete');
          });
        })
        .catch((err) => reject(err));
    });
  },
};
