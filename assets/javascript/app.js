var giphyURL = "https://api.giphy.com/v1/gifs/search?q=";
var rating = "&rating=g";
var limit = "&limit=25";

var bv = $(".buttons-view");
var nd = "<div>";
var nb = "<button>"; 
var displayGif = () => {
  var apikey = "&apikey=u471w3d33pSWKWF38nhvk6fzGIsBtLyJ";
  var searchTerm = "lemon";
  var queryURL = giphyURL + searchTerm + rating + apikey + limit;

  console.log("queryURL:", queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    // console.log(JSON.stringify(response));
    console.log("response.data.length", response.data.length);
    
    for(var i=0; i < response.data.length; i++) {
      console.log("response.data.images:", response.data[i].images);
      var newImg = "<img src=" + response.data[i].images.fixed_height.url + ">";
      console.log("newImg:", newImg);
      $(".gif-view").append(newImg);
    }
    
  });

}

displayGif();
