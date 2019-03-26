var express = require("express");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var mongoose = require("mongoose");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/singletrackDB";
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

const scrape = require("./routes/scrapeRoutes");
const api = require("./routes/apiRoutes");
const html = require("./routes/htmlRoutes");

app.use('/scrape', scrape);
app.use('/api', api);
app.use('/', html);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
