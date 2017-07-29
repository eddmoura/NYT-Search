var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var Article = require("./models/Article");

var app = express();

var PORT = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("build"));

                     ///MONGODB///
var databaseURL = "mongodb://localhost/nytreact";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect(databaseURL);
}
var db = mongoose.connection;


db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

                         ////ROUTES/////
app.get("/", function(req, res) { res.sendFile(__dirname + "/build/static/index.html"); });


app.get("/api/saved", function(req, res) {

  Article.find({}).exec(function(err, doc) {

    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});



app.post("/api/saved", function(req, res) {
  // console.log(req.body);
  var article = req.body;
  console.log(article);
  console.log(article.web_url);
  console.log(article.headline.main);
  console.log(article.byline.original);
  console.log(article.pub_date);



  var savedArticle = new Article({headline: article.headline.main, byline: article.byline.original, pubDate: article.pub_date, url: article.web_url});

  savedArticle.save(function(err, savedArticle) {

    if (err) {
      return res.json({ error: 'there was an error saving the item' });
    } else {
      // console.log(savedItem)
      return res.json(savedArticle);
    }
  });
});

app.delete("/api/saved/:id", (req, res) => {
  Article.remove({_id: req.params.id}, function (err, doc) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    console.log(doc);
    return res.json(doc);
  })
})
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
