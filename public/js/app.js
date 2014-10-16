function start(){
  favButton();
  console.log("Starting the engine");

}

function Favorite(){
  this.id = id;
  this.title = title;
  // favorites.push(this);
}
function favButton(title, id){
  $( ".favButton" ).toggle(function(e) {
      e.preventDefault();
      // new Favorite(title, id);
      console.log("Added" + title + " to favorites");
      // console.log(favorites);

      $( ".favButton" ).addClass("favd").text("Added to favorites");
  }, function(e) {
      e.preventDefault();
      $( ".favButton" ).removeClass("favd").text("Add to favorites");
  });
}
