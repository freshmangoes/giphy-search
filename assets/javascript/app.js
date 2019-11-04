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
      newGif.addClass("gifs");
      newGif.attr("animate-state", "still");
      // currently gets still img, when clicked should animate gif
      newGif.attr("src", currImg.images.fixed_height_small_still.url);
      newGif.attr("data-state-still", currImg.images.fixed_height_small_still.url);
      newGif.attr("data-state-animate", currImg.images.fixed_height_small.url);
      newGif.attr("rating", currImg.rating);
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
    newButton.addClass("btn btn-outline-success search-elem mr-1");
    newButton.attr("data-name", buttons[i]);
    newButton.text(buttons[i]);
    bv.append(newButton);
  }
}



// $(".")
$(document).ready(() => {
  $(document).on("click", ".search-elem", function() {
    searchTerm = $(this).attr("data-name");
    displayGifs();
  });

  $(".add-search").click((event) => {
    event.preventDefault();
    var searchInput = $(".search-input").val().trim();
    console.log("search input", searchInput);
    buttons.push(searchInput);
    renderButtons();
  });
});

$(".gif-view").on("click", ".gifs", function() {
  console.log("gif clicked");
  var animateState = $(this).attr("animate-state");
  var currImg = $(this);
  console.log($(this));
  // if the image is still
  if(animateState === "still") {
    console.log("still");
    // change the attr to animate
    currImg.attr("animate-state", "animate");
    // change the src to the animated gif
    currImg.attr("src", currImg.attr("data-state-animate"));
  // if the image is animated
  } else if (animateState === "animate") {
    console.log("animated");
    // change attr to still
    currImg.attr("animate-state", "still");
    // change src to still src
    currImg.attr("src", currImg.attr("data-state-still"));
  }
});

renderButtons();
