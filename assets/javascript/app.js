var searchTerm = "";
var buttons = ["koalas", "lemons"];

var displayGifs = () => {
  var gv = $(".gif-view");
  var rating = "&rating=g";
  var limit = "&limit=25";
  var giphyURL = "https://api.giphy.com/v1/gifs/search?q=";

  gv.empty();
  // var searchTerm = $(this).attr("data-name");
  var apikey = "&apikey=u471w3d33pSWKWF38nhvk6fzGIsBtLyJ";
  var queryURL = giphyURL + searchTerm + rating + apikey + limit;

  console.log("queryURL:", queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // console.log(JSON.stringify(response));
    console.log("response.data.length", response.data.length);
    var results = response.data;
    // loop through response.data array    
    for(var i=0; i < results.length; i++) {
      // create a new image with the url from the data
      var currImg = results[i];
      var newGif = $("<img>");
      newGif.attr("src", currImg.images.fixed_height.url);

      // append the image to gif-view
      gv.append(newGif);
    }
  });
}

var renderButtons = () => {
  var bv = $(".buttons-view");

  bv.empty();

  for(var i = 0; i < buttons.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("btn-primary");
    newButton.addClass("search-elem");
    newButton.attr("data-name", buttons[i]);
    newButton.text(buttons[i]);
    bv.append(newButton);
  }
}


$(document).on("click", ".search-elem", function() {
  searchTerm = $(this).attr("data-name");
  displayGifs();
});

$(".add-search").click(function(event){
  event.preventDefault();
  var searchInput = $(".search-input").val().trim();
  console.log("search input", searchInput);
  buttons.push(searchInput);
  renderButtons();
});

renderButtons();
