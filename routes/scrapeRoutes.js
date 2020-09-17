var express = require('express');
var router = express.Router();

const { scrape } = require('../services/scrape');

router.get('/', async function (req, res) {
  const results = await scrape();
  // console.log("results: ", results)
  res.json(results);
}); //end of scrape route

module.exports = router;
