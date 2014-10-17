var express = require("express"),
app = express(),
request = require('request'),
bodyParser = require("body-parser");


app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

pageTitle = "Movies";
searchTerm = "";
searchId= "";
bodyClass ="";

favorites = [];


function Favorite(title, id, img){
  this.id = id;
  this.img = img;
  this.title = title;
  favorites.push(this);
  // console.log(title);
  // console.log(id);
}

Favorite.destroy = function(id){
  //console.log(id);
  favorites.forEach(function(Favorite){
    if( id === Favorite.id){
      var index = favorites.indexOf(Favorite);
      favorites.splice(index, 1);
    }
  });
};

// See if the movie is in the favorite array
Favorite.findById = function(id){
  favorites.forEach(function(favorite){
    if(favorite.id === id){
       favoritedMovie= true;
    }
  });
  return favoritedMovie;
};

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
  favoritedMovie = false;
  id = req.params.id;
  var url = "http://www.omdbapi.com/?i=" + id;

  request(url, function(error, response, body){
    if (!error && response.statusCode == 200) {
      var obj = JSON.parse(body);
      pageTitle = obj.Title + " - Information";
      isFavoritedMovie = Favorite.findById(id);
      res.render('single', {movie : obj, favoritedMovie : isFavoritedMovie});
    }
  });
});

// add a favorite
app.put('/favorites/add', function(req,res) {
  var title = req.body.title;
  var id = req.body.id;
  var img = req.body.img;
  new Favorite(title, id, img);
  // console.log(favorites);
  // console.log(title);
  // console.log(id);
  res.send(JSON.stringify(Favorite));
});

// Delete a favorite
app.post('/favorites/delete', function(req, res){
  var id = req.body.id;
  Favorite.destroy(id);
  res.send(JSON.stringify(Favorite));
});

// Favorites page
app.get('/favorites', function(req,res){
  //console.log(favorites);
  res.render('favorites', {favorites : favorites});
});

app.listen(3000);
