var express = require("express");
// var mongoose = require("mongoose");

// var axios = require("axios");
// var cheerio = require("cheerio");
var exphbs = require("express-handlebars");

// var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// mongoose.connect("mongodb://localhost/singletrackDB", { useNewUrlParser: true });


require("./routes/scrapeRoutes")(app);
require("./routes/dbRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
