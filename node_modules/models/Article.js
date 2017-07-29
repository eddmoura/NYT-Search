// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;
// Create article schema
var ArticleSchema = new Schema({
  // title is a required string
  title: {
    type: String
  },
  // date is a required data
  date: {
    type: Date
  },
  // url is a required string
  url: {
    type: String
  }
});
// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);
// Export the model
module.exports = Article;