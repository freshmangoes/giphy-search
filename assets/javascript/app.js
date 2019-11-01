var giphyURL = "https://api.giphy.com/v1/gifs/search?q=";
var rating = "&rating=g";
var limit = "&limit=25";
var searchTerm = "";

var bv = $(".buttons-view");
var gv = $(".gif-view");
var nd = "<div>";
var nb = "<button>"; 

var buttons = ["koalas", "lemons"];

// function to get and display gifs 
// *****************************************************
// Need to work on formatting of how gifs are displayed,
// kinda ugly right now.
// *****************************************************

var displayGifs = () => {
  gv.empty();
  // var searchTerm = $(this).attr("data-name");
  var apikey = "&apikey=u471w3d33pSWKWF38nhvk6fzGIsBtLyJ";
  var queryURL = giphyURL + searchTerm + rating + apikey + limit;

  console.log("queryURL:", queryURL);
  // console.log("search term btn click:", searchTerm);
  // console.log("THIS", $(this));

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // console.log(JSON.stringify(response));
    console.log("response.data.length", response.data.length);
    // loop through response.data array    
    for(var i=0; i < response.data.length; i++) {
      // console.log("response.data.images:", response.data[i].images);
      // create a new image with the url from the data
      var newImg = "<img src=" + response.data[i].images.fixed_height.url + ">";
      // console.log("newImg:", newImg);
      // append the image to gif-view
      gv.append(newImg);
    }
  });
}

var renderButtons = () => {
  $(".buttons-view").empty();
  for(var i = 0; i < buttons.length; i++) {
    var a = $("<button>");
    a.addClass("search-elem");
    a.attr("data-name", buttons[i]);
    a.text(buttons[i]);
    $(".buttons-view").append(a);
  }
}


$(document).on("click", ".search-elem", function() {
  searchTerm = $(this).attr("data-name");
  displayGifs();
});

$(".add-animal").click(function(event){
  event.preventDefault();
  var searchInput = $(".search-input").val().trim();
  console.log("search input", searchInput);
  buttons.push(searchInput);
  renderButtons();
});

renderButtons();
