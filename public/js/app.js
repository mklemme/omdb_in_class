function start(){
  favButton();
  console.log("Starting the engine");

  if( favoritedMovie === true ){
    $(".favButton").addClass("favd").text("Added to favorites");
    console.log("Not in fav");
  }
}

function favButton(){
  $(".favButton" ).click(function() {
    if($(".favButton").hasClass("favd")){
      $( ".favButton").removeClass("favd").text("Add to favorites");
      delFav(title, id);

    } else{
      $(".favButton").addClass("favd").text("Added to favorites");
      addFav(title, id, img);
    }
  });
}
// function favButton(){
//   console.log(favorites);
//   $( ".favButton" ).toggle(function(e) {
//       e.preventDefault();

//       addFav(title, id, img);

//       $( ".favButton" ).addClass("favd").text("Added to favorites");
//   }, function(e) {
//       e.preventDefault();

//       delFav(title, id);

//       $( ".favButton" ).removeClass("favd").text("Add to favorites");
//   });
// }
function addFav(title, id){
  $.ajax({
    type: 'PUT',
    url: '/favorites/add',
    dataType: 'json',
    data: {'title': title, 'id': id, 'img': img},
    success: function(data){
      console.log("Added " + title + " to your favorites! :)");
    }
  });
}
function delFav(title, id){
  $.ajax({
    type: 'POST',
    url: '/favorites/delete',
    dataType: 'json',
    data: {'id': id},
    success: function(data){
      console.log("Removed " + title + " to your favorites! :)");
    }
  });
}
