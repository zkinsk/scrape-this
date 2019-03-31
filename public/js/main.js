
function buttonClicks(){
  $(".save-button").click(function(){
    artId = $(this).data("artid");
    favorite = $(this).data("favorite")
    // console.log(favorite);
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
      document.location.href = "/";
    })
  });//end scrape button

  $("#clear-articles-button").click(function(){
    $.ajax({
      url: '/api/articles',
      type: "DELETE"
    }).then(function(res){
      location.reload();
    })
  })//

  $(".open-notes-button").click(function(){
    let artId = $(this).data("artid");
    getNotes(artId);
    $(".input-group-prepend").empty();
    let addNoteButton = /*html*/`
    <button type="button" id="add-note-button-modal" data-artid="${artId}"class="btn btn-light"><span class="input-group-text">Add Note</span></button>
    `;
    $(".input-group-prepend").append(addNoteButton);
    $("#add-note-button-modal").attr("data-artid", artId);
    $("#scrape-modal .modal-title").text("Notes for :" + artId);
    $('#scrape-modal').modal();
  });

  $(".modal-body").on("click", "#add-note-button-modal", function(){
    let noteBody = $("#note-input").val()
    let artId = $(this).data("artid");
    console.log(artId);
    if (noteBody){
      $.ajax({
        url: '/api/note/' + artId,
        type: 'POST',
        data: {
          artId: artId,
          body: noteBody
        }
      })
      .then(function(data){
        $("#note-input").val("");
        getNotes(artId);
      })
    }
  })//add-note-button-modal

  $("#note-area").on("click",".delete-note-button", function(){
    let noteId = $(this).data("note-id");
    let artId = $(this).data("artid");
    $(this).parent().remove();
    $.ajax(
      {
        url: 'api/note/' + artId + "/" + noteId,
        type: 'DELETE',
      }
    )
    .then(res => {
      console.log(res);
    })
  });

  $('#sidebarCollapse').on('click', function () {//sidebar collapse
    $('#side-menu').toggleClass('active');
    let menuState = sessionStorage.getItem("menuState")
    console.log("btn: " + menuState);
    menuState = menuState === 'true';
    menuState = menuState? 'false' : 'true'
    sessionStorage.setItem("menuState", menuState);
  });

}//end button clicks


function getNotes(artId){
  $.ajax({
    url: "/api/article/" + artId,
    type: "GET"
  })
  .then(data => {
    drawNotes(data.notes);
  })
  .catch(err => {console.log(err)})
};

function drawNotes(notes){
  $("#note-area").empty();
  notes.forEach(note =>{
    let newNote = new Note(note);
    newNote.drawNote();
  })
};

function scrollImage(){
  $(window).scroll(function() {
    if ($(this).scrollTop()>240)
     {
      $('#imgBack').fadeIn("fast");
      $('.button-1').addClass("d-none");
      $('.button-2').removeClass("d-none");
     }
    else
     {
      $('#imgBack').fadeOut("fast");
      $('.button-2').addClass("d-none");
      $('.button-1').removeClass("d-none");
     }
    })
};

function menuStateOnLoad(){
  let menuState = sessionStorage.getItem("menuState")
  menuState = menuState === 'true';
  console.log("on load: " + menuState);
  menuState?  $('#side-menu').addClass('active'):  $('#side-menu').removeClass('active')
};

$(document).ready(function(){
 buttonClicks();
 scrollImage();
 menuStateOnLoad();


 
})//end doc ready