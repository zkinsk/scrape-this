var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  artId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: false
  },
  favorite: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: false
  },
  notes: [
    {
    type: Schema.Types.ObjectId,
    ref: "Note"
    }
  ],
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;