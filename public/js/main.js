function buttonClicks(){
$(".save-button").click(function(){
  artId = $(this).data("artid");
  favorite = $(this).data("favorite")
  console.log(favorite);
  $.ajax({
    url: "/api/articles/favorites/" + artId + "/" + favorite,
    type: "PATCH", 
  }).then( function(res){
    // console.log(res);
    location.reload();
  });//end of ajax promise
});

$("#scrape-button").click(function(){
  $.ajax({
    url: "/scrape",
    type: 'GET'
  })
  .then(function(res){
    location.reload();
  })
});//end scrape button

$("#clearArticles-button").click(function(){
  
  location.reload();
})

$(".add-note-button").click(function(){
  $('#scrape-modal').modal();
  // location.reload();
})

}//end button clicks



$(document).ready(function(){
 buttonClicks()
})//end doc ready