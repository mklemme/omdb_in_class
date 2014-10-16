var express = require("express"),
app = express(),
request = require('request'),
bodyParser = require("body-parser");


app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({entended:true}));

pageTitle = "Movies";
searchTerm = "";
searchId= "";

var f = require("./public/js/app.js");
var exports = module.exports = {};

exports.favorites = [];

// Index page
app.get('/', function(req, res){
  bodyClass = "searchPage";
  res.render('index');
});

// Results page
app.get('/search', function(req,res){
  pageTitle = "Search";
  bodyClass = "search";

  searchTerm = req.query.s;
  var url = "http://www.omdbapi.com/?s=" + searchTerm;

  request(url, function(error, response, body){
    if (!error && response.statusCode == 200) {
      var obj = JSON.parse(body);
      res.render('results', {movieList : obj.Search, searchTerm : searchTerm});
    }
  });
});

// Single movie page
app.get('/movie/:id', function(req,res){
  bodyClass = "single";

  searchId = req.params.id;
  var url = "http://www.omdbapi.com/?i=" + searchId;

  request(url, function(error, response, body){
    if (!error && response.statusCode == 200) {
      var obj = JSON.parse(body);
      pageTitle = obj.Title + " - Information";
      res.render('single', {movie : obj});
    }
  });


});


app.listen(3000);
