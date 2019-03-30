var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  artId: {
    type: String,
    required: true
  },
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;