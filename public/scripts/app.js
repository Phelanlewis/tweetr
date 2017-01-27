/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function(){

  var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

$('[action="/tweet-submit"]').on('submit', function(event) {
  event.preventDefault();
  var text = $(this).serialize();
  var text = text.slice(5);
  if(text === ""){
    alert("No Tweet")
  }
  if(text > 140){
    alert("Too many characters bro!")
  }
//  validateForm(event);
  $.ajax({
    url: "/tweets",
    method: "post",
    data: $(this).serialize()
  }).then(function(){
      loadTweets();
  });
});

// function validateForm(event) {
//  var x = event.innerText;
//     if (x = ""){
//        alert ("you should add a tweet before submitting");
//        return false;
//      };
//     if (x.length > 140){
//        alert ("What about 140 characters don't you get??!!!?!?!");
//        return false;
//      } else {
//        return true;
//      }
// }

function loadTweets() {
//  event.preventDefault();
  $.ajax({
    url: "/tweets",
    method: "get",
    success: function(tweets){
      console.log("GREAT SUCCESS");
      renderTweets(tweets);
    }
  })
}

 function renderTweets(tweets) {
  $('#tweets-container').empty();
  tweets.forEach(function(uniqueTweet){
    var newTweet = createTweetElement(uniqueTweet);
    $('#tweets-container').append(newTweet);
  })
}

 function createTweetElement(tweet){
   var $tweet      = $("<article>").addClass("tweet");
   var $avatar     = $("<img>").attr("src", tweet.user.avatars.small);
   var $h3         = $("<h3>").text(tweet.user.name);
   var $handle     = $("<span>").addClass("handle").text(tweet.user.handle);
   var $header     = $("<header>").append($h3).append($handle).append($avatar);
   $tweet.append($header);
   var $content    = $("<span>").addClass("content").text(tweet.content.text);
   $tweet.append($content);
   var $created_at = $("<span>").addClass("created_at").text(tweet.created_at);
  //  var $icon       = $("<span class="icons">")
   var $footer     = $("<footer>").append($created_at);
   $tweet.append($footer);
   return $tweet;
 }
loadTweets();
 //renderTweets(data);

 $("#slideToggle").click(function () {
    $('.new-tweet').slideToggle();
 });

 });
