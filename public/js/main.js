function buttonClicks(){
$(".save-button").click(function(){
  artId = $(this).data("artid");
  favorite = $(this).data("favorite")
  console.log(favorite);
  $.ajax({
    url: "/db/articles/favorites/" + artId + "/" + favorite,
    type: "PATCH", 
  }).then( function(res){
    // console.log(res);
    location.reload();
  });//end of ajax promise
})
}//end button clicks



$(document).ready(function(){
 buttonClicks()
})//end doc ready